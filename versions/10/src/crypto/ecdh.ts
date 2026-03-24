import type { int, out } from "@tsonic/core/types.js";
import { ECDiffieHellman } from "@tsonic/dotnet/System.Security.Cryptography.js";
import {
  curveFromName,
  decodeInputBytes,
  encodeOutputBytes,
  encodeOutputString,
  fromByteArray,
  toReadOnlyByteSpan,
} from "./crypto-helpers.ts";

function toEcdhPublicKeyBytes(
  otherPublicKey: string,
  inputEncoding?: string,
): Uint8Array;
function toEcdhPublicKeyBytes(
  otherPublicKey: Uint8Array,
): Uint8Array;
function toEcdhPublicKeyBytes(
  otherPublicKey: string | Uint8Array,
  inputEncoding?: string,
): Uint8Array {
  if (typeof otherPublicKey === "string") {
    return decodeInputBytes(otherPublicKey, inputEncoding ?? "base64");
  }

  return otherPublicKey;
}

const encodeEcdhSecret = (
  secret: Uint8Array,
  outputEncoding?: string,
): string => {
  return encodeOutputString(secret, outputEncoding ?? "base64");
};

/**
 * Node.js crypto ECDH class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/ECDH.cs
 */

/**
 * The ECDH class is a utility for creating Elliptic Curve Diffie-Hellman (ECDH) key exchanges.
 */
export class ECDH {
  private readonly _curveName: string;
  private _ecdh: ECDiffieHellman;

  public constructor(curveName: string) {
    this._curveName = curveName;
    this._ecdh = ECDiffieHellman.Create(curveFromName(curveName));
  }

  /**
   * Generates private and public EC Diffie-Hellman key values.
   */
  public generateKeys(encoding?: undefined, _format?: string): Uint8Array;
  public generateKeys(encoding: string, _format?: string): string;
  public generateKeys(encoding?: string, _format?: string): string | Uint8Array {
    const publicKey = this.getPublicKey();

    if (typeof encoding === "string") {
      return encodeOutputBytes(publicKey, encoding) as string;
    }

    return publicKey;
  }

  /**
   * Computes the shared secret using the other party's public key.
   */
  public computeSecret(
    otherPublicKey: string,
    inputEncoding?: string,
    outputEncoding?: string
  ): string;
  public computeSecret(otherPublicKey: Uint8Array, outputEncoding?: undefined): Uint8Array;
  public computeSecret(otherPublicKey: Uint8Array, outputEncoding: string): string;
  public computeSecret(
    otherPublicKey: string | Uint8Array,
    inputOrOutputEncoding?: string,
    outputEncoding?: string
  ): string | Uint8Array {
    let publicKeyBytes: Uint8Array;
    if (typeof otherPublicKey === "string") {
      publicKeyBytes = toEcdhPublicKeyBytes(
        otherPublicKey,
        inputOrOutputEncoding,
      );
    } else {
      publicKeyBytes = toEcdhPublicKeyBytes(otherPublicKey);
    }
    const other = ECDiffieHellman.Create(curveFromName(this._curveName));
    other.ImportSubjectPublicKeyInfo(
      toReadOnlyByteSpan(publicKeyBytes),
      0 as out<int>,
    );
    const secret = fromByteArray(this._ecdh.DeriveKeyMaterial(other.PublicKey));
    other.Dispose();

    if (typeof otherPublicKey === "string") {
      return encodeEcdhSecret(secret, outputEncoding);
    }

    if (typeof inputOrOutputEncoding === "string") {
      return encodeOutputString(secret, inputOrOutputEncoding);
    }

    return secret;
  }

  /**
   * Returns the EC Diffie-Hellman public key.
   */
  public getPublicKey(encoding?: undefined, _format?: string): Uint8Array;
  public getPublicKey(encoding: string, _format?: string): string;
  public getPublicKey(encoding?: string, _format?: string): string | Uint8Array {
    const publicKey = fromByteArray(this._ecdh.PublicKey.ExportSubjectPublicKeyInfo());

    if (typeof encoding === "string") {
      return encodeOutputBytes(publicKey, encoding) as string;
    }

    return publicKey;
  }

  /**
   * Returns the EC Diffie-Hellman private key.
   */
  public getPrivateKey(encoding?: undefined): Uint8Array;
  public getPrivateKey(encoding: string): string;
  public getPrivateKey(encoding?: string): string | Uint8Array {
    const privateKey = fromByteArray(this._ecdh.ExportECPrivateKey());

    if (typeof encoding === "string") {
      return encodeOutputBytes(privateKey, encoding) as string;
    }

    return privateKey;
  }

  /**
   * Sets the EC Diffie-Hellman public key (deprecated, throws).
   */
  public setPublicKey(_publicKey: string, _encoding?: string): void;
  public setPublicKey(_publicKey: Uint8Array): void;
  public setPublicKey(_publicKey: string | Uint8Array, _encoding?: string): void {
    throw new Error("setPublicKey() is not supported. Use setPrivateKey() instead.");
  }

  /**
   * Sets the EC Diffie-Hellman private key.
   */
  public setPrivateKey(privateKey: string, encoding?: string): void;
  public setPrivateKey(privateKey: Uint8Array): void;
  public setPrivateKey(privateKey: string | Uint8Array, encoding?: string): void {
    this._ecdh.Dispose();
    this._ecdh = ECDiffieHellman.Create(curveFromName(this._curveName));
    const bytes =
      typeof privateKey === "string"
        ? decodeInputBytes(privateKey, encoding ?? "base64")
        : privateKey;
    this._ecdh.ImportECPrivateKey(toReadOnlyByteSpan(bytes), 0 as out<int>);
  }
}
