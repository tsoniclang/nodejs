/**
 * Node.js http.Server — HTTP server implementation.
 *
 *
 * This class requires OS network substrate (TCP listener, HTTP parser) for
 * actual server functionality. Class shape and method signatures are ported;
 * listen/close internals are stubbed with TODO markers.
 */

import { overloads as O } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import type { HttpListener, HttpListenerContext, IPEndPoint, IPAddress } from "@tsonic/dotnet/System.Net.js";
import { Dns, HttpListener as DotNetHttpListener, IPAddress as DotNetIPAddress } from "@tsonic/dotnet/System.Net.js";
import { TcpListener } from "@tsonic/dotnet/System.Net.Sockets.js";
import { Task } from "@tsonic/dotnet/System.Threading.Tasks.js";
import { IncomingMessage } from "./incoming-message.ts";
import { ServerResponse } from "./server-response.ts";
import {
  EventEmitter,
  toBinaryEventListener,
  toEventListener,
} from "../events-module.ts";
import {
  acquireProcessKeepAlive,
  releaseProcessKeepAlive,
} from "../process-keepalive.ts";

/**
 * Information about a server's bound address.
 */
export class AddressInfo {
  /**
   * The port number the server is listening on.
   */
  public port: int;

  /**
   * The address family (e.g., "IPv4" or "IPv6").
   */
  public family: string;

  /**
   * The IP address the server is listening on.
   */
  public address: string;

  constructor(port: int, family: string, address: string) {
    this.port = port;
    this.family = family;
    this.address = address;
  }
}

/**
 * Implements Node.js http.Server functionality.
 * Extends EventEmitter to support events like 'request', 'connection', 'close', etc.
 */
export class Server extends EventEmitter {
  private _boundAddress: AddressInfo | null = null;
  private _boundPath: string | null = null;
  private _maxHeadersCount: int = 2000 as int;
  private _timeout: int = 0 as int;
  private _headersTimeout: int = 60000 as int;
  private _requestTimeout: int = 300000 as int;
  private _keepAliveTimeout: int = 5000 as int;
  private _listening: boolean = false;
  private _listener: HttpListener | null = null;
  private _keepAliveAcquired: boolean = false;

  constructor(
    requestListener?:
      | ((req: IncomingMessage, res: ServerResponse) => void)
      | null
  ) {
    super();

    // If request listener provided, register it as event listener
    if (requestListener !== undefined && requestListener !== null) {
      this.on(
        "request",
        toBinaryEventListener(requestListener)!
      );
    }
  }

  /**
   * Limits maximum incoming headers count.
   * If set to 0, no limit will be applied.
   */
  public get maxHeadersCount(): int {
    return this._maxHeadersCount;
  }

  public set maxHeadersCount(value: int) {
    this._maxHeadersCount = value;
  }

  /**
   * Sets the timeout value in milliseconds for receiving the entire request.
   * Default: 0 (no timeout)
   */
  public get timeout(): int {
    return this._timeout;
  }

  public set timeout(value: int) {
    if (value < 0) {
      throw new Error("Timeout must be non-negative");
    }
    this._timeout = value;
  }

  /**
   * Limits the amount of time the parser will wait to receive the complete HTTP headers.
   * Default: 60000 (60 seconds)
   */
  public get headersTimeout(): int {
    return this._headersTimeout;
  }

  public set headersTimeout(value: int) {
    if (value < 0) {
      throw new Error("Headers timeout must be non-negative");
    }
    this._headersTimeout = value;
  }

  /**
   * Sets the timeout value in milliseconds for receiving the entire request from the client.
   * Default: 300000 (5 minutes)
   */
  public get requestTimeout(): int {
    return this._requestTimeout;
  }

  public set requestTimeout(value: int) {
    if (value < 0) {
      throw new Error("Request timeout must be non-negative");
    }
    this._requestTimeout = value;
  }

  /**
   * The number of milliseconds of inactivity a server needs to wait for additional data
   * after it has finished writing the last response, before a socket will be destroyed.
   * Default: 5000 (5 seconds)
   */
  public get keepAliveTimeout(): int {
    return this._keepAliveTimeout;
  }

