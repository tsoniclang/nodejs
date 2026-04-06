import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveAnyTests {
  public resolveAny_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveAny("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<ResolveAnyTests>()
  .method((t) => t.resolveAny_ValidDomain_CallsCallback)
  .add(FactAttribute);
