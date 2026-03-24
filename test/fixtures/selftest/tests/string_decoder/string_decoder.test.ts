import { Assert } from "xunit-types/Xunit.js";

import { Buffer } from "@tsonic/nodejs/buffer.js";
import { StringDecoder } from "@tsonic/nodejs/string_decoder.js";

const utf8Bytes = (str: string): Uint8Array => Buffer.from(str, "utf8").buffer;

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/string_decoder/string_decoder.tests.cs
 */
export class StringDecoderTests {
  public write_ShouldDecodeSimpleUtf8String(): void {
    const decoder = new StringDecoder("utf8");
    const bytes = utf8Bytes("hello world");
    const result = decoder.write(bytes);
    Assert.Equal("hello world", result);
  }

  public write_ShouldHandleEmptyBuffer(): void {
    const decoder = new StringDecoder("utf8");
    const bytes = new Uint8Array(0);
    const result = decoder.write(bytes);
    Assert.Equal("", result);
  }

  public write_ShouldPreserveIncompleteMultibyteSequence(): void {
    const decoder = new StringDecoder("utf8");
    // Euro symbol (€) is 3 bytes in UTF-8: E2 82 AC
    const result1 = decoder.write(new Uint8Array([0xe2]));
    Assert.Equal("", result1);

    const result2 = decoder.write(new Uint8Array([0x82]));
    Assert.Equal("", result2);

    const result3 = decoder.write(new Uint8Array([0xac]));
    Assert.Equal("€", result3);
  }

  public write_ShouldHandleMultipleCompleteCharacters(): void {
    const decoder = new StringDecoder("utf8");
    const bytes = utf8Bytes("Hello 世界");
    const result = decoder.write(bytes);
    Assert.Equal("Hello 世界", result);
  }

  public write_ShouldDefaultToUtf8(): void {
    const decoder = new StringDecoder();
    const bytes = utf8Bytes("hello");
    const result = decoder.write(bytes);
    Assert.Equal("hello", result);
  }

  public end_ShouldReturnEmptyStringWithoutBuffer(): void {
    const decoder = new StringDecoder("utf8");
    const result = decoder.end();
    Assert.Equal("", result);
  }

  public end_ShouldDecodeOptionalBuffer(): void {
    const decoder = new StringDecoder("utf8");
    const bytes = utf8Bytes("hello");
    const result = decoder.end(bytes);
    Assert.Equal("hello", result);
  }

  public end_ShouldFlushIncompleteBytes(): void {
    const decoder = new StringDecoder("utf8");
    // Start of a multi-byte sequence
    decoder.write(new Uint8Array([0xe2, 0x82]));
    const result = decoder.end();
    // Should return something (substitution character or the incomplete bytes)
    Assert.NotNull(result);
  }

  public end_ShouldAllowReuse(): void {
    const decoder = new StringDecoder("utf8");
    // First use
    const result1 = decoder.end(utf8Bytes("hello"));
    Assert.Equal("hello", result1);
    // Second use after end()
    const result2 = decoder.write(utf8Bytes("world"));
    Assert.Equal("world", result2);
  }

  public constructor_ShouldAcceptNull(): void {
    const decoder = new StringDecoder(null);
    const result = decoder.write(utf8Bytes("hello"));
    Assert.Equal("hello", result);
  }

  public write_TwoByteUtf8_Complete(): void {
    const decoder = new StringDecoder("utf8");
    // ¢ (cent sign) = 0xC2 0xA2
    const result = decoder.write(new Uint8Array([0xc2, 0xa2]));
    Assert.Equal("¢", result);
  }

  public write_TwoByteUtf8_SplitByteByByte(): void {
    const decoder = new StringDecoder("utf8");
    const result1 = decoder.write(new Uint8Array([0xc2]));
    Assert.Equal("", result1);
    const result2 = decoder.write(new Uint8Array([0xa2]));
    Assert.Equal("¢", result2);
  }

  public write_FourByteUtf8_Complete(): void {
    const decoder = new StringDecoder("utf8");
    // 𝄞 (musical symbol G clef) = 0xF0 0x9D 0x84 0x9E
    const result = decoder.write(new Uint8Array([0xf0, 0x9d, 0x84, 0x9e]));
    Assert.Equal("𝄞", result);
  }

  public write_FourByteUtf8_SplitByteByByte(): void {
    const decoder = new StringDecoder("utf8");
    const result1 = decoder.write(new Uint8Array([0xf0]));
    Assert.Equal("", result1);
    const result2 = decoder.write(new Uint8Array([0x9d]));
    Assert.Equal("", result2);
    const result3 = decoder.write(new Uint8Array([0x84]));
    Assert.Equal("", result3);
    const result4 = decoder.write(new Uint8Array([0x9e]));
    Assert.Equal("𝄞", result4);
  }

  public write_FourByteUtf8_SplitAt2Bytes(): void {
    const decoder = new StringDecoder("utf8");
    const result1 = decoder.write(new Uint8Array([0xf0, 0x9d]));
    Assert.Equal("", result1);
    const result2 = decoder.write(new Uint8Array([0x84, 0x9e]));
    Assert.Equal("𝄞", result2);
  }

  public write_MixedAsciiAndFourByte(): void {
    const decoder = new StringDecoder("utf8");
    // "a🌍b" split across writes
    const result1 = decoder.write(new Uint8Array([0x61, 0xf0, 0x9f]));
    Assert.Equal("a", result1);
    const result2 = decoder.write(new Uint8Array([0x8c, 0x8d, 0x62]));
    Assert.Equal("🌍b", result2);
  }

  public constructor_InvalidEncoding_ShouldDefaultToUtf8(): void {
    const decoder = new StringDecoder("invalid-encoding-xyz");
    const result = decoder.write(utf8Bytes("hello"));
    Assert.Equal("hello", result);
  }

  public end_CalledTwice_ShouldReturnEmptyOnSecondCall(): void {
    const decoder = new StringDecoder("utf8");
    decoder.write(utf8Bytes("hi"));
    decoder.end();
    const result2 = decoder.end();
    Assert.Equal("", result2);
  }

  public end_AfterWrite_ThenWriteAgain_ShouldWork(): void {
    const decoder = new StringDecoder("utf8");
    decoder.write(utf8Bytes("hi"));
    decoder.end();
    const result = decoder.write(utf8Bytes("bye"));
    Assert.Equal("bye", result);
  }
}
