import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveNsTests {
  public resolveNs_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveNs("localhost", (err, ns) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<ResolveNsTests>()
  .method((t) => t.resolveNs_ValidDomain_CallsCallback)
  .add(FactAttribute);
