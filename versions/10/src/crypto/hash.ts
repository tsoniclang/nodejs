import { overloads as O } from "@tsonic/core/lang.js";
import {
  computeHashBytes,
  concatBytes,
  decodeInputBytes,
  encodeOutputString,
} from "./crypto-helpers.ts";

/**
 * Node.js crypto Hash class.
 *
 */

/**
 * The Hash class is a utility for creating hash digests of data.
 */
export class Hash {
  private readonly _algorithm: string;
  private readonly _chunks: Uint8Array[] = [];
  private _finalized: boolean = false;

  public constructor(algorithm: string) {
    this._algorithm = algorithm;
  }

  /**
   * Updates the hash content with the given data.
   */
  public update(data: string, inputEncoding?: string): Hash;
  public update(data: Uint8Array): Hash;
  public update(data: any, inputEncoding?: any): any {
    if (typeof data === "string") {
      return this.update_string(data, inputEncoding);
    }

    return this.update_bytes(data);
  }

  public update_string(data: string, inputEncoding?: string): Hash {
    this.pushChunk(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  public update_bytes(data: Uint8Array): Hash {
    this.pushChunk(data);
    return this;
  }

  /**
   * Calculates the digest of all data passed to be hashed.
   */
  public digest(encoding: string): string;
  public digest(): Uint8Array;
  public digest(outputLength: number): Uint8Array;
  public digest(encodingOrLength?: any): any {
    if (typeof encodingOrLength === "string") {
      return this.digest_encoding(encodingOrLength);
    }

    if (typeof encodingOrLength === "number") {
      return this.digest_length(encodingOrLength);
    }

    return this.digest_bytes();
  }

  public digest_encoding(encoding: string): string {
    return encodeOutputString(this.finalizeDigest(), encoding);
  }

  public digest_bytes(): Uint8Array {
    return this.finalizeDigest();
  }

  public digest_length(outputLength: number): Uint8Array {
    return this.finalizeDigest(outputLength);
  }

  /**
   * Creates a copy of the Hash object in its current state.
   */
  public copy(): Hash {
    if (this._finalized) {
      throw new Error("Cannot copy finalized hash");
    }

    const copy = new Hash(this._algorithm);
    for (let index = 0; index < this._chunks.length; index += 1) {
      copy._chunks.push(this._chunks[index]!);
    }
    return copy;
  }

  private pushChunk(chunk: Uint8Array): void {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._chunks.push(chunk);
  }

  private finalizeDigest(outputLength?: number): Uint8Array {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._finalized = true;
    return computeHashBytes(
      this._algorithm,
      concatBytes(...this._chunks),
      outputLength,
    );
  }
}

O<Hash>().method(x => x.update_string).family(x => x.update);
O<Hash>().method(x => x.update_bytes).family(x => x.update);
O<Hash>().method(x => x.digest_encoding).family(x => x.digest);
O<Hash>().method(x => x.digest_bytes).family(x => x.digest);
O<Hash>().method(x => x.digest_length).family(x => x.digest);
