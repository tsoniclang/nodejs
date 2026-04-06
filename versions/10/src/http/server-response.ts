/**
 * Node.js http.ServerResponse — wraps the outgoing HTTP response.
 *
 * Baseline: nodejs-clr/src/nodejs/http/ServerResponse.cs
 *
 * This class requires OS network substrate for the actual response write path.
 * Class shape and method signatures are ported; actual network I/O is stubbed
 * with TODO markers.
 */

import { overloads as O } from "@tsonic/core/lang.js";
import type { byte, int } from "@tsonic/core/types.js";
import type { HttpListenerResponse } from "@tsonic/dotnet/System.Net.js";
import { Encoding } from "@tsonic/dotnet/System.Text.js";
import { Buffer } from "../buffer/index.ts";
import { EventEmitter, toEventListener } from "../events-module.ts";

/**
 * Implements Node.js http.ServerResponse.
 * Wraps the outgoing HTTP response to provide a Node.js-compatible API.
 * Extends EventEmitter to support events like 'finish', 'close'.
 */
export class ServerResponse extends EventEmitter {
  private _statusCode: int = 200 as int;
  private _statusMessage: string = "";
  private _headersSent: boolean = false;
  private _finished: boolean = false;
  private _headers: Map<string, string> = new Map<string, string>();
  private readonly _nativeResponse: HttpListenerResponse | null;
  private readonly _bodyChunks: byte[][] = [];

  constructor(nativeResponse?: HttpListenerResponse | null) {
    super();
    this._nativeResponse = nativeResponse ?? null;
  }

  /**
   * Gets or sets the HTTP status code that will be sent to the client.
   */
  public get statusCode(): int {
    return this._statusCode;
  }

  public set statusCode(value: int) {
    if (this._headersSent) {
      throw new Error("Cannot set status code after headers have been sent");
    }
    this._statusCode = value;
  }

  /**
   * Gets or sets the HTTP status message that will be sent to the client.
   * Note: In HTTP/2, status messages are ignored.
   */
  public get statusMessage(): string {
    return this._statusMessage;
  }

  public set statusMessage(value: string) {
    this._statusMessage = value;
  }

  /**
   * Boolean indicating if headers were sent. Read-only.
   */
  public get headersSent(): boolean {
    return this._headersSent;
  }

  /**
   * Boolean indicating if the response has completed.
   */
  public get finished(): boolean {
    return this._finished;
  }

  /**
   * Sends a response header to the request.
   * Must be called before end() or write().
   * @param statusCode - The HTTP status code.
   * @param statusMessage - Optional status message (ignored in HTTP/2).
   * @param headers - Optional headers object.
   * @returns The ServerResponse instance for chaining.
   */
  public writeHead(
    statusCode: int,
    statusMessage?: string | null,
    headers?: Map<string, string> | null
  ): ServerResponse {
    if (this._headersSent) {
      throw new Error("Headers already sent");
    }

    this._statusCode = statusCode;

    if (statusMessage !== undefined && statusMessage !== null) {
      this._statusMessage = statusMessage;
    }

    if (headers !== undefined && headers !== null) {
      headers.forEach((value, key, _map) => {
        this._headers.set(this._normalizeHeaderName(key), value);
      });
    }

    this._headersSent = true;
    return this;
  }

  /**
   * Sends a response header (overload with just headers, no status message).
   * @param statusCode - The HTTP status code.
   * @param headers - Headers object.
   * @returns The ServerResponse instance for chaining.
   */
  public writeHeadWithHeaders(
    statusCode: int,
    headers: Map<string, string>
  ): ServerResponse {
    return this.writeHead(statusCode, null, headers);
  }

  /**
   * Sets a single header value for implicit headers.
   * @param name - Header name.
   * @param value - Header value.
   * @returns The ServerResponse instance for chaining.
   */
  public setHeader(name: string, value: string): ServerResponse {
    if (this._headersSent) {
      throw new Error("Headers already sent");
    }

    this._headers.set(this._normalizeHeaderName(name), value);
    return this;
  }

  /**
   * Gets the value of a header that's already been queued but not sent.
   * @param name - Header name.
   * @returns Header value or null if not set.
   */
  public getHeader(name: string): string | null {
    const value = this._headers.get(this._normalizeHeaderName(name));
    return value !== undefined ? value : null;
  }

  /**
   * Returns an array containing the unique names of the current outgoing headers.
   * @returns Array of header names.
   */
  public getHeaderNames(): string[] {
    const names: string[] = [];
    this._headers.forEach((_value, key, _map) => {
      names.push(key);
    });
    return names;
  }

  /**
   * Returns a shallow copy of the current outgoing headers.
   * @returns Map of headers.
   */
  public getHeaders(): Map<string, string> {
    const copy = new Map<string, string>();
    this._headers.forEach((value, key, _map) => {
      copy.set(key, value);
    });
    return copy;
  }

  /**
   * Returns true if the header identified by name is currently set.
   * @param name - Header name.
   * @returns True if header exists.
   */
  public hasHeader(name: string): boolean {
    return this._headers.has(this._normalizeHeaderName(name));
  }

  /**
   * Removes a header that's queued for implicit sending.
   * @param name - Header name.
   */
  public removeHeader(name: string): void {
    if (this._headersSent) {
      throw new Error("Headers already sent");
    }

    this._headers.delete(this._normalizeHeaderName(name));
  }

