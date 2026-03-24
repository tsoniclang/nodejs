import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveCaaTests {
  public resolveCaa_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveCaa("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveCaaTests)
  .method((t) => t.resolveCaa_ValidDomain_CallsCallback)
  .add(FactAttribute);
