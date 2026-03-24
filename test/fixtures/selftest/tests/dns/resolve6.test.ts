import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { ResolveOptions } from "@tsonic/nodejs/dns.js";

export class Resolve6Tests {
  public resolve6_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolve6("localhost", (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve6_WithTtlOption_CallsCallback(): void {
    let called = false;
    const opts = new ResolveOptions();
    opts.ttl = true;
    dns.resolve6WithOptions("localhost", opts, (err, res) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(Resolve6Tests)
  .method((t) => t.resolve6_ValidDomain_CallsCallback)
  .add(FactAttribute);
A.on(Resolve6Tests)
  .method((t) => t.resolve6_WithTtlOption_CallsCallback)
  .add(FactAttribute);
