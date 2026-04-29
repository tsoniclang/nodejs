import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { randomFillSync } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class RandomFillSyncTests {
  randomFillSync_fills_buffer(): void {
    const buffer = new Uint8Array(32);
    randomFillSync(buffer);
    let allZeros = true;
    for (let i = 0; i < buffer.length; i++) {
      if (buffer[i] !== 0) {
        allZeros = false;
        break;
      }
    }
    Assert.False(allZeros);
  }

  randomFillSync_with_offset_and_size(): void {
    const buffer = new Uint8Array(64);
    randomFillSync(buffer, 16 as int, 32 as int);
    for (let i = 0; i < 16; i++) {
      Assert.True(buffer[i] === 0);
    }
    let hasNonZero = false;
    for (let i = 16; i < 48; i++) {
      if (buffer[i] !== 0) {
        hasNonZero = true;
        break;
      }
    }
    Assert.True(hasNonZero);
  }
}

A<RandomFillSyncTests>().method((t) => t.randomFillSync_fills_buffer).add(FactAttribute);
A<RandomFillSyncTests>().method((t) => t.randomFillSync_with_offset_and_size).add(FactAttribute);
