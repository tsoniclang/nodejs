import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { ResolveOptions } from "@tsonic/nodejs/dns.js";

export class Resolve6Tests {
  resolve6_ValidDomain_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    dns.resolve6("localhost", (err, addrs) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.Null(error);
  }

  resolve6_WithTtlOption_CallsCallback(): void {
    let called = false;
    const opts = new ResolveOptions();
    opts.ttl = true;
    dns.resolve6WithOptions("localhost", opts, (err, res) => {
      called = true;
    });
    Assert.True(called);
  }
}

A<Resolve6Tests>()
  .method((t) => t.resolve6_ValidDomain_CallsCallback)
  .add(FactAttribute);
A<Resolve6Tests>()
  .method((t) => t.resolve6_WithTtlOption_CallsCallback)
  .add(FactAttribute);