  /**
   * Sends a chunk of the response body.
   * @param chunk - The data to write.
   * @param encoding - Optional encoding (ignored, always UTF-8).
   * @param callback - Optional callback when chunk is flushed.
   * @returns True if entire data was flushed successfully.
   */
  public write(
    chunk: string | Buffer | byte[] | Uint8Array,
    encoding?: string | null,
    callback?: (() => void) | null
  ): boolean {
    if (this._finished) {
      throw new Error("Cannot write after end");
    }

    if (!this._headersSent) {
      this._headersSent = true;
    }

    this._bodyChunks.push(this._toByteArray(chunk, encoding ?? undefined));

    if (callback !== undefined && callback !== null) {
      callback();
    }
    return true;
  }

  /**
   * Signals that all response headers and body have been sent (no payload).
   * @returns This response for chaining.
   */
  public end(): ServerResponse;
  /**
   * Signals response completion with an optional callback and no payload.
   */
  public end(callback: (() => void) | null): ServerResponse;
  /**
   * Signals that all response headers and body have been sent.
   * @param chunk - Final chunk to send.
   * @param encoding - Optional encoding (ignored, always UTF-8).
   * @param callback - Optional callback when response is finished.
   * @returns This response for chaining.
   */
  public end(
    chunk: string | Buffer | byte[] | Uint8Array,
    encoding?: string | null,
    callback?: (() => void) | null
  ): ServerResponse;
  public end(_chunkOrCallback?: any, _encoding?: any, _callback?: any): any {
    throw new Error("stub");
  }

  public end_empty(): ServerResponse {
    if (this._finished) {
      return this;
    }

    this._finalizeResponse(this._flattenBodyChunks());
    return this;
  }

  public end_callback(callback: (() => void) | null): ServerResponse {
    if (this._finished) {
      return this;
    }

    this._finalizeResponse([]);
    if (callback !== null) {
      callback();
    }
    return this;
  }

  public end_chunk(
    chunk: string | Buffer | byte[] | Uint8Array,
    encoding?: string | null,
    callback?: (() => void) | null
  ): ServerResponse {
    if (this._finished) {
      return this;
    }

    this.write(chunk, encoding ?? undefined);
    this._finalizeResponse(this._flattenBodyChunks());
    if (callback !== undefined && callback !== null) {
      callback();
    }
    return this;
  }

  /**
   * Sets the timeout value in milliseconds for the response.
   * @param msecs - Timeout in milliseconds.
   * @param callback - Optional callback for timeout event.
   * @returns The ServerResponse instance.
   */
  public setTimeout(msecs: int, callback?: () => void): ServerResponse {
    if (msecs < 0) {
      throw new Error("Timeout must be non-negative");
    }

    if (callback !== undefined) {
      this.once("timeout", toEventListener(callback)!);
    }

    // TODO: Implement actual timeout mechanism (requires OS timer substrate)
    return this;
  }

  /**
   * Flushes the response headers.
   */
  public flushHeaders(): void {
    if (!this._headersSent) {
      this._headersSent = true;
    }

    this._applyHeadersToNativeResponse();
  }

  private _normalizeHeaderName(name: string): string {
    return name.toLowerCase();
  }

  private _toByteArray(
    chunk: string | Buffer | byte[] | Uint8Array,
    encoding?: string
  ): byte[] {
    if (typeof chunk === "string") {
      return Encoding.UTF8.GetBytes(chunk);
    }

    if (Buffer.isBuffer(chunk)) {
      const result: byte[] = [];
      const source = chunk.buffer;
      for (let index = 0; index < source.length; index += 1) {
        result.push(source[index]! as byte);
      }
      return result;
    }

    if (chunk instanceof Uint8Array) {
      const result: byte[] = [];
      for (let index = 0; index < chunk.length; index += 1) {
        result.push(chunk.at(index)! as byte);
      }
      return result;
    }

    const rawBytes = chunk as byte[];
    const result: byte[] = [];
    for (let index = 0; index < rawBytes.length; index += 1) {
      result.push(rawBytes[index]! as byte);
    }
    return result;
  }

  private _flattenBodyChunks(): byte[] {
    const result: byte[] = [];

    for (const chunk of this._bodyChunks) {
      for (let index = 0; index < chunk.length; index += 1) {
        result.push(chunk[index]!);
      }
    }

    return result;
  }

  private _applyHeadersToNativeResponse(): void {
    if (this._nativeResponse === null) {
      return;
    }

    const nativeResponse = this._nativeResponse;

    nativeResponse.StatusCode = this._statusCode;
    nativeResponse.KeepAlive = false;

    if (this._statusMessage.length > 0) {
      nativeResponse.StatusDescription = this._statusMessage;
    }

    this._headers.forEach((value, key, _map) => {
      if (key === "content-type") {
        nativeResponse.ContentType = value;
        return;
      }

      if (key === "connection") {
        nativeResponse.KeepAlive = value.toLowerCase() === "keep-alive";
        return;
      }

      if (key === "content-length") {
        return;
      }

      nativeResponse.AppendHeader(key, value);
    });
  }

  private _finalizeResponse(body: byte[]): void {
    if (this._finished) {
      return;
    }

    if (!this._headersSent) {
      this._headersSent = true;
    }

    this._applyHeadersToNativeResponse();

    if (this._nativeResponse !== null) {
      this._nativeResponse.Close(body, true);
    }

    this._finished = true;
    this.emit("finish");
    this.emit("close");
  }
}

O<ServerResponse>().method(x => x.end_empty).family(x => x.end);
O<ServerResponse>().method(x => x.end_callback).family(x => x.end);
O<ServerResponse>().method(x => x.end_chunk).family(x => x.end);
