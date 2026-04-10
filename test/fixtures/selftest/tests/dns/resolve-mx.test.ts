import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveMxTests {
  public resolveMx_ValidDomain_CallsCallback(): void {
    let called = false;
    let exchange = "";
    dns.resolveMx("localhost", (err, recs) => {
      called = true;
      if (err === null && recs.length > 0) {
        exchange = recs[0]!.exchange;
      }
    });
    Assert.True(called);
    Assert.True(exchange.length > 0);
  }
}

A<ResolveMxTests>()
  .method((t) => t.resolveMx_ValidDomain_CallsCallback)
  .add(FactAttribute);
