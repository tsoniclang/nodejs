import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { gzipSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes } from "./helpers.ts";

/**
 *
 * NOTE: gzipSync is a placeholder pending native zlib bindings.
 * These tests will pass once the native implementation is provided.
 */
export class Zlib_gzipSyncTests {
  gzipSync_ShouldCompressData(): void {
    const data = utf8Bytes("Hello, World!");
    const compressed = gzipSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length > 0);
    Assert.NotEqual(data.length, compressed.length);
  }

  gzipSync_ShouldHaveGzipMagicBytes(): void {
    const data = utf8Bytes("Test data");
    const compressed = gzipSync(data);

    // Gzip files start with 0x1f 0x8b
    Assert.True(compressed[0] === 0x1f);
    Assert.True(compressed[1] === 0x8b);
  }

  gzipSync_WithCompressionLevel_ShouldWork(): void {
    const data = utf8Bytes("Test data for compression");

    const compressed1 = gzipSync(data, { level: 1 });
    const compressed9 = gzipSync(data, { level: 9 });

    Assert.NotNull(compressed1);
    Assert.NotNull(compressed9);
  }

  gzipSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => gzipSync(asinterface<Uint8Array>(null)));
  }

  gzipSync_EmptyBuffer_ShouldCompress(): void {
    const data = new Uint8Array(0);
    const compressed = gzipSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length >= 0);
  }

  gzipSync_LargeData_ShouldCompress(): void {
    const data = new Uint8Array(100000);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = i % 256;
    }

    const compressed = gzipSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length < data.length);
  }
}

A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_ShouldCompressData)
  .add(FactAttribute);
A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_ShouldHaveGzipMagicBytes)
  .add(FactAttribute);
A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_WithCompressionLevel_ShouldWork)
  .add(FactAttribute);
A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_EmptyBuffer_ShouldCompress)
  .add(FactAttribute);
A<Zlib_gzipSyncTests>()
  .method((t) => t.gzipSync_LargeData_ShouldCompress)
  .add(FactAttribute);
