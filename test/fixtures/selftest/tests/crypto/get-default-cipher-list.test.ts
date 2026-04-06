import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getDefaultCipherList } from "@tsonic/nodejs/crypto.js";

export class GetDefaultCipherListTests {
  public getDefaultCipherList_returns_string(): void {
    const list = getDefaultCipherList();
    Assert.True(list.length > 0);
    Assert.True(list.includes(":"));
  }
}

A<GetDefaultCipherListTests>().method((t) => t.getDefaultCipherList_returns_string).add(FactAttribute);
