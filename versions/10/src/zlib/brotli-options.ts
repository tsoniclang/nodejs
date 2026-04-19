/**
 * Options for Brotli compression operations.
 *
 */
export interface BrotliOptions {
  /**
   * Compression quality. Range: 0 (fastest) to 11 (best compression).
   * Default: 11 (maximum compression)
   */
  readonly quality?: number;

  /**
   * Chunk size for internal buffer. Default: 16*1024 (16 KB).
   */
  readonly chunkSize?: number;

  /**
   * Maximum output length to prevent excessive memory usage.
   */
  readonly maxOutputLength?: number;
}
