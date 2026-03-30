/**
 * Node.js crypto Sign class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Sign.cs
 */
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
  public update(data: string | Uint8Array, inputEncoding?: string): Sign {
    if (this._finalized) {
      throw new Error("Sign already finalized");
    }

    this._chunks.push(decodeInputBytes(data, inputEncoding ?? "utf8"));
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
  public sign(
    privateKey: string | KeyObject,
    outputEncoding?: string
  ): string | Uint8Array {
    if (this._finalized) {
      throw new Error("Sign already finalized");
    }

    this._finalized = true;
    const signature = signBytes(
      this._algorithm,
      coercePrivateKeyObject(privateKey),
      concatBytes(...this._chunks),
    );

    if (typeof outputEncoding === "string") {
      return encodeOutputString(signature, outputEncoding);
    }

    return signature;
  }
}

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