  public set keepAliveTimeout(value: int) {
    if (value < 0) {
      throw new Error("Keep-alive timeout must be non-negative");
    }
    this._keepAliveTimeout = value;
  }

  /**
   * Indicates whether or not the server is listening for connections.
   */
  public get listening(): boolean {
    return this._listening;
  }

  /**
   * Begin accepting connections on the specified port and hostname.
   * @param port - The port number.
   * @param hostname - The hostname. Default: all interfaces.
   * @param backlog - Maximum length of the queue of pending connections.
   * @param callback - Optional callback when server has been started.
   * @returns The server instance for chaining.
   */
  public listen(
    path: string,
    callback?: (() => void) | null
  ): Server;
  public listen(
    port: number,
    hostname: string,
    backlog: number,
    callback?: (() => void) | null
  ): Server;
  public listen(
    port: number,
    hostname: string,
    callback?: (() => void) | null
  ): Server;
  public listen(
    port: number,
    backlog: number,
    callback?: (() => void) | null
  ): Server;
  public listen(
    port: number,
    callback?: (() => void) | null
  ): Server;
  public listen(
    portOrPath: any,
    hostname?: any,
    backlog?: any,
    callback?: any
  ): any {
    if (typeof portOrPath === "string") {
      return this.listen_path(portOrPath, hostname);
    }

    if (typeof hostname === "string") {
      return typeof backlog === "number"
        ? this.listen_port_hostname_backlog(portOrPath, hostname, backlog, callback)
        : this.listen_port_hostname(portOrPath, hostname, backlog);
    }

    if (typeof hostname === "number") {
      return this.listen_port_backlog(portOrPath, hostname, backlog);
    }

    return this.listen_port(portOrPath, hostname);
  }

  public listen_path(
    path: string,
    callback?: (() => void) | null
  ): Server {
    return this.listenPath(path, callback ?? undefined);
  }

  public listen_port_hostname_backlog(
    port: number,
    hostname: string,
    backlog: number,
    callback?: (() => void) | null
  ): Server {
    return this.listenResolved(port, hostname, backlog, callback ?? undefined);
  }

  public listen_port_hostname(
    port: number,
    hostname: string,
    callback?: (() => void) | null
  ): Server {
    return this.listenResolved(port, hostname, 511 as int, callback ?? undefined);
  }

  public listen_port_backlog(
    port: number,
    backlog: number,
    callback?: (() => void) | null
  ): Server {
    return this.listenResolved(port, undefined, backlog, callback ?? undefined);
  }

  public listen_port(
    port: number,
    callback?: (() => void) | null
  ): Server {
    return this.listenResolved(port, undefined, 511 as int, callback ?? undefined);
  }

  /**
   * Begin accepting connections on the specified port with callback.
   * @param port - The port number.
   * @param callback - Optional callback when server has been started.
   * @returns The server instance for chaining.
   */
  public listenWithCallback(port: int, callback?: (() => void) | null): Server {
    return this.listenInternal(
      port,
      undefined,
      511 as int,
      callback ?? undefined
    );
  }

  /**
   * Begin accepting connections on the specified port and hostname with callback.
   */
  public listenWithHostname(
    port: int,
    hostname: string,
    callback?: (() => void) | null
  ): Server {
    return this.listenInternal(
      port,
      hostname,
      511 as int,
      callback ?? undefined
    );
  }

  private listenResolved(
    port: number,
    hostname: string | undefined,
    backlog: number,
    callback: (() => void) | undefined
  ): Server {
    if (this._listening) {
      throw new Error("Server is already listening");
    }

    const normalizedPort = normalizePortNumber(port);
    if (normalizedPort < 0 || normalizedPort > 65535) {
      throw new RangeError(
        `port must be >= 0 and <= 65535. Received ${String(normalizedPort)}`
      );
    }

    const normalizedBacklog = normalizePortNumber(backlog);
    if (normalizedBacklog < 0) {
      throw new Error("Backlog must be non-negative");
    }

    return this.listenInternal(
      normalizedPort,
      hostname,
      normalizedBacklog,
      callback
    );
  }

