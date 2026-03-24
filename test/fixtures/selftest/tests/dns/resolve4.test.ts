import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { ResolveOptions } from "@tsonic/nodejs/dns.js";

export class Resolve4Tests {
  public resolve4_ValidDomain_CallsCallback(): void {
    let called = false;
    dns.resolve4("localhost", (err, addrs) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve4_WithTtlOption_CallsCallback(): void {
    let called = false;
    const opts = new ResolveOptions();
    opts.ttl = true;
    dns.resolve4WithOptions("localhost", opts, (err, res) => {
      called = true;
    });
    Assert.True(called);
  }

  public resolve4_WithoutTtlOption_CallsCallback(): void {
    let called = false;
    const opts = new ResolveOptions();
    opts.ttl = false;
    dns.resolve4WithOptions("localhost", opts, (err, res) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(Resolve4Tests)
  .method((t) => t.resolve4_ValidDomain_CallsCallback)
  .add(FactAttribute);
A.on(Resolve4Tests)
  .method((t) => t.resolve4_WithTtlOption_CallsCallback)
  .add(FactAttribute);
A.on(Resolve4Tests)
  .method((t) => t.resolve4_WithoutTtlOption_CallsCallback)
  .add(FactAttribute);
