import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveNsTests {
  public resolveNs_ValidDomain_CallsCallback(): void {
    let called = false;
    let nameservers: Array<string> = [];
    dns.resolveNs("localhost", (err, ns) => {
      called = true;
      if (err === null) {
        nameservers = ns;
      }
    });
    Assert.True(called);
    Assert.True(nameservers.length > 0);
  }
}

A<ResolveNsTests>()
  .method((t) => t.resolveNs_ValidDomain_CallsCallback)
  .add(FactAttribute);
