import { Assert } from "xunit-types/Xunit.js";

import {
  atob,
  btoa,
  Buffer,
  constants,
  isAscii,
  isUtf8,
  kMaxLength,
  kStringMaxLength,
  transcode,
} from "@tsonic/nodejs/buffer.js";

export class BufferModuleTests {
  btoa_And_atob_ShouldRoundTrip(): void {
    const encoded = btoa("hello");
    const decoded = atob(encoded);
    Assert.Equal("hello", decoded);
  }

  isAscii_ShouldValidateBuffer(): void {
    Assert.True(isAscii(Buffer.from("hello")));
  }

  isAscii_ShouldReturnFalseForNonAscii(): void {
    // Build a buffer with a byte > 0x7F directly
    Assert.False(isAscii(Buffer.from([0x80, 0x90])));
  }

  isUtf8_ShouldValidateValidBytes(): void {
    Assert.True(isUtf8(Buffer.from("hello")));
  }

  isUtf8_ShouldReturnFalseForInvalidBytes(): void {
    Assert.False(isUtf8(Buffer.from([0xff, 0xff])));
  }

  transcode_ShouldReturnBuffer(): void {
    const result = transcode(Buffer.from("hello"), "utf8", "utf8");
    Assert.Equal("hello", result.toString());
  }

  constants_ShouldBeAvailable(): void {
    Assert.True(kMaxLength > 0);
    Assert.True(kStringMaxLength > 0);
    Assert.True(constants.MAX_LENGTH > 0);
    Assert.True(constants.MAX_STRING_LENGTH > 0);
  }
}
