import { overloads as O } from "@tsonic/core/lang.js";
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
  public update(_data: any, _inputEncoding?: any): any {
    throw new Error("stub");
  }

  public update_string(data: string, inputEncoding?: string): Hmac {
    this.pushChunk(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  public update_bytes(data: Uint8Array): Hmac {
    this.pushChunk(data);
    return this;
  }

  /**
   * Calculates the HMAC digest of all the data passed.
   */
  public digest(encoding: string): string;
  public digest(): Uint8Array;
  public digest(_encoding?: any): any {
    throw new Error("stub");
  }

  public digest_encoding(encoding: string): string {
    return encodeOutputBytes(this.finalizeDigest(), encoding) as string;
  }

  public digest_bytes(): Uint8Array {
    return this.finalizeDigest();
  }

  private pushChunk(chunk: Uint8Array): void {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._chunks.push(chunk);
  }

  private finalizeDigest(): Uint8Array {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._finalized = true;
    return computeHmacBytes(
      this._algorithm,
      this._key,
      concatBytes(...this._chunks),
    );
  }
}

O<Hmac>().method(x => x.update_string).family(x => x.update);
O<Hmac>().method(x => x.update_bytes).family(x => x.update);
O<Hmac>().method(x => x.digest_encoding).family(x => x.digest);
O<Hmac>().method(x => x.digest_bytes).family(x => x.digest);
