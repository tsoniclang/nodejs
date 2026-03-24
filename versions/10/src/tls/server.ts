/**
 * TLSServer — accepts encrypted connections using TLS or SSL.
 *
 * Baseline: nodejs-clr/src/nodejs/tls/Server.cs
 *
 * The CLR implementation extends net.Server and wraps SslStream for each
 * incoming connection. In the native port all network / crypto operations
 * are substrate-dependent, so they are stubbed with TODO markers.
 */

import { EventEmitter } from "../events-module.ts";
import { SecureContext } from "./secure-context.ts";
import { SecureContextOptions, TlsOptions } from "./options.ts";
import { TLSSocket } from "./tlssocket.ts";

// Forward-reference: the module-level createSecureContext is used here.
// Importing from index.ts would be circular, so we inline the logic.
const createSecureContextFromOptions = (
  options: SecureContextOptions
): SecureContext => {
  const context = new SecureContext();
  context.loadCertificate(options.cert, options.key, options.passphrase);
  context.loadCACertificates(options.ca);
  context.setProtocols(options.minVersion, options.maxVersion);
  return context;
};

export class TLSServer extends EventEmitter {
  private _secureContext: SecureContext | null = null;
  private _options: TlsOptions | null = null;
  private _ticketKeys: Uint8Array | null = null;

  constructor();
  constructor(secureConnectionListener: (socket: TLSSocket) => void);
  constructor(
    options: TlsOptions,
    secureConnectionListener?: ((socket: TLSSocket) => void) | null
  );
  constructor(
    optionsOrListener?: TlsOptions | ((socket: TLSSocket) => void) | null,
    secureConnectionListener?: ((socket: TLSSocket) => void) | null
  ) {
    super();

    // Overload resolution: (listener), (options, listener), or ()
    const options: TlsOptions | null =
      optionsOrListener instanceof TlsOptions
        ? optionsOrListener
        : null;

    const listener: ((socket: TLSSocket) => void) | null =
      typeof optionsOrListener === "function"
        ? optionsOrListener
        : secureConnectionListener ?? null;

    this._options = options;

    if (options !== null) {
      const rejectUnauthorized = options.rejectUnauthorized ?? false;
      const ctxOpts = new SecureContextOptions();
      ctxOpts.key = options.key;
      ctxOpts.cert = options.cert;
      ctxOpts.ca = options.ca;
      ctxOpts.passphrase = options.passphrase;
      ctxOpts.minVersion = rejectUnauthorized ? "TLSv1.2" : null;
      this._secureContext = createSecureContextFromOptions(ctxOpts);
    }

    if (listener !== null) {
      this.on("secureConnection", (...args: unknown[]) => {
        listener(args[0] as TLSSocket);
      });
    }

    // TODO: listen for raw TCP connections and wrap each with TLS
    //       via substrate crypto primitives (SslStream equivalent).
  }

  /**
   * Adds a secure context for SNI hostname matching.
   *
   * TODO: Implement SNI context switching.
   */
  addContext(_hostname: string, _context: unknown): void {
    // TODO: map hostname to SecureContext for SNI
  }

  /**
   * Returns the session ticket keys (48 bytes).
   */
  getTicketKeys(): Uint8Array {
    if (this._ticketKeys === null) {
      this._ticketKeys = new Uint8Array(48);
      // TODO: fill with cryptographically random bytes
      //       (substrate-dependent; using zero-fill placeholder)
    }
    return this._ticketKeys;
  }

  /**
   * Replaces the secure context of an existing server.
   */
  setSecureContext(options: SecureContextOptions): void {
    this._secureContext = createSecureContextFromOptions(options);
  }

  /**
   * Sets the session ticket keys (must be exactly 48 bytes).
   */
  setTicketKeys(keys: Uint8Array): void {
    if (keys.length !== 48) {
      throw new Error("Ticket keys must be 48 bytes");
    }
    this._ticketKeys = keys;
  }

  /**
   * Starts listening for connections.
   *
   * TODO: Delegate to substrate TCP server.
   */
  listen(
    _port?: number,
    _hostname?: string,
    _backlog?: number,
    _callback?: () => void
  ): this {
    // TODO: substrate-dependent TCP listen
    return this;
  }

  /**
   * Stops the server from accepting new connections.
   *
   * TODO: Delegate to substrate TCP server.
   */
  close(_callback?: (err?: Error) => void): this {
    // TODO: substrate-dependent close
    return this;
  }

  /**
   * Returns the bound address of the server.
   *
   * TODO: Delegate to substrate TCP server.
   */
  address(): { port: number; family: string; address: string } | null {
    // TODO: substrate-dependent
    return null;
  }
}
