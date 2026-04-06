import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class GetDefaultAutoSelectFamilyAttemptTimeoutTests {
  public get_default_auto_select_family_attempt_timeout_returns_int(): void {
    const value = net.getDefaultAutoSelectFamilyAttemptTimeout();
    Assert.True(value >= 0);
  }
}

A<GetDefaultAutoSelectFamilyAttemptTimeoutTests>()
  .method(
    (t) =>
      t.get_default_auto_select_family_attempt_timeout_returns_int
  )
  .add(FactAttribute);
