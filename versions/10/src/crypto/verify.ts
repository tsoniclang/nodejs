/**
 * Node.js crypto Verify class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Verify.cs
 */
import {
  DSA,
  ECDsa,
  RSA,
  RSASignaturePadding,
} from "@tsonic/dotnet/System.Security.Cryptography.js";
import {
  coercePublicKeyObject,
  KeyObject,
  PublicKeyObject,
} from "./key-object.ts";
import {
  concatBytes,
  computeHashBytes,
  decodeInputBytes,
  toHashAlgorithmName,
  toByteArray,
} from "./crypto-helpers.ts";

/**
 * The Verify class is a utility for verifying signatures.
 */
export class Verify {
  private readonly _algorithm: string;
  private readonly _chunks: Uint8Array[] = [];
  private _finalized: boolean = false;

  public constructor(algorithm: string) {
    this._algorithm = algorithm;
  }

  /**
   * Updates the Verify content with the given data.
   */
  public update(data: string, inputEncoding?: string): Verify;
  public update(data: Uint8Array): Verify;
  public update(data: string | Uint8Array, inputEncoding?: string): Verify {
    if (this._finalized) {
      throw new Error("Verify already finalized");
    }

    this._chunks.push(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  /**
   * Verifies the provided data using a PEM public key string and signature.
   */
  public verify(publicKey: string, signature: string, signatureEncoding?: string): boolean;
  public verify(publicKey: string, signature: Uint8Array): boolean;
  /**
   * Verifies the provided data using a KeyObject and signature.
   */
  public verify(publicKey: KeyObject, signature: string, signatureEncoding?: string): boolean;
  public verify(publicKey: KeyObject, signature: Uint8Array): boolean;
  public verify(
    publicKey: string | KeyObject,
    signature: string | Uint8Array,
    signatureEncoding?: string
  ): boolean {
    if (this._finalized) {
      throw new Error("Verify already finalized");
    }

    this._finalized = true;
    return verifyBytes(
      this._algorithm,
      coercePublicKeyObject(publicKey),
      concatBytes(...this._chunks),
      decodeInputBytes(signature, signatureEncoding ?? "utf8"),
    );
  }
}

const verifyBytes = (
  algorithm: string,
  publicKey: PublicKeyObject,
  data: Uint8Array,
  signature: Uint8Array,
): boolean => {
  if (publicKey.nativeKeyData instanceof RSA) {
    return publicKey.nativeKeyData.VerifyData(
      toByteArray(data),
      toByteArray(signature),
      toHashAlgorithmName(algorithm),
      RSASignaturePadding.Pkcs1,
    );
  }

  if (publicKey.nativeKeyData instanceof DSA) {
    const hash = computeHashBytes(algorithm, data);
    return publicKey.nativeKeyData.VerifySignature(
      toByteArray(hash),
      toByteArray(signature),
    );
  }

  if (publicKey.nativeKeyData instanceof ECDsa) {
    return publicKey.nativeKeyData.VerifyData(
      toByteArray(data),
      toByteArray(signature),
      toHashAlgorithmName(algorithm),
    );
  }

  throw new Error("Unsupported public key for verification");
};
