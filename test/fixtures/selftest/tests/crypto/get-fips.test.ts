import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getFips } from "@tsonic/nodejs/crypto.js";

export class GetFipsTests {
  getFips_returns_false(): void {
    Assert.False(getFips());
  }
}

A<GetFipsTests>().method((t) => t.getFips_returns_false).add(FactAttribute);
