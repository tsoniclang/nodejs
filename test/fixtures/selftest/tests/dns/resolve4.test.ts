import { attributes as A } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";
import { ResolveOptions } from "@tsonic/nodejs/dns.js";

export class Resolve4Tests {
  public resolve4_ValidDomain_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let first = "";
    dns.resolve4("localhost", (err, addrs) => {
      called = true;
      error = err;
      first = addrs[0] ?? "";
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.True(first.includes("."));
  }

  public resolve4_WithTtlOption_CallsCallback(): void {
    let called = false;
    let count = 0;
    const opts = new ResolveOptions();
    opts.ttl = true;
    dns.resolve4WithOptions("localhost", opts, (err, res) => {
      called = true;
      count = (res as Array<JsValue>).length;
    });
    Assert.True(called);
    Assert.True(count > 0);
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

A<Resolve4Tests>()
  .method((t) => t.resolve4_ValidDomain_CallsCallback)
  .add(FactAttribute);
A<Resolve4Tests>()
  .method((t) => t.resolve4_WithTtlOption_CallsCallback)
  .add(FactAttribute);
A<Resolve4Tests>()
  .method((t) => t.resolve4_WithoutTtlOption_CallsCallback)
  .add(FactAttribute);
