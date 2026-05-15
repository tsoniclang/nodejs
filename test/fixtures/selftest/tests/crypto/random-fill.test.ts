import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { randomFill } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class RandomFillTests {
  randomFill_async_works(): void {
    const buffer = new Uint8Array(32);
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    randomFill(buffer, 0 as int, 32 as int, (err, buf) => {
      error = err;
      result = buf;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
  }

  randomFill_works(): void {
    const buffer = new Uint8Array(32);
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    randomFill(buffer, 0 as int, 16 as int, (err, buf) => {
      error = err;
      result = buf;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
    Assert.Equal(buffer, result);
  }
}

A<RandomFillTests>().method((t) => t.randomFill_async_works).add(FactAttribute);
A<RandomFillTests>().method((t) => t.randomFill_works).add(FactAttribute);
