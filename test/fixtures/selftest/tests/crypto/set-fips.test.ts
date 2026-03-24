import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { setFips } from "@tsonic/nodejs/crypto.js";

export class SetFipsTests {
  public setFips_false_does_not_throw(): void {
    let threw = false;
    try {
      setFips(false);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public setFips_true_throws(): void {
    let threw = false;
    try {
      setFips(true);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}

A.on(SetFipsTests).method((t) => t.setFips_false_does_not_throw).add(FactAttribute);
A.on(SetFipsTests).method((t) => t.setFips_true_throws).add(FactAttribute);