  private listenInternal(
    port: int,
    hostname: string | undefined,
    backlog: int,
    callback: (() => void) | undefined
  ): Server {
    if (!DotNetHttpListener.IsSupported) {
      throw new Error("HttpListener is not supported on this platform");
    }

    const listenPort = port === (0 as int)
      ? reserveEphemeralPort(hostname)
      : port;
    const listenerSetup = createListener(hostname, listenPort);

    this._listener = listenerSetup.listener;
    this._boundAddress = new AddressInfo(
      listenPort,
      listenerSetup.family,
      listenerSetup.address
    );
    this._boundPath = null;
    this._listening = true;
    acquireProcessKeepAlive();
    this._keepAliveAcquired = true;

    Task.Run(() => {
      this._acceptLoop();
    });

    this.emit("listening");

    if (callback !== undefined) {
      callback();
    }

    return this;
  }

  /**
   * Stops the server from accepting new connections.
   * @param callback - Optional callback when server has closed.
   * @returns The server instance for chaining.
   */
  public close(callback?: (() => void) | null): Server {
    if (!this._listening && this._listener === null) {
      if (callback !== undefined && callback !== null) {
        callback();
      }
      return this;
    }

    this._listening = false;

    if (this._listener !== null) {
      try {
        this._listener.Stop();
      } catch {
        // Ignore shutdown exceptions.
      }

      try {
        this._listener.Close();
      } catch {
        // Ignore shutdown exceptions.
      }

      this._listener = null;
    }

    this._boundAddress = null;
    this._boundPath = null;
    if (this._keepAliveAcquired) {
      releaseProcessKeepAlive();
      this._keepAliveAcquired = false;
    }
    this.emit("close");

    if (callback !== undefined && callback !== null) {
      callback();
    }

    return this;
  }

  /**
   * Sets the timeout value for sockets and emits a 'timeout' event on the Server object.
   * @param msecs - Timeout in milliseconds.
   * @param callback - Optional callback to be added as a listener on the 'timeout' event.
   * @returns The server instance for chaining.
   */
  public setTimeout(msecs: int, callback?: (() => void) | null): Server {
    if (msecs < 0) {
      throw new Error("Timeout must be non-negative");
    }
    this._timeout = msecs;

    if (callback !== undefined && callback !== null) {
      this.on("timeout", toEventListener(callback)!);
    }

    return this;
  }

  /**
   * Returns the bound address, the address family name, and port of the server.
   * Only useful after 'listening' event.
   * @returns An object with 'port', 'family', and 'address' properties, or null.
   */
  public address(): AddressInfo | null {
    return this._boundAddress;
  }

  private listenPath(
    path: string,
    callback: (() => void) | undefined
  ): Server {
    if (this._listening) {
      throw new Error("Server is already listening");
    }

    if (path.length === 0) {
      throw new Error("Path must not be empty");
    }

    this._boundAddress = null;
    this._boundPath = path;
    this._listening = true;
    acquireProcessKeepAlive();
    this._keepAliveAcquired = true;
    this.emit("listening");

    if (callback !== undefined) {
      callback();
    }

    return this;
  }

  private _acceptLoop(): void {
    while (this._listening && this._listener !== null) {
      let context: HttpListenerContext;

      try {
        context = this._listener.GetContext();
      } catch (error) {
        if (this._listening) {
          if (error === undefined) {
            this.emit("error", new Error("Failed to accept request"));
          } else if (
            error === null ||
            typeof error === "string" ||
            typeof error === "number" ||
            typeof error === "boolean" ||
            typeof error === "bigint" ||
            typeof error === "symbol" ||
            typeof error === "object" ||
            typeof error === "function"
          ) {
            this.emit("error", error);
          } else {
            this.emit("error", new Error("Failed to accept request"));
          }
        }
        break;
      }

      Task.Run(() => {
        this._dispatchContext(context);
      });
    }
  }

  private _dispatchContext(context: HttpListenerContext): void {
    const request = new IncomingMessage(context.Request);
    const response = new ServerResponse(context.Response);

    try {
      this.emit("request", request, response);
      request._beginStreamingBody();
    } catch (error) {
      if (!response.finished) {
        response.statusCode = 500 as int;
        response.setHeader("content-type", "text/plain; charset=utf-8");
        response.end("Internal Server Error");
      }

      if (error === undefined) {
        this.emit("error", new Error("Failed to dispatch request"));
      } else if (
        error === null ||
        typeof error === "string" ||
        typeof error === "number" ||
        typeof error === "boolean" ||
        typeof error === "bigint" ||
        typeof error === "symbol" ||
        typeof error === "object" ||
        typeof error === "function"
      ) {
        this.emit("error", error);
      } else {
        this.emit("error", new Error("Failed to dispatch request"));
      }
    }
  }
}

