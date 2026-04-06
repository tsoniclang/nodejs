import { overloads as O } from "@tsonic/core/lang.js";
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
  public update(_data: any, _inputOrOutputEncoding?: any, _outputEncoding?: any): any {
    throw new Error("stub");
  }

  public update_string(
    data: string,
    inputEncoding?: string,
    _outputEncoding?: string,
  ): string {
    this.pushChunk(decodeInputBytes(data, inputEncoding ?? "utf8"));
    return "";
  }

  public update_bytes(data: Uint8Array, _outputEncoding?: string): string {
    this.pushChunk(data);
    return "";
  }

  /**
   * Returns any remaining enciphered contents.
   */
  public final(outputEncoding: string): string;
  public final(): Uint8Array;
  public final(_outputEncoding?: any): any {
    throw new Error("stub");
  }

  public final_string(outputEncoding: string): string {
    return encodeOutputBytes(this.finalizeBytes(), outputEncoding) as string;
  }

  public final_bytes(): Uint8Array {
    return this.finalizeBytes();
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

  private pushChunk(chunk: Uint8Array): void {
    if (this._finalized) {
      throw new Error("Cipher already finalized");
    }

    this._chunks.push(chunk);
  }

  private finalizeBytes(): Uint8Array {
    if (this._finalized) {
      throw new Error("Cipher already finalized");
    }

    this._finalized = true;
    return transformAes(
      this._algorithm,
      this._key,
      this._iv,
      concatBytes(...this._chunks),
      true,
    );
  }
}

O<Cipher>().method(x => x.update_string).family(x => x.update);
O<Cipher>().method(x => x.update_bytes).family(x => x.update);
O<Cipher>().method(x => x.final_string).family(x => x.final);
O<Cipher>().method(x => x.final_bytes).family(x => x.final);
