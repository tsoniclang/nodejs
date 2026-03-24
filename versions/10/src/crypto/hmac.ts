import {
  computeHmacBytes,
  concatBytes,
  decodeInputBytes,
  encodeOutputBytes,
} from "./crypto-helpers.ts";

/**
 * Node.js crypto Hmac class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Hmac.cs
 */

/**
 * The Hmac class is a utility for creating cryptographic HMAC digests.
 */
export class Hmac {
  private readonly _algorithm: string;
  private readonly _key: Uint8Array;
  private readonly _chunks: Uint8Array[] = [];
  private _finalized: boolean = false;

  public constructor(algorithm: string, key: Uint8Array) {
    this._algorithm = algorithm;
    this._key = key;
  }

  /**
   * Updates the Hmac content with the given data.
   */
  public update(data: string, inputEncoding?: string): Hmac;
  public update(data: Uint8Array): Hmac;
  public update(data: string | Uint8Array, inputEncoding?: string): Hmac {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._chunks.push(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  /**
   * Calculates the HMAC digest of all the data passed.
   */
  public digest(encoding: string): string;
  public digest(): Uint8Array;
  public digest(encoding?: string): string | Uint8Array {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._finalized = true;
    const bytes = computeHmacBytes(
      this._algorithm,
      this._key,
      concatBytes(...this._chunks),
    );

    if (typeof encoding === "string") {
      return encodeOutputBytes(bytes, encoding) as string;
    }

    return bytes;
  }
}
