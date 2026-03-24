import {
  concatBytes,
  decodeInputBytes,
  encodeOutputBytes,
  transformAes,
} from "./crypto-helpers.ts";

/**
 * Node.js crypto Cipher class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/Cipher.cs
 */

/**
 * Instances of the Cipher class are used to encrypt data.
 */
export class Cipher {
  private readonly _algorithm: string;
  private readonly _key: Uint8Array;
  private readonly _iv: Uint8Array | null;
  private readonly _isGcmMode: boolean;
  private readonly _chunks: Uint8Array[] = [];
  private _gcmTag: Uint8Array | null = null;
  private _gcmAad: Uint8Array | null = null;
  private _finalized: boolean = false;

  public constructor(algorithm: string, key: Uint8Array, iv: Uint8Array | null) {
    this._algorithm = algorithm;
    this._key = key;
    this._iv = iv;
    this._isGcmMode = algorithm.toLowerCase().includes("-gcm");
  }

  /**
   * Updates the cipher with data.
   */
  public update(data: string, inputEncoding?: string, outputEncoding?: string): string;
  public update(data: Uint8Array, outputEncoding?: string): string;
  public update(
    data: string | Uint8Array,
    inputOrOutputEncoding?: string,
    _outputEncoding?: string,
  ): string {
    if (this._finalized) {
      throw new Error("Cipher already finalized");
    }

    if (typeof data === "string") {
      this._chunks.push(decodeInputBytes(data, inputOrOutputEncoding ?? "utf8"));
    } else {
      this._chunks.push(data);
    }
    return "";
  }

  /**
   * Returns any remaining enciphered contents.
   */
  public final(outputEncoding: string): string;
  public final(): Uint8Array;
  public final(outputEncoding?: string): string | Uint8Array {
    if (this._finalized) {
      throw new Error("Cipher already finalized");
    }

    this._finalized = true;
    const bytes = transformAes(
      this._algorithm,
      this._key,
      this._iv,
      concatBytes(...this._chunks),
      true,
    );

    if (typeof outputEncoding === "string") {
      return encodeOutputBytes(bytes, outputEncoding) as string;
    }

    return bytes;
  }

  /**
   * When using an authenticated encryption mode, sets the length of the authentication tag.
   */
  public setAuthTag(_tagLength: number): void {
    if (!this._isGcmMode) {
      throw new Error("setAuthTag is only supported for GCM modes");
    }

    // TODO: actual GCM tag length setting
  }

  /**
   * When using an authenticated encryption mode, returns the authentication tag.
   */
  public getAuthTag(): Uint8Array {
    if (!this._isGcmMode) {
      throw new Error("getAuthTag is only supported for GCM modes");
    }

    if (!this._finalized) {
      throw new Error("Must call final() before getAuthTag()");
    }

    if (this._gcmTag === null) {
      throw new Error("No auth tag available");
    }

    return this._gcmTag;
  }

  /**
   * When using an authenticated encryption mode, sets AAD (Additional Authenticated Data).
   */
  public setAAD(buffer: Uint8Array): void {
    if (!this._isGcmMode) {
      throw new Error("setAAD is only supported for GCM modes");
    }

    if (this._finalized) {
      throw new Error("Cannot set AAD after finalization");
    }

    this._gcmAad = buffer;
    void this._gcmAad;
  }
}
