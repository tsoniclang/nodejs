import { Assert } from "xunit-types/Xunit.js";

import { Buffer } from "@tsonic/nodejs/buffer.js";

export class BufferTests {
  public alloc_ShouldCreateZeroFilledBuffer(): void {
    const buf = Buffer.alloc(10);
    Assert.Equal(10, buf.length);
    for (let i = 0; i < 10; i += 1) {
      Assert.Equal(0, buf.at(i) as number);
    }
  }

  public alloc_WithFillValue_ShouldFillBuffer(): void {
    const buf = Buffer.alloc(5, 42);
    for (let i = 0; i < 5; i += 1) {
      Assert.Equal(42, buf.at(i) as number);
    }
  }

  public allocUnsafe_ShouldCreateBuffer(): void {
    const buf = Buffer.allocUnsafe(10);
    Assert.Equal(10, buf.length);
  }

  public from_String_ShouldCreateBufferFromString(): void {
    const buf = Buffer.from("hello", "utf8");
    Assert.Equal(5, buf.length);
    Assert.Equal("hello", buf.toString());
  }

  public from_Array_ShouldCreateBufferFromArray(): void {
    const buf = Buffer.from([1, 2, 3, 4, 5]);
    Assert.Equal(5, buf.length);
    Assert.Equal(1, buf.at(0) as number);
    Assert.Equal(5, buf.at(4) as number);
  }

  public from_ArrayWithLargeValues_ShouldTruncateTo8Bits(): void {
    const buf = Buffer.from([257, 258]);
    Assert.Equal(1, buf.at(0) as number); // 257 & 0xFF = 1
    Assert.Equal(2, buf.at(1) as number); // 258 & 0xFF = 2
  }

  public of_ShouldCreateBufferFromVariadicArgs(): void {
    const buf = Buffer.of(1, 2, 3);
    Assert.Equal(3, buf.length);
    Assert.Equal(1, buf.at(0) as number);
    Assert.Equal(3, buf.at(2) as number);
  }

  public isBuffer_ShouldReturnTrueForBuffer(): void {
    const buf = Buffer.alloc(10);
    Assert.True(Buffer.isBuffer(buf));
  }

  public isBuffer_ShouldReturnFalseForNonBuffer(): void {
    Assert.False(Buffer.isBuffer("string"));
    Assert.False(Buffer.isBuffer(42));
    Assert.False(Buffer.isBuffer(null));
  }

  public isEncoding_ShouldReturnTrueForValidEncodings(): void {
    Assert.True(Buffer.isEncoding("utf8"));
    Assert.True(Buffer.isEncoding("utf-8"));
    Assert.True(Buffer.isEncoding("ascii"));
    Assert.True(Buffer.isEncoding("base64"));
    Assert.True(Buffer.isEncoding("hex"));
  }

  public isEncoding_ShouldReturnFalseForInvalidEncoding(): void {
    Assert.False(Buffer.isEncoding("invalid"));
  }

  public byteLength_ShouldCalculateCorrectLength(): void {
    Assert.Equal(5, Buffer.byteLength("hello", "utf8"));
  }

  public concat_ShouldConcatenateBuffers(): void {
    const buf1 = Buffer.from("hello");
    const buf2 = Buffer.from(" world");
    const result = Buffer.concat([buf1, buf2]);
    Assert.Equal("hello world", result.toString());
  }

  public concat_WithTotalLength_ShouldLimitSize(): void {
    const buf1 = Buffer.from("hello");
    const buf2 = Buffer.from(" world");
    const result = Buffer.concat([buf1, buf2], 8);
    Assert.Equal(8, result.length);
    Assert.Equal("hello wo", result.toString());
  }

  public toString_Utf8_ShouldDecodeCorrectly(): void {
    const buf = Buffer.from("hello");
    Assert.Equal("hello", buf.toString("utf8"));
  }

  public toString_Hex_ShouldEncodeAsHex(): void {
    const buf = Buffer.from([0x48, 0x65, 0x6c, 0x6c, 0x6f]);
    Assert.Equal("48656c6c6f", buf.toString("hex"));
  }

  public toString_Base64_ShouldEncodeAsBase64(): void {
    const buf = Buffer.from("hello");
    Assert.Equal("aGVsbG8=", buf.toString("base64"));
  }

  public toString_WithRange_ShouldDecodeSubstring(): void {
    const buf = Buffer.from("hello world");
    Assert.Equal("world", buf.toString("utf8", 6, 11));
  }

  public write_ShouldWriteString(): void {
    const buf = Buffer.alloc(10);
    const written = buf.write("hello", 0);
    Assert.Equal(5, written);
    Assert.Equal("hello", buf.toString("utf8", 0, 5));
  }

