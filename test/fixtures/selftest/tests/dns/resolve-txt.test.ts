import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTxtTests {
  public resolveTxt_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveTxt("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveTxtTests)
  .method((t) => t.resolveTxt_ValidDomain_CallsCallback)
  .add(FactAttribute);
