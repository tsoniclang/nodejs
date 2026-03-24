import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveSoaTests {
  public resolveSoa_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveSoa("localhost", (err, rec) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveSoaTests)
  .method((t) => t.resolveSoa_ValidDomain_CallsCallback)
  .add(FactAttribute);