  public write_WithOffset_ShouldWriteAtOffset(): void {
    const buf = Buffer.alloc(10);
    buf.write("hello", 5);
    Assert.Equal("hello", buf.toString("utf8", 5, 10));
  }

  public write_Hex_ShouldWriteHexString(): void {
    const buf = Buffer.alloc(5);
    buf.write("48656c6c6f", 0, undefined, "hex");
    Assert.Equal("Hello", buf.toString("utf8"));
  }

  public slice_ShouldCreateSubBuffer(): void {
    const buf = Buffer.from("hello world");
    const sl = buf.slice(6, 11);
    Assert.Equal(5, sl.length);
    Assert.Equal("world", sl.toString());
  }

  public slice_WithNegativeIndices_ShouldHandleCorrectly(): void {
    const buf = Buffer.from("hello");
    const sl = buf.slice(-3);
    Assert.Equal("llo", sl.toString());
  }

  public copy_ShouldCopyBytes(): void {
    const source = Buffer.from("hello");
    const target = Buffer.alloc(10);
    const copied = source.copy(target, 0, 0, 5);
    Assert.Equal(5, copied);
    Assert.Equal("hello", target.toString("utf8", 0, 5));
  }

  public copy_WithOffset_ShouldCopyToOffset(): void {
    const source = Buffer.from("world");
    const target = Buffer.alloc(11);
    Buffer.from("hello").copy(target, 0);
    target.set(5, 32); // space
    source.copy(target, 6);
    Assert.Equal("hello world", target.toString("utf8"));
  }

  public fill_WithNumber_ShouldFillBuffer(): void {
    const buf = Buffer.alloc(5);
    buf.fill(42);
    for (let i = 0; i < 5; i += 1) {
      Assert.Equal(42, buf.at(i) as number);
    }
  }

  public fill_WithString_ShouldFillWithPattern(): void {
    const buf = Buffer.alloc(10);
    buf.fill("ab");
    Assert.Equal("ababababab", buf.toString());
  }

  public fill_WithRange_ShouldFillRange(): void {
    const buf = Buffer.alloc(10);
    buf.fill(42, 2, 7);
    Assert.Equal(0, buf.at(0) as number);
    Assert.Equal(42, buf.at(2) as number);
    Assert.Equal(42, buf.at(6) as number);
    Assert.Equal(0, buf.at(7) as number);
  }

  public equals_ShouldReturnTrueForEqualBuffers(): void {
    const buf1 = Buffer.from("hello");
    const buf2 = Buffer.from("hello");
    Assert.True(buf1.equals(buf2));
  }

  public equals_ShouldReturnFalseForDifferentBuffers(): void {
    const buf1 = Buffer.from("hello");
    const buf2 = Buffer.from("world");
    Assert.False(buf1.equals(buf2));
  }

  public compare_ShouldReturnZeroForEqualBuffers(): void {
    const buf1 = Buffer.from("abc");
    const buf2 = Buffer.from("abc");
    Assert.Equal(0, buf1.compare(buf2));
  }

  public compare_ShouldReturnNegativeWhenFirstIsLess(): void {
    const buf1 = Buffer.from("abc");
    const buf2 = Buffer.from("abd");
    Assert.Equal(-1, buf1.compare(buf2));
  }

  public compare_ShouldReturnPositiveWhenFirstIsGreater(): void {
    const buf1 = Buffer.from("abd");
    const buf2 = Buffer.from("abc");
    Assert.Equal(1, buf1.compare(buf2));
  }

  public indexOf_ShouldFindValue(): void {
    const buf = Buffer.from("hello world");
    Assert.Equal(6, buf.indexOf("world"));
  }

  public indexOf_ShouldFindByteValue(): void {
    const buf = Buffer.from("hello world");
    // 'l' = 108
    Assert.Equal(2, buf.indexOf(108));
  }

  public indexOf_ShouldReturnMinusOneWhenNotFound(): void {
    const buf = Buffer.from("hello");
    Assert.Equal(-1, buf.indexOf("xyz"));
  }

  public lastIndexOf_ShouldFindLastOccurrence(): void {
    const buf = Buffer.from("hello world hello");
    Assert.Equal(12, buf.lastIndexOf("hello"));
  }

  public includes_ShouldReturnTrueWhenFound(): void {
    const buf = Buffer.from("hello world");
    Assert.True(buf.includes("world"));
  }

  public includes_ShouldReturnFalseWhenNotFound(): void {
    const buf = Buffer.from("hello");
    Assert.False(buf.includes("xyz"));
  }