const reserveEphemeralPort = (hostname: string | undefined): int => {
  const address = resolveIPAddress(hostname);
  const listener = new TcpListener(address, 0 as int);

  listener.Start();

  try {
    const endpoint = listener.LocalEndpoint as IPEndPoint;
    return endpoint.Port;
  } finally {
    listener.Stop();
  }
};

const normalizePortNumber = (value: number): int => {
  if (Number.isInteger(value) && value >= -2147483648 && value <= 2147483647) {
    return value as int;
  }

  throw new RangeError(`port must be an Int32-compatible integer. Received ${String(value)}`);
};

const resolveIPAddress = (hostname: string | undefined): IPAddress => {
  if (
    hostname === undefined ||
    hostname === null ||
    hostname.length === 0 ||
    hostname === "0.0.0.0"
  ) {
    return DotNetIPAddress.Any;
  }

  if (hostname === "::" || hostname === "[::]") {
    return DotNetIPAddress.IPv6Any;
  }

  if (hostname.toLowerCase() === "localhost") {
    return DotNetIPAddress.Loopback;
  }

  const normalized = stripIpv6Brackets(hostname);

  try {
    return DotNetIPAddress.Parse(normalized);
  } catch {
    const addresses = Dns.GetHostAddresses(normalized);
    if (addresses.length === 0) {
      throw new Error(`Unable to resolve hostname: ${normalized}`);
    }
    return addresses[0]!;
  }
};

const createListener = (
  hostname: string | undefined,
  port: int
): { listener: HttpListener; address: string; family: string } => {
  const attempts = buildListenerAttempts(hostname, port);

  for (const attempt of attempts) {
    const listener = new DotNetHttpListener();
    listener.IgnoreWriteExceptions = true;
    for (const prefix of attempt.prefixes) {
      listener.Prefixes.Add(prefix);
    }

    try {
      listener.Start();
      return {
        listener,
        address: attempt.address,
        family: attempt.family,
      };
    } catch {
      try {
        listener.Close();
      } catch {
        // Ignore failed cleanup on unsuccessful listener attempts.
      }
    }
  }

  throw new Error(
    `Unable to bind HTTP listener on port ${String(port)}${hostname !== undefined ? ` for host ${hostname}` : ""}`
  );
};

const buildListenerAttempts = (
  hostname: string | undefined,
  port: int
): { prefixes: string[]; address: string; family: string }[] => {
  if (hostname === undefined || hostname === null || hostname.length === 0) {
    return [
      {
        prefixes: [`http://*:${String(port)}/`],
        address: "0.0.0.0",
        family: "IPv4",
      },
      {
        prefixes: [
          `http://127.0.0.1:${String(port)}/`,
          `http://localhost:${String(port)}/`,
        ],
        address: "127.0.0.1",
        family: "IPv4",
      },
    ];
  }

  const normalized = stripIpv6Brackets(hostname);
  const family = normalized.includes(":") ? "IPv6" : "IPv4";
  const prefixHost = family === "IPv6" ? `[${normalized}]` : normalized;

  return [
    {
      prefixes: [`http://${prefixHost}:${String(port)}/`],
      address: normalized,
      family,
    },
  ];
};

const stripIpv6Brackets = (hostname: string): string => {
  if (hostname.startsWith("[") && hostname.endsWith("]")) {
    return hostname.slice(1, hostname.length - 1);
  }

  return hostname;
};

O<Server>().method(x => x.listen_path).family(x => x.listen);
O<Server>().method(x => x.listen_port_hostname_backlog).family(x => x.listen);
O<Server>().method(x => x.listen_port_hostname).family(x => x.listen);
O<Server>().method(x => x.listen_port_backlog).family(x => x.listen);
O<Server>().method(x => x.listen_port).family(x => x.listen);
