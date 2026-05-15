import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTxtTests {
  resolveTxt_ValidDomain_CallsCallback(): void {
    let called = false;
    let recordCount = 0;
    dns.resolveTxt("localhost", (err, recs) => {
      called = true;
      if (err === null) {
        recordCount = recs.length;
      }
    });
    Assert.True(called);
    Assert.True(recordCount > 0);
  }
}

A<ResolveTxtTests>()
  .method((t) => t.resolveTxt_ValidDomain_CallsCallback)
  .add(FactAttribute);
