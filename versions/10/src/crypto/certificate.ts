/**
 * Node.js crypto Certificate class (SPKAC).
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Certificate.cs
 */

/**
 * SPKAC is a Certificate Signing Request mechanism originally implemented by Netscape.
 */
export class Certificate {
  /**
   * Exports the challenge component of an SPKAC data structure.
   */
  public static exportChallenge(_spkac: string | Uint8Array): Uint8Array {
    // TODO: actual SPKAC challenge export (requires ASN.1 parsing)
    throw new Error("SPKAC challenge export is not yet implemented");
  }

  /**
   * Exports the public key component of an SPKAC data structure.
   */
  public static exportPublicKey(_spkac: string | Uint8Array): Uint8Array {
    // TODO: actual SPKAC public key export (requires ASN.1 parsing)
    throw new Error("SPKAC public key export is not yet implemented");
  }

  /**
   * Validates an SPKAC data structure.
   */
  public static verifySpkac(_spkac: string | Uint8Array): boolean {
    // TODO: actual SPKAC verification (requires ASN.1 parsing)
    throw new Error("SPKAC verification is not yet implemented");
  }
}

/**
 * Information about an X.509 certificate.
 */
export class X509CertificateInfo {
  public readonly subject: string;
  public readonly issuer: string;
  public readonly serialNumber: string;
  public readonly validFrom: string;
  public readonly validTo: string;
  public readonly fingerprint: string;
  public readonly fingerprint256: string;
  public readonly fingerprint512: string;
  public readonly publicKey: Uint8Array;
  public readonly raw: Uint8Array;

  public constructor(
    subject: string,
    issuer: string,
    serialNumber: string,
    validFrom: string,
    validTo: string,
    fingerprint: string,
    fingerprint256: string,
    fingerprint512: string,
    publicKey: Uint8Array,
    raw: Uint8Array
  ) {
    this.subject = subject;
    this.issuer = issuer;
    this.serialNumber = serialNumber;
    this.validFrom = validFrom;
    this.validTo = validTo;
    this.fingerprint = fingerprint;
    this.fingerprint256 = fingerprint256;
    this.fingerprint512 = fingerprint512;
    this.publicKey = publicKey;
    this.raw = raw;
  }

  /**
   * Checks whether the certificate matches the given hostname.
   */
  public checkHost(_hostname: string): string | null {
    // TODO: actual hostname matching
    return null;
  }

  /**
   * Checks whether the certificate matches the given email address.
   */
  public checkEmail(_email: string): string | null {
    // TODO: actual email matching
    return null;
  }

  /**
   * Checks whether the certificate matches the given IP address.
   */
  public checkIP(_ip: string): string | null {
    // TODO: actual IP matching
    return null;
  }

  /**
   * Checks whether this certificate issued the other certificate.
   */
  public checkIssued(_otherCert: X509CertificateInfo): string | null {
    // TODO: actual issuer check
    return null;
  }

  /**
   * Checks whether the certificate was issued by the given issuer certificate.
   */
  public verify(_issuerCert: X509CertificateInfo): boolean {
    // TODO: actual certificate chain verification
    return false;
  }

  /**
   * Returns the PEM-encoded certificate.
   */
  public toPEM(): string {
    // TODO: actual PEM export
    return "";
  }

  public toString(): string {
    return `X509Certificate(subject=${this.subject}, issuer=${this.issuer})`;
  }
}
