import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { brotliCompressSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes } from "./helpers.ts";

/**
 *
 * NOTE: brotliCompressSync is a placeholder pending native brotli bindings.
 * These tests will pass once the native implementation is provided.
 */
export class Zlib_brotliCompressSyncTests {
  public brotliCompressSync_ShouldCompressData(): void {
    const data = utf8Bytes("Hello, World!");
    const compressed = brotliCompressSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length > 0);
  }

  public brotliCompressSync_WithQuality_ShouldWork(): void {
    const data = utf8Bytes("Test data for compression");

    const compressed1 = brotliCompressSync(data, { quality: 1 });
    const compressed11 = brotliCompressSync(data, { quality: 11 });

    Assert.NotNull(compressed1);
    Assert.NotNull(compressed11);
  }

  public brotliCompressSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => brotliCompressSync(asinterface<Uint8Array>(null)));
  }

  public brotliCompressSync_EmptyBuffer_ShouldCompress(): void {
    const data = new Uint8Array(0);
    const compressed = brotliCompressSync(data);

    Assert.NotNull(compressed);
  }

  public brotliCompressSync_LargeData_ShouldCompress(): void {
    const data = new Uint8Array(50000);
    for (let i = 0; i < data.length; i += 1) {
      data[i] = i % 256;
    }

    const compressed = brotliCompressSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length < data.length);
  }
}

A<Zlib_brotliCompressSyncTests>()
  .method((t) => t.brotliCompressSync_ShouldCompressData)
  .add(FactAttribute);
A<Zlib_brotliCompressSyncTests>()
  .method((t) => t.brotliCompressSync_WithQuality_ShouldWork)
  .add(FactAttribute);
A<Zlib_brotliCompressSyncTests>()
  .method((t) => t.brotliCompressSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_brotliCompressSyncTests>()
  .method((t) => t.brotliCompressSync_EmptyBuffer_ShouldCompress)
  .add(FactAttribute);
A<Zlib_brotliCompressSyncTests>()
  .method((t) => t.brotliCompressSync_LargeData_ShouldCompress)
  .add(FactAttribute);
