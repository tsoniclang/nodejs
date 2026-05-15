import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class DnsPromisesTests {
  promises_lookup_ReturnsPromise(): void {
    const result = dns.promises.lookup("localhost");
    Assert.NotNull(result);
  }

  promises_resolve_ReturnsPromise(): void {
    const result = dns.promises.resolve("localhost");
    Assert.NotNull(result);
  }

  async promises_resolveSoa_ReturnsRecord(): Promise<void> {
    const result = await dns.promises.resolveSoa("localhost");
    Assert.Equal("localhost", result.nsname);
  }
}

A<DnsPromisesTests>()
  .method((t) => t.promises_lookup_ReturnsPromise)
  .add(FactAttribute);
A<DnsPromisesTests>()
  .method((t) => t.promises_resolve_ReturnsPromise)
  .add(FactAttribute);
A<DnsPromisesTests>()
  .method((t) => t.promises_resolveSoa_ReturnsRecord)
  .add(FactAttribute);
