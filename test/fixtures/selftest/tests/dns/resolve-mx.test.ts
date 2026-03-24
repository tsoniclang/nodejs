import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveMxTests {
  public resolveMx_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveMx("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveMxTests)
  .method((t) => t.resolveMx_ValidDomain_CallsCallback)
  .add(FactAttribute);
