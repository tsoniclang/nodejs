import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { setDefaultEncoding } from "@tsonic/nodejs/crypto.js";

export class SetDefaultEncodingTests {
  public setDefaultEncoding_does_not_throw(): void {
    let threw = false;
    try {
      setDefaultEncoding("hex");
      setDefaultEncoding("base64");
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }
}

A<SetDefaultEncodingTests>().method((t) => t.setDefaultEncoding_does_not_throw).add(FactAttribute);
