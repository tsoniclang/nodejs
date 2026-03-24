/**
 * TLS option and certificate info types.
 *
 * Baseline: nodejs-clr/src/nodejs/tls/Options.cs
 */

/**
 * Certificate distinguished-name fields.
 */
export class TLSCertificateInfo {
  public C: string = "";
  public ST: string = "";
  public L: string = "";
  public O: string = "";
  public OU: string = "";
  public CN: string = "";
}

/**
 * Peer certificate information returned by getPeerCertificate().
 */
export class PeerCertificate {
  public ca: boolean = false;
  public raw: Uint8Array | null = null;
  public subject: TLSCertificateInfo = new TLSCertificateInfo();
  public issuer: TLSCertificateInfo = new TLSCertificateInfo();
  public valid_from: string = "";
  public valid_to: string = "";
  public serialNumber: string = "";
  public fingerprint: string = "";
  public fingerprint256: string = "";
  public fingerprint512: string = "";
  public ext_key_usage: string[] | null = null;
  public subjectaltname: string | null = null;
}

/**
 * Detailed peer certificate with issuer chain.
 */
export class DetailedPeerCertificate extends PeerCertificate {
  public issuerCertificate: DetailedPeerCertificate | null = null;
}

/**
 * Cipher name and protocol information.
 */
export class CipherNameAndProtocol {
  public name: string = "";
  public version: string = "";
  public standardName: string = "";
}

/**
 * Ephemeral key exchange information.
 */
export class EphemeralKeyInfo {
  public type: string = "";
  public name: string | null = null;
  public size: number = 0;
}

/**
 * Secure context options for TLS configuration.
 */
export class SecureContextOptions {
  public ca: unknown = null;
  public cert: unknown = null;
  public ciphers: string | null = null;
  public key: unknown = null;
  public passphrase: string | null = null;
  public pfx: unknown = null;
  public maxVersion: string | null = null;
  public minVersion: string | null = null;
}

/**
 * Common connection options for TLS.
 */
export class CommonConnectionOptions {
  public secureContext: SecureContext | null = null;
  public enableTrace: boolean | null = null;
  public requestCert: boolean | null = null;
  public rejectUnauthorized: boolean | null = null;
  public ALPNProtocols: string[] | null = null;
}

// Forward-declare SecureContext to avoid circular import at the type level.
// The actual class is in secure-context.ts.
import type { SecureContext } from "./secure-context.ts";

/**
 * TLS socket options.
 */
export class TLSSocketOptions extends CommonConnectionOptions {
  public isServer: boolean | null = null;
  public server: unknown = null;
  public servername: string | null = null;
  public ca: unknown = null;
  public cert: unknown = null;
  public key: unknown = null;
  public passphrase: string | null = null;
}

/**
 * Connection options for TLS client.
 */
export class ConnectionOptions extends CommonConnectionOptions {
  public host: string | null = null;
  public port: number | null = null;
  public servername: string | null = null;
  public ca: unknown = null;
  public cert: unknown = null;
  public key: unknown = null;
  public passphrase: string | null = null;
  public timeout: number | null = null;
}

/**
 * TLS server options.
 */
export class TlsOptions extends CommonConnectionOptions {
  public handshakeTimeout: number | null = null;
  public sessionTimeout: number | null = null;
  public ca: unknown = null;
  public cert: unknown = null;
  public key: unknown = null;
  public passphrase: string | null = null;
  public allowHalfOpen: boolean | null = null;
  public pauseOnConnect: boolean | null = null;
}
