import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveNaptrTests {
  public resolveNaptr_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveNaptr("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<ResolveNaptrTests>()
  .method((t) => t.resolveNaptr_ValidDomain_CallsCallback)
  .add(FactAttribute);
