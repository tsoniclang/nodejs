import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveTlsaTests {
  public resolveTlsa_ValidDomain_CallsCallback(): void {
    let called = false;
    let byteCount = 0;
    dns.resolveTlsa("localhost", (err, recs) => {
      called = true;
      if (err === null && recs.length > 0) {
        byteCount = recs[0]!.data.length;
      }
    });
    Assert.True(called);
    Assert.True(byteCount > 0);
  }
}

A<ResolveTlsaTests>()
  .method((t) => t.resolveTlsa_ValidDomain_CallsCallback)
  .add(FactAttribute);
