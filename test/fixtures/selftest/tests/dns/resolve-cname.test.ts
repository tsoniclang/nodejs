import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveCnameTests {
  public resolveCname_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolveCname("localhost", (err, names) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<ResolveCnameTests>()
  .method((t) => t.resolveCname_ValidDomain_CallsCallback)
  .add(FactAttribute);
