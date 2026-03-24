import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { randomBytes, randomBytesAsync } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class RandomBytesTests {
  public randomBytes_generates_correct_length(): void {
    const bytes = randomBytes(32 as int);
    Assert.Equal(32, bytes.length);
  }

  public randomBytes_generates_different_values(): void {
    const bytes1 = randomBytes(16 as int);
    const bytes2 = randomBytes(16 as int);
    Assert.NotEqual(bytes1, bytes2);
  }

  public randomBytes_async_works(): void {
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    randomBytesAsync(32 as int, (err, buf) => {
      error = err;
      result = buf;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
    Assert.Equal(32, result!.length);
  }

  public randomBytes_callback_works(): void {
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    randomBytesAsync(32 as int, (err, bytes) => {
      error = err;
      result = bytes;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
    Assert.Equal(32, result!.length);
  }
}

A.on(RandomBytesTests).method((t) => t.randomBytes_generates_correct_length).add(FactAttribute);
A.on(RandomBytesTests).method((t) => t.randomBytes_generates_different_values).add(FactAttribute);
A.on(RandomBytesTests).method((t) => t.randomBytes_async_works).add(FactAttribute);
A.on(RandomBytesTests).method((t) => t.randomBytes_callback_works).add(FactAttribute);
