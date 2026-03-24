/**
 * A writable stream is an abstraction for a destination to which data is
 * written.
 *
 * Baseline: nodejs-clr/src/nodejs/stream/Writable.cs
 */
import { Stream } from "./stream.ts";

type WriteRequest = {
  readonly chunk: unknown;
  readonly encoding: string | undefined;
  readonly callback: (() => void) | undefined;
};

export class Writable extends Stream {
  private _buffer: WriteRequest[] = [];
  private _ended = false;
  private _writing = false;
  private _corked = false;
  private _destroyed = false;

  /** Is true if it is safe to call write(). */
  public get writable(): boolean {
    return !this._ended && !this._destroyed;
  }

  /** Is true after writable.end() has been called. */
  public get writableEnded(): boolean {
    return this._ended;
  }

  /** Is true after destroy() has been called. */
  public get destroyed(): boolean {
    return this._destroyed;
  }

  /** Number of bytes (or objects) in the write queue ready to be written. */
  public get writableLength(): number {
    return this._buffer.length;
  }

  /** Is true if the stream's buffer has been corked. */
  public get writableCorked(): boolean {
    return this._corked;
  }

  /**
   * Writes data to the stream.
   *
   * @param chunk - The data to write.
   * @param encoding - The encoding if chunk is a string.
   * @param callback - Callback for when this chunk of data is flushed.
   * @returns False if the stream wishes for the calling code to wait for the
   *   'drain' event to be emitted before continuing to write.
   */
  public write(
    chunk: unknown,
    encoding?: string,
    callback?: () => void,
  ): boolean {
    if (this._ended) {
      throw new Error("write after end");
    }

    const request: WriteRequest = {
      chunk,
      encoding,
      callback,
    };

    this._buffer.push(request);

    if (!this._corked) {
      this.processWrites();
    }

    // Simplified: always return true (no backpressure handling in basic
    // implementation)
    return true;
  }

  /**
   * Signals that no more data will be written to the Writable.
   *
   * @param chunk - Optional data to write before ending.
   * @param encoding - The encoding if chunk is a string.
   * @param callback - Optional callback for when the stream has finished.
   */
  public end(
    chunk?: unknown,
    encoding?: string,
    callback?: () => void,
  ): void {
    if (chunk !== undefined && chunk !== null) {
      this.write(chunk, encoding);
    }

    if (callback !== undefined) {
      this.once("finish", (..._args: unknown[]) => {
        callback();
      });
    }

    this._ended = true;

    if (!this._corked) {
      this.processWrites();
    }

    if (this._buffer.length === 0) {
      this.emit("finish");
    }
  }

  /**
   * Forces all written data to be buffered in memory. The buffered data will
   * be flushed when uncork() is called.
   */
  public cork(): void {
    this._corked = true;
  }

  /**
   * Flushes all data buffered since cork() was called.
   */
  public uncork(): void {
    this._corked = false;
    this.processWrites();
  }

  /**
   * Destroys the stream.
   *
   * @param error - Optional error to emit.
   */
  public override destroy(error?: Error): void {
    if (this._destroyed) {
      return;
    }

    this._destroyed = true;
    while (this._buffer.length > 0) {
      this._buffer.pop();
    }

    super.destroy(error);
  }

  private processWrites(): void {
    if (this._writing || this._buffer.length === 0) {
      return;
    }

    this._writing = true;

    while (this._buffer.length > 0) {
      const request = this._buffer.shift()!;
      this._write(request.chunk, request.encoding, () => {
        if (request.callback !== undefined) {
          request.callback();
        }
      });
    }

    this._writing = false;

    if (this._ended && this._buffer.length === 0) {
      this.emit("finish");
    }
  }

  /**
   * Internal method to be implemented by subclasses to write data.
   *
   * @param _chunk - Chunk of data to write.
   * @param _encoding - Encoding if chunk is a string.
   * @param callback - Callback for when write is complete.
   */
  protected _write(
    _chunk: unknown,
    _encoding: string | undefined,
    callback: () => void,
  ): void {
    // To be implemented by subclasses
    callback();
  }

  /**
   * Internal method called right before the stream closes.
   *
   * @param callback - Callback for when finalize is complete.
   */
  protected _final(callback: () => void): void {
    // To be implemented by subclasses
    callback();
  }
}
