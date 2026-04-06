import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class GetDefaultAutoSelectFamilyTests {
  public get_default_auto_select_family_returns_boolean(): void {
    const value = net.getDefaultAutoSelectFamily();
    Assert.Equal(false, value);
  }
}

A<GetDefaultAutoSelectFamilyTests>()
  .method((t) => t.get_default_auto_select_family_returns_boolean)
  .add(FactAttribute);
