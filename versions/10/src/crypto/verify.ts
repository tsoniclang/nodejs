/**
 * Node.js crypto Verify class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Verify.cs
 */
import { overloads as O } from "@tsonic/core/lang.js";
import {
  DSA,
  ECDsa,
  RSA,
  RSASignaturePadding,
} from "@tsonic/dotnet/System.Security.Cryptography.js";
import {
  coercePublicKeyObject,
  isDsaKey,
  isEcDsaKey,
  isRsaKey,
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
  public update(_data: any, _inputEncoding?: any): any {
    throw new Error("stub");
  }

  public update_string(data: string, inputEncoding?: string): Verify {
    this.pushChunk(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  public update_bytes(data: Uint8Array): Verify {
    this.pushChunk(data);
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
  public verify(_publicKey: any, _signature: any, _signatureEncoding?: any): any {
    throw new Error("stub");
  }

  public verify_string_string(
    publicKey: string,
    signature: string,
    signatureEncoding?: string
  ): boolean {
    return this.finalizeVerification(publicKey, signature, signatureEncoding);
  }

  public verify_string_bytes(
    publicKey: string,
    signature: Uint8Array
  ): boolean {
    return this.finalizeVerification(publicKey, signature);
  }

  public verify_key_string(
    publicKey: KeyObject,
    signature: string,
    signatureEncoding?: string
  ): boolean {
    return this.finalizeVerification(publicKey, signature, signatureEncoding);
  }

  public verify_key_bytes(
    publicKey: KeyObject,
    signature: Uint8Array
  ): boolean {
    return this.finalizeVerification(publicKey, signature);
  }

  private pushChunk(chunk: Uint8Array): void {
    if (this._finalized) {
      throw new Error("Verify already finalized");
    }

    this._chunks.push(chunk);
  }

  private finalizeVerification(
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

O<Verify>().method(x => x.update_string).family(x => x.update);
O<Verify>().method(x => x.update_bytes).family(x => x.update);
O<Verify>().method(x => x.verify_string_string).family(x => x.verify);
O<Verify>().method(x => x.verify_string_bytes).family(x => x.verify);
O<Verify>().method(x => x.verify_key_string).family(x => x.verify);
O<Verify>().method(x => x.verify_key_bytes).family(x => x.verify);

const verifyBytes = (
  algorithm: string,
  publicKey: PublicKeyObject,
  data: Uint8Array,
  signature: Uint8Array,
): boolean => {
  const nativeKeyData = publicKey.nativeKeyData;
  if (isRsaKey(nativeKeyData)) {
    return nativeKeyData.VerifyData(
      toByteArray(data),
      toByteArray(signature),
      toHashAlgorithmName(algorithm),
      RSASignaturePadding.Pkcs1,
    );
  }

  if (isDsaKey(nativeKeyData)) {
    const hash = computeHashBytes(algorithm, data);
    return nativeKeyData.VerifySignature(
      toByteArray(hash),
      toByteArray(signature),
    );
  }

  if (isEcDsaKey(nativeKeyData)) {
    return nativeKeyData.VerifyData(
      toByteArray(data),
      toByteArray(signature),
      toHashAlgorithmName(algorithm),
    );
  }

  throw new Error("Unsupported public key for verification");
};
