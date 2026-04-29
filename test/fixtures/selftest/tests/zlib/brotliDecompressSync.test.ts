import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  brotliCompressSync,
  brotliDecompressSync,
} from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes, utf8String } from "./helpers.ts";

/**
 *
 * NOTE: brotliCompressSync and brotliDecompressSync are placeholders
 * pending native brotli bindings. These tests will pass once the
 * native implementation is provided.
 */
export class Zlib_brotliDecompressSyncTests {
  brotliDecompressSync_ShouldDecompressData(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  brotliDecompressSync_ShouldRestoreOriginalText(): void {
    const originalText = "The quick brown fox jumps over the lazy dog";
    const original = utf8Bytes(originalText);

    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);
    const resultText = utf8String(decompressed);

    Assert.Equal(originalText, resultText);
  }

  brotliDecompressSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => brotliDecompressSync(asinterface<Uint8Array>(null)));
  }

  brotliDecompressSync_WithInvalidData_ShouldThrow(): void {
    const invalidData = utf8Bytes("This is not compressed");

    assertThrows(() => brotliDecompressSync(invalidData));
  }

  brotliDecompressSync_LargeData_ShouldDecompress(): void {
    const original = new Uint8Array(50000);
    for (let i = 0; i < original.length; i += 1) {
      original[i] = i % 256;
    }

    const compressed = brotliCompressSync(original);
    const decompressed = brotliDecompressSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }
}

A<Zlib_brotliDecompressSyncTests>()
  .method((t) => t.brotliDecompressSync_ShouldDecompressData)
  .add(FactAttribute);
A<Zlib_brotliDecompressSyncTests>()
  .method((t) => t.brotliDecompressSync_ShouldRestoreOriginalText)
  .add(FactAttribute);
A<Zlib_brotliDecompressSyncTests>()
  .method((t) => t.brotliDecompressSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_brotliDecompressSyncTests>()
  .method((t) => t.brotliDecompressSync_WithInvalidData_ShouldThrow)
  .add(FactAttribute);
A<Zlib_brotliDecompressSyncTests>()
  .method((t) => t.brotliDecompressSync_LargeData_ShouldDecompress)
  .add(FactAttribute);
