import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  brotliCompressSync,
  brotliDecompressSync,
} from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes, utf8String } from "./helpers.ts";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/zlib/brotliDecompressSync.tests.cs
 *
 * NOTE: brotliCompressSync and brotliDecompressSync are placeholders
 * pending native brotli bindings. These tests will pass once the
 * native implementation is provided.
 */
export class Zlib_brotliDecompressSyncTests {
  public brotliDecompressSync_ShouldDecompressData(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  public brotliDecompressSync_ShouldRestoreOriginalText(): void {
    const originalText = "The quick brown fox jumps over the lazy dog";
    const original = utf8Bytes(originalText);

    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);
    const resultText = utf8String(decompressed);

    Assert.Equal(originalText, resultText);
  }

  public brotliDecompressSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => brotliDecompressSync(null as unknown as Uint8Array));
  }

  public brotliDecompressSync_WithInvalidData_ShouldThrow(): void {
    const invalidData = utf8Bytes("This is not compressed");

    assertThrows(() => brotliDecompressSync(invalidData));
  }

  public brotliDecompressSync_LargeData_ShouldDecompress(): void {
    const original = new Uint8Array(50000);
    for (let i = 0; i < original.length; i += 1) {
      original[i] = i % 256;
    }

    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }
}

A.on(Zlib_brotliDecompressSyncTests)
  .method((t) => t.brotliDecompressSync_ShouldDecompressData)
  .add(FactAttribute);
A.on(Zlib_brotliDecompressSyncTests)
  .method((t) => t.brotliDecompressSync_ShouldRestoreOriginalText)
  .add(FactAttribute);
A.on(Zlib_brotliDecompressSyncTests)
  .method((t) => t.brotliDecompressSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A.on(Zlib_brotliDecompressSyncTests)
  .method((t) => t.brotliDecompressSync_WithInvalidData_ShouldThrow)
  .add(FactAttribute);
A.on(Zlib_brotliDecompressSyncTests)
  .method((t) => t.brotliDecompressSync_LargeData_ShouldDecompress)
  .add(FactAttribute);
