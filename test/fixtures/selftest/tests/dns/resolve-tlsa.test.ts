import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTlsaTests {
  public resolveTlsa_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveTlsa("localhost", (err, recs) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ResolveTlsaTests)
  .method((t) => t.resolveTlsa_ValidDomain_CallsCallback)
  .add(FactAttribute);
