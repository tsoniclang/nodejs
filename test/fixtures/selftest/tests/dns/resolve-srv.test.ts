import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveSrvTests {
  public resolveSrv_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveSrv("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveSrvTests)
  .method((t) => t.resolveSrv_ValidDomain_CallsCallback)
  .add(FactAttribute);
