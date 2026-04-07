import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class SetDefaultAutoSelectFamilyTests {
  public set_default_auto_select_family_updates_value(): void {
    const original = net.getDefaultAutoSelectFamily();
    net.setDefaultAutoSelectFamily(!original);
    Assert.Equal(!original, net.getDefaultAutoSelectFamily());
    // Reset to original
    net.setDefaultAutoSelectFamily(original);
  }
}

A<SetDefaultAutoSelectFamilyTests>()
  .method((t) => t.set_default_auto_select_family_updates_value)
  .add(FactAttribute);
