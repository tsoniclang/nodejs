import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolvePtrTests {
  public resolvePtr_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolvePtr("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolvePtrTests)
  .method((t) => t.resolvePtr_ValidDomain_CallsCallback)
  .add(FactAttribute);
