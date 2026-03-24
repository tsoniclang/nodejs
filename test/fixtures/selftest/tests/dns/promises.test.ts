import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class DnsPromisesTests {
  public promises_lookup_ReturnsPromise(): void {
    const result = dns.promises.lookup("localhost");
    Assert.NotNull(result);
  }

  public promises_resolve_ReturnsPromise(): void {
    const result = dns.promises.resolve("localhost");
    Assert.NotNull(result);
  }
}

A.on(DnsPromisesTests)
  .method((t) => t.promises_lookup_ReturnsPromise)
  .add(FactAttribute);
A.on(DnsPromisesTests)
  .method((t) => t.promises_resolve_ReturnsPromise)
  .add(FactAttribute);
