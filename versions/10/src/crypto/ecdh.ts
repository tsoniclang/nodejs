import type { int, out } from "@tsonic/core/types.js";
import { overloads as O } from "@tsonic/core/lang.js";
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
  public generateKeys(_encoding?: any, _format?: any): any {
    throw new Error("stub");
  }

  public generateKeys_bytes(
    _encoding?: undefined,
    _format?: string
  ): Uint8Array {
    return this.publicKeyBytes();
  }

  public generateKeys_string(
    encoding: string,
    _format?: string
  ): string {
    return encodeOutputBytes(this.publicKeyBytes(), encoding) as string;
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
  ): any {
    throw new Error("stub");
  }

  public computeSecret_string(
    otherPublicKey: string,
    inputEncoding?: string,
    outputEncoding?: string
  ): string {
    return encodeEcdhSecret(
      this.computeSecretBytes(
        toEcdhPublicKeyBytes(otherPublicKey, inputEncoding),
      ),
      outputEncoding,
    );
  }

  public computeSecret_bytes(
    otherPublicKey: Uint8Array,
    _outputEncoding?: undefined
  ): Uint8Array {
    return this.computeSecretBytes(otherPublicKey);
  }

  public computeSecret_bytes_string(
    otherPublicKey: Uint8Array,
    outputEncoding: string
  ): string {
    return encodeOutputString(this.computeSecretBytes(otherPublicKey), outputEncoding);
  }

  /**
   * Returns the EC Diffie-Hellman public key.
   */
  public getPublicKey(encoding?: undefined, _format?: string): Uint8Array;
  public getPublicKey(encoding: string, _format?: string): string;
  public getPublicKey(_encoding?: any, _format?: any): any {
    throw new Error("stub");
  }

  public getPublicKey_bytes(
    _encoding?: undefined,
    _format?: string
  ): Uint8Array {
    return this.publicKeyBytes();
  }

  public getPublicKey_string(
    encoding: string,
    _format?: string
  ): string {
    return encodeOutputBytes(this.publicKeyBytes(), encoding) as string;
  }

  /**
   * Returns the EC Diffie-Hellman private key.
   */
  public getPrivateKey(encoding?: undefined): Uint8Array;
  public getPrivateKey(encoding: string): string;
  public getPrivateKey(_encoding?: any): any {
    throw new Error("stub");
  }

  public getPrivateKey_bytes(_encoding?: undefined): Uint8Array {
    return this.privateKeyBytes();
  }

  public getPrivateKey_string(encoding: string): string {
    return encodeOutputBytes(this.privateKeyBytes(), encoding) as string;
  }

  /**
   * Sets the EC Diffie-Hellman public key (deprecated, throws).
   */
  public setPublicKey(_publicKey: string, _encoding?: string): void;
  public setPublicKey(_publicKey: Uint8Array): void;
  public setPublicKey(_publicKey: any, _encoding?: any): any {
    throw new Error("stub");
  }

  public setPublicKey_string(_publicKey: string, _encoding?: string): void {
    throw new Error("setPublicKey() is not supported. Use setPrivateKey() instead.");
  }

  public setPublicKey_bytes(_publicKey: Uint8Array): void {
    throw new Error("setPublicKey() is not supported. Use setPrivateKey() instead.");
  }

  /**
   * Sets the EC Diffie-Hellman private key.
   */
  public setPrivateKey(privateKey: string, encoding?: string): void;
  public setPrivateKey(privateKey: Uint8Array): void;
  public setPrivateKey(_privateKey: any, _encoding?: any): any {
    throw new Error("stub");
  }

  public setPrivateKey_string(privateKey: string, encoding?: string): void {
    this.importPrivateKeyBytes(decodeInputBytes(privateKey, encoding ?? "base64"));
  }

  public setPrivateKey_bytes(privateKey: Uint8Array): void {
    this.importPrivateKeyBytes(privateKey);
  }

  private publicKeyBytes(): Uint8Array {
    return fromByteArray(this._ecdh.PublicKey.ExportSubjectPublicKeyInfo());
  }

  private privateKeyBytes(): Uint8Array {
    return fromByteArray(this._ecdh.ExportECPrivateKey());
  }

  private computeSecretBytes(otherPublicKey: Uint8Array): Uint8Array {
    const other = ECDiffieHellman.Create(curveFromName(this._curveName));
    other.ImportSubjectPublicKeyInfo(
      toReadOnlyByteSpan(otherPublicKey),
      0 as out<int>,
    );
    const secret = fromByteArray(this._ecdh.DeriveKeyMaterial(other.PublicKey));
    other.Dispose();
    return secret;
  }

  private importPrivateKeyBytes(privateKey: Uint8Array): void {
    this._ecdh.Dispose();
    this._ecdh = ECDiffieHellman.Create(curveFromName(this._curveName));
    this._ecdh.ImportECPrivateKey(toReadOnlyByteSpan(privateKey), 0 as out<int>);
  }
}

O<ECDH>().method(x => x.generateKeys_bytes).family(x => x.generateKeys);
O<ECDH>().method(x => x.generateKeys_string).family(x => x.generateKeys);
O<ECDH>().method(x => x.computeSecret_string).family(x => x.computeSecret);
O<ECDH>().method(x => x.computeSecret_bytes).family(x => x.computeSecret);
O<ECDH>().method(x => x.computeSecret_bytes_string).family(x => x.computeSecret);
O<ECDH>().method(x => x.getPublicKey_bytes).family(x => x.getPublicKey);
O<ECDH>().method(x => x.getPublicKey_string).family(x => x.getPublicKey);
O<ECDH>().method(x => x.getPrivateKey_bytes).family(x => x.getPrivateKey);
O<ECDH>().method(x => x.getPrivateKey_string).family(x => x.getPrivateKey);
O<ECDH>().method(x => x.setPublicKey_string).family(x => x.setPublicKey);
O<ECDH>().method(x => x.setPublicKey_bytes).family(x => x.setPublicKey);
O<ECDH>().method(x => x.setPrivateKey_string).family(x => x.setPrivateKey);
O<ECDH>().method(x => x.setPrivateKey_bytes).family(x => x.setPrivateKey);
