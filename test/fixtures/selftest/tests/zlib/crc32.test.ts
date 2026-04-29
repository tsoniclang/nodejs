import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { crc32, crc32String } from "@tsonic/nodejs/zlib.js";

import { assertThrows, utf8Bytes } from "./helpers.ts";

export class Zlib_crc32Tests {
  crc32_WithByteArray_ShouldReturnChecksum(): void {
    const data = utf8Bytes("Hello, World!");
    const checksum = crc32(data);

    Assert.True(checksum > 0);
  }

  crc32_WithString_ShouldReturnChecksum(): void {
    const checksum = crc32String("Hello, World!");

    Assert.True(checksum > 0);
  }

  crc32_SameData_ShouldReturnSameChecksum(): void {
    const data = utf8Bytes("Test data");

    const checksum1 = crc32(data);
    const checksum2 = crc32(data);

    Assert.Equal(checksum1, checksum2);
  }

  crc32_DifferentData_ShouldReturnDifferentChecksum(): void {
    const checksum1 = crc32String("Data 1");
    const checksum2 = crc32String("Data 2");

    Assert.NotEqual(checksum1, checksum2);
  }

  crc32_EmptyData_ShouldReturnZero(): void {
    const checksum = crc32(new Uint8Array(0));

    // CRC32 of empty data should be 0
    Assert.Equal(0, checksum);
  }

  crc32_WithNullByteArray_ShouldThrow(): void {
    assertThrows(() => crc32(asinterface<Uint8Array>(null)));
  }

  crc32_WithNullString_ShouldThrow(): void {
    assertThrows(() => crc32String(asinterface<string>(null)));
  }
}

A<Zlib_crc32Tests>()
  .method((t) => t.crc32_WithByteArray_ShouldReturnChecksum)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_WithString_ShouldReturnChecksum)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_SameData_ShouldReturnSameChecksum)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_DifferentData_ShouldReturnDifferentChecksum)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_EmptyData_ShouldReturnZero)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_WithNullByteArray_ShouldThrow)
  .add(FactAttribute);
A<Zlib_crc32Tests>()
  .method((t) => t.crc32_WithNullString_ShouldThrow)
  .add(FactAttribute);