  public reverse_ShouldReverseBuffer(): void {
    const buf = Buffer.from("hello");
    buf.reverse();
    Assert.Equal("olleh", buf.toString());
  }

  public swap16_ShouldSwapBytes(): void {
    const buf = Buffer.from([0x01, 0x02, 0x03, 0x04]);
    buf.swap16();
    Assert.Equal(0x02, buf.at(0) as number);
    Assert.Equal(0x01, buf.at(1) as number);
    Assert.Equal(0x04, buf.at(2) as number);
    Assert.Equal(0x03, buf.at(3) as number);
  }

  public readUInt8_ShouldReadByte(): void {
    const buf = Buffer.from([42, 100]);
    Assert.Equal(42, buf.readUInt8(0));
    Assert.Equal(100, buf.readUInt8(1));
  }

  public readInt8_ShouldReadSignedByte(): void {
    const buf = Buffer.from([127, 255]);
    Assert.Equal(127, buf.readInt8(0));
    Assert.Equal(-1, buf.readInt8(1));
  }

  public readUInt16LE_ShouldReadLittleEndian(): void {
    const buf = Buffer.from([0x12, 0x34]);
    Assert.Equal(0x3412, buf.readUInt16LE(0));
  }

  public readUInt16BE_ShouldReadBigEndian(): void {
    const buf = Buffer.from([0x12, 0x34]);
    Assert.Equal(0x1234, buf.readUInt16BE(0));
  }

  public readInt32LE_ShouldReadSignedIntLittleEndian(): void {
    const buf = Buffer.from([0xff, 0xff, 0xff, 0xff]);
    Assert.Equal(-1, buf.readInt32LE(0));
  }

  public readFloatLE_ShouldReadFloat(): void {
    const buf = Buffer.alloc(4);
    buf.writeFloatLE(3.140000104904175, 0);
    // Float32 has limited precision
    const val = buf.readFloatLE(0);
    const delta = val - 3.14;
    Assert.True((delta < 0 ? -delta : delta) < 0.001);
  }

  public readDoubleLE_ShouldReadDouble(): void {
    const buf = Buffer.alloc(8);
    buf.writeDoubleLE(3.141592653589793, 0);
    Assert.Equal(3.141592653589793, buf.readDoubleLE(0));
  }

  public writeUInt8_ShouldWriteByte(): void {
    const buf = Buffer.alloc(2);
    buf.writeUInt8(42, 0);
    buf.writeUInt8(100, 1);
    Assert.Equal(42, buf.at(0) as number);
    Assert.Equal(100, buf.at(1) as number);
  }

  public writeInt16LE_ShouldWriteSignedShortLittleEndian(): void {
    const buf = Buffer.alloc(2);
    buf.writeInt16LE(-1, 0);
    Assert.Equal(0xff, buf.at(0) as number);
    Assert.Equal(0xff, buf.at(1) as number);
  }

  public writeUInt32BE_ShouldWriteUnsignedIntBigEndian(): void {
    const buf = Buffer.alloc(4);
    buf.writeUInt32BE(0x12345678, 0);
    Assert.Equal(0x12, buf.at(0) as number);
    Assert.Equal(0x34, buf.at(1) as number);
    Assert.Equal(0x56, buf.at(2) as number);
    Assert.Equal(0x78, buf.at(3) as number);
  }

  public readWriteIntLE_VariableLength_ShouldWork(): void {
    const buf = Buffer.alloc(6);
    buf.writeIntLE(0x123456, 0, 3);
    Assert.Equal(0x123456, buf.readIntLE(0, 3));
  }

  public readWriteUIntBE_VariableLength_ShouldWork(): void {
    const buf = Buffer.alloc(6);
    buf.writeUIntBE(0x123456, 0, 3);
    Assert.Equal(0x123456, buf.readUIntBE(0, 3));
  }

  public toJSON_ShouldReturnCorrectFormat(): void {
    const buf = Buffer.from([1, 2, 3]);
    const json = buf.toJSON();
    Assert.NotNull(json);
    Assert.Equal("Buffer", json.type);
    Assert.Equal(3, json.data.length);
    Assert.Equal(1, json.data[0] as number);
    Assert.Equal(2, json.data[1] as number);
    Assert.Equal(3, json.data[2] as number);
  }

  public indexer_ShouldAllowReadWrite(): void {
    const buf = Buffer.alloc(3);
    buf.set(0, 1);
    buf.set(1, 2);
    buf.set(2, 3);
    Assert.Equal(1, buf.at(0) as number);
    Assert.Equal(2, buf.at(1) as number);
    Assert.Equal(3, buf.at(2) as number);
  }
}
