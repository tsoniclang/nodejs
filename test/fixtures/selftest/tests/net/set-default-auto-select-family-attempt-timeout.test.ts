import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class SetDefaultAutoSelectFamilyAttemptTimeoutTests {
  public set_default_auto_select_family_attempt_timeout_updates_value(): void {
    const original = net.getDefaultAutoSelectFamilyAttemptTimeout();
    net.setDefaultAutoSelectFamilyAttemptTimeout(500);
    Assert.Equal(500, net.getDefaultAutoSelectFamilyAttemptTimeout());
    // Reset to original
    net.setDefaultAutoSelectFamilyAttemptTimeout(original);
  }
}

A<SetDefaultAutoSelectFamilyAttemptTimeoutTests>()
  .method(
    (t) =>
      t.set_default_auto_select_family_attempt_timeout_updates_value
  )
  .add(FactAttribute);
