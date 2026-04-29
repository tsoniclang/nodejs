import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { gunzipSync, gzipSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes, utf8String } from "./helpers.ts";

/**
 *
 * NOTE: gunzipSync and gzipSync are placeholders pending native zlib bindings.
 * These tests will pass once the native implementation is provided.
 */
export class Zlib_gunzipSyncTests {
  gunzipSync_ShouldDecompressData(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = gzipSync(original);
    const decompressed = gunzipSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  gunzipSync_ShouldRestoreOriginalText(): void {
    const originalText = "The quick brown fox jumps over the lazy dog";
    const original = utf8Bytes(originalText);

    const compressed = gzipSync(original);
    const decompressed = gunzipSync(compressed);
    const resultText = utf8String(decompressed);

    Assert.Equal(originalText, resultText);
  }

  gunzipSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => gunzipSync(asinterface<Uint8Array>(null)));
  }

  gunzipSync_WithInvalidData_ShouldThrow(): void {
    const invalidData = utf8Bytes("This is not compressed");

    assertThrows(() => gunzipSync(invalidData));
  }

  gunzipSync_EmptyCompressedData_ShouldDecompress(): void {
    const empty = new Uint8Array(0);
    const compressed = gzipSync(empty);
    const decompressed = gunzipSync(compressed);

    Assert.Equal(0, decompressed.length);
  }

  gunzipSync_LargeData_ShouldDecompress(): void {
    const original = new Uint8Array(100000);
    for (let i = 0; i < original.length; i += 1) {
      original[i] = i % 256;
    }

    const compressed = gzipSync(original);
    const decompressed = gunzipSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }
}

A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_ShouldDecompressData)
  .add(FactAttribute);
A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_ShouldRestoreOriginalText)
  .add(FactAttribute);
A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_WithInvalidData_ShouldThrow)
  .add(FactAttribute);
A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_EmptyCompressedData_ShouldDecompress)
  .add(FactAttribute);
A<Zlib_gunzipSyncTests>()
  .method((t) => t.gunzipSync_LargeData_ShouldDecompress)
  .add(FactAttribute);
