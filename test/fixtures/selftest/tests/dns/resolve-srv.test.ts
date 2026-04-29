import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveSrvTests {
  resolveSrv_ValidDomain_CallsCallback(): void {
    let called = false;
    let port = -1;
    dns.resolveSrv("localhost", (err, recs) => {
      called = true;
      if (err === null && recs.length > 0) {
        port = recs[0]!.port;
      }
    });
    Assert.True(called);
    Assert.True(port >= 0);
  }
}

A<ResolveSrvTests>()
  .method((t) => t.resolveSrv_ValidDomain_CallsCallback)
  .add(FactAttribute);
