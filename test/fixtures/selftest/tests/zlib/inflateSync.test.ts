import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { deflateSync, inflateSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes, utf8String } from "./helpers.ts";

/**
 *
 * NOTE: inflateSync and deflateSync are placeholders pending native zlib bindings.
 * These tests will pass once the native implementation is provided.
 */
export class Zlib_inflateSyncTests {
  inflateSync_ShouldDecompressData(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = deflateSync(original);
    const decompressed = inflateSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  inflateSync_ShouldRestoreOriginalText(): void {
    const originalText = "The quick brown fox jumps over the lazy dog";
    const original = utf8Bytes(originalText);

    const compressed = deflateSync(original);
    const decompressed = inflateSync(compressed);
    const resultText = utf8String(decompressed);

    Assert.Equal(originalText, resultText);
  }

  inflateSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => inflateSync(asinterface<Uint8Array>(null)));
  }

  inflateSync_WithInvalidData_ShouldThrow(): void {
    const invalidData = utf8Bytes("This is not compressed");

    assertThrows(() => inflateSync(invalidData));
  }
}

A<Zlib_inflateSyncTests>()
  .method((t) => t.inflateSync_ShouldDecompressData)
  .add(FactAttribute);
A<Zlib_inflateSyncTests>()
  .method((t) => t.inflateSync_ShouldRestoreOriginalText)
  .add(FactAttribute);
A<Zlib_inflateSyncTests>()
  .method((t) => t.inflateSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_inflateSyncTests>()
  .method((t) => t.inflateSync_WithInvalidData_ShouldThrow)
  .add(FactAttribute);
