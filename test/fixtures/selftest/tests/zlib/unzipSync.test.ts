import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { deflateSync, gzipSync, unzipSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes, utf8String } from "./helpers.ts";

/**
 *
 * NOTE: unzipSync, gzipSync, and deflateSync are placeholders pending
 * native zlib bindings. These tests will pass once the native
 * implementation is provided.
 */
export class Zlib_unzipSyncTests {
  unzipSync_ShouldDecompressGzip(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = gzipSync(original);
    const decompressed = unzipSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  unzipSync_ShouldDecompressDeflate(): void {
    const original = utf8Bytes("Hello, World!");
    const compressed = deflateSync(original);
    const decompressed = unzipSync(compressed);

    Assert.Equal(original.length, decompressed.length);
  }

  unzipSync_WithGzipData_ShouldAutoDetect(): void {
    const originalText = "Test data for auto-detection";
    const original = utf8Bytes(originalText);
    const compressed = gzipSync(original);
    const decompressed = unzipSync(compressed);
    const resultText = utf8String(decompressed);

    Assert.Equal(originalText, resultText);
  }

  unzipSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => unzipSync(asinterface<Uint8Array>(null)));
  }

  unzipSync_WithTooSmallBuffer_ShouldThrow(): void {
    const tooSmall = new Uint8Array([0x00]);

    assertThrows(() => unzipSync(tooSmall));
  }
}

A<Zlib_unzipSyncTests>()
  .method((t) => t.unzipSync_ShouldDecompressGzip)
  .add(FactAttribute);
A<Zlib_unzipSyncTests>()
  .method((t) => t.unzipSync_ShouldDecompressDeflate)
  .add(FactAttribute);
A<Zlib_unzipSyncTests>()
  .method((t) => t.unzipSync_WithGzipData_ShouldAutoDetect)
  .add(FactAttribute);
A<Zlib_unzipSyncTests>()
  .method((t) => t.unzipSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_unzipSyncTests>()
  .method((t) => t.unzipSync_WithTooSmallBuffer_ShouldThrow)
  .add(FactAttribute);
