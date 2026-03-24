import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { randomInt } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class RandomIntTests {
  public randomInt_generates_within_range(): void {
    for (let i = 0; i < 100; i++) {
      const value = randomInt(10 as int);
      Assert.True(value >= 0);
      Assert.True(value < 10);
    }
  }

  public randomInt_generates_within_custom_range(): void {
    for (let i = 0; i < 100; i++) {
      const value = randomInt(5 as int, 15 as int);
      Assert.True(value >= 5);
      Assert.True(value < 15);
    }
  }
}

A.on(RandomIntTests).method((t) => t.randomInt_generates_within_range).add(FactAttribute);
A.on(RandomIntTests).method((t) => t.randomInt_generates_within_custom_range).add(FactAttribute);
