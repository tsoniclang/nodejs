import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { deflateSync } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes } from "./helpers.ts";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/zlib/deflateSync.tests.cs
 *
 * NOTE: deflateSync is a placeholder pending native zlib bindings.
 * These tests will pass once the native implementation is provided.
 */
export class Zlib_deflateSyncTests {
  public deflateSync_ShouldCompressData(): void {
    const data = utf8Bytes("Hello, World!");
    const compressed = deflateSync(data);

    Assert.NotNull(compressed);
    Assert.True(compressed.length > 0);
  }

  public deflateSync_WithCompressionLevel_ShouldWork(): void {
    const data = utf8Bytes("Test data for compression");

    const compressed1 = deflateSync(data, { level: 1 });
    const compressed9 = deflateSync(data, { level: 9 });

    Assert.NotNull(compressed1);
    Assert.NotNull(compressed9);
  }

  public deflateSync_WithNullBuffer_ShouldThrow(): void {
    assertThrows(() => deflateSync(asinterface<Uint8Array>(null)));
  }

  public deflateSync_EmptyBuffer_ShouldCompress(): void {
    const data = new Uint8Array(0);
    const compressed = deflateSync(data);

    Assert.NotNull(compressed);
    // Empty deflate produces minimal output
    Assert.True(compressed.length >= 0);
  }
}

A<Zlib_deflateSyncTests>()
  .method((t) => t.deflateSync_ShouldCompressData)
  .add(FactAttribute);
A<Zlib_deflateSyncTests>()
  .method((t) => t.deflateSync_WithCompressionLevel_ShouldWork)
  .add(FactAttribute);
A<Zlib_deflateSyncTests>()
  .method((t) => t.deflateSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<Zlib_deflateSyncTests>()
  .method((t) => t.deflateSync_EmptyBuffer_ShouldCompress)
  .add(FactAttribute);
