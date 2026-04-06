/**
 * Node.js crypto Sign class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Sign.cs
 */
import { overloads as O } from "@tsonic/core/lang.js";
import {
  DSA,
  ECDsa,
  RSA,
  RSASignaturePadding,
} from "@tsonic/dotnet/System.Security.Cryptography.js";
import {
  coercePrivateKeyObject,
  isDsaKey,
  isEcDsaKey,
  isRsaKey,
  KeyObject,
  PrivateKeyObject,
} from "./key-object.ts";
import {
  concatBytes,
  computeHashBytes,
  decodeInputBytes,
  encodeOutputString,
  fromByteArray,
  toHashAlgorithmName,
  toByteArray,
} from "./crypto-helpers.ts";

/**
 * The Sign class is a utility for generating signatures.
 */
export class Sign {
  private readonly _algorithm: string;
  private readonly _chunks: Uint8Array[] = [];
  private _finalized: boolean = false;

  public constructor(algorithm: string) {
    this._algorithm = algorithm;
  }

  /**
   * Updates the Sign content with the given data.
   */
  public update(data: string, inputEncoding?: string): Sign;
  public update(data: Uint8Array): Sign;
  public update(_data: any, _inputEncoding?: any): any {
    throw new Error("stub");
  }

  public update_string(data: string, inputEncoding?: string): Sign {
    this.pushChunk(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  public update_bytes(data: Uint8Array): Sign {
    this.pushChunk(data);
    return this;
  }

  /**
   * Calculates the signature using a PEM private key string.
   */
  public sign(privateKey: string, outputEncoding: string): string;
  public sign(privateKey: string): Uint8Array;
  /**
   * Calculates the signature using a KeyObject.
   */
  public sign(privateKey: KeyObject, outputEncoding: string): string;
  public sign(privateKey: KeyObject): Uint8Array;
  public sign(_privateKey: any, _outputEncoding?: any): any {
    throw new Error("stub");
  }

  public sign_string_string(privateKey: string, outputEncoding: string): string {
    return encodeOutputString(this.finalizeSignature(privateKey), outputEncoding);
  }

  public sign_string_bytes(privateKey: string): Uint8Array {
    return this.finalizeSignature(privateKey);
  }

  public sign_key_string(privateKey: KeyObject, outputEncoding: string): string {
    return encodeOutputString(this.finalizeSignature(privateKey), outputEncoding);
  }

  public sign_key_bytes(privateKey: KeyObject): Uint8Array {
    return this.finalizeSignature(privateKey);
  }

  private pushChunk(chunk: Uint8Array): void {
    if (this._finalized) {
      throw new Error("Sign already finalized");
    }

    this._chunks.push(chunk);
  }

  private finalizeSignature(privateKey: string | KeyObject): Uint8Array {
    if (this._finalized) {
      throw new Error("Sign already finalized");
    }

    this._finalized = true;
    return signBytes(
      this._algorithm,
      coercePrivateKeyObject(privateKey),
      concatBytes(...this._chunks),
    );
  }
}

O<Sign>().method(x => x.update_string).family(x => x.update);
O<Sign>().method(x => x.update_bytes).family(x => x.update);
O<Sign>().method(x => x.sign_string_string).family(x => x.sign);
O<Sign>().method(x => x.sign_string_bytes).family(x => x.sign);
O<Sign>().method(x => x.sign_key_string).family(x => x.sign);
O<Sign>().method(x => x.sign_key_bytes).family(x => x.sign);

const signBytes = (
  algorithm: string,
  privateKey: PrivateKeyObject,
  data: Uint8Array,
): Uint8Array => {
  const nativeKeyData = privateKey.nativeKeyData;
  if (isRsaKey(nativeKeyData)) {
    return fromByteArray(
      nativeKeyData.SignData(
        toByteArray(data),
        toHashAlgorithmName(algorithm),
        RSASignaturePadding.Pkcs1,
      ),
    );
  }

  if (isDsaKey(nativeKeyData)) {
    const hash = computeHashBytes(algorithm, data);
    return fromByteArray(
      nativeKeyData.CreateSignature(
        toByteArray(hash),
      ),
    );
  }

  if (isEcDsaKey(nativeKeyData)) {
    return fromByteArray(
      nativeKeyData.SignData(
        toByteArray(data),
        toHashAlgorithmName(algorithm),
      ),
    );
  }

  throw new Error("Unsupported private key for signing");
};
