import {
  computeHashBytes,
  concatBytes,
  decodeInputBytes,
  encodeOutputString,
} from "./crypto-helpers.ts";

/**
 * Node.js crypto Hash class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Hash.cs
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
  public update(data: string | Uint8Array, inputEncoding?: string): Hash {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._chunks.push(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return this;
  }

  /**
   * Calculates the digest of all data passed to be hashed.
   */
  public digest(encoding: string): string;
  public digest(): Uint8Array;
  public digest(outputLength: number): Uint8Array;
  public digest(encodingOrLength?: string | number): string | Uint8Array {
    if (this._finalized) {
      throw new Error("Digest already called");
    }

    this._finalized = true;
    const bytes = computeHashBytes(
      this._algorithm,
      concatBytes(...this._chunks),
      typeof encodingOrLength === "number" ? encodingOrLength : undefined,
    );

    if (typeof encodingOrLength === "string") {
      return encodeOutputString(bytes, encodingOrLength);
    }

    return bytes;
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
}
