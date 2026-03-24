/**
 * Transform streams are Duplex streams where the output is computed from the
 * input.
 *
 * Baseline: nodejs-clr/src/nodejs/stream/Transform.cs
 */
import { Duplex } from "./duplex.ts";

export class Transform extends Duplex {
  /**
   * Internal method to be implemented by subclasses to transform data.
   *
   * @param chunk - Chunk of data to transform.
   * @param encoding - Encoding if chunk is a string.
   * @param callback - Callback for when transform is complete. Call with
   *   (error, data).
   */
  protected _transform(
    chunk: unknown,
    encoding: string | undefined,
    callback: (error: Error | null, data: unknown) => void,
  ): void {
    // Default implementation: pass through
    callback(null, chunk);
  }

  /**
   * Internal method called right before the stream closes, to process any
   * remaining data.
   *
   * @param callback - Callback for when flush is complete.
   */
  protected _flush(callback: (error: Error | null) => void): void {
    // To be implemented by subclasses
    callback(null);
  }

  /**
   * Internal method to write data to the transform stream.
   *
   * @param chunk - Chunk of data to write.
   * @param encoding - Encoding if chunk is a string.
   * @param callback - Callback for when write is complete.
   */
  protected override _write(
    chunk: unknown,
    encoding: string | undefined,
    callback: () => void,
  ): void {
    this._transform(chunk, encoding, (error, data) => {
      if (error !== null) {
        this.emit("error", error);
        callback();
        return;
      }

      if (data !== null && data !== undefined) {
        this.push(data);
      }

      callback();
    });
  }
}
