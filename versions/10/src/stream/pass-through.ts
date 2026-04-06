/**
 * PassThrough streams are a trivial implementation of a Transform stream that
 * simply passes the input bytes across to the output.
 *
 * Baseline: nodejs-clr/src/nodejs/stream/PassThrough.cs
 */
import type { JsValue } from "@tsonic/core/types.js";
import { Transform } from "./transform.ts";

export class PassThrough extends Transform {
  /**
   * Transforms data by passing it through unchanged.
   *
   * @param chunk - Chunk of data to transform.
   * @param _encoding - Encoding if chunk is a string.
   * @param callback - Callback for when transform is complete.
   */
  protected override _transform(
    chunk: JsValue,
    _encoding: string | undefined,
    callback: (error: Error | null, data: JsValue | null | undefined) => void,
  ): void {
    // Just pass the data through unchanged
    callback(null, chunk);
  }
}
