import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ResolveSoaTests {
  public resolveSoa_ValidDomain_CallsCallbackWithRecord(): void {
    let called = false;
    let error: Error | null = null;
    let nsname = "";
    dns.resolveSoa("localhost", (err, rec) => {
      called = true;
      error = err;
      nsname = rec.nsname;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.Equal("localhost", nsname);
  }
}

A<ResolveSoaTests>()
  .method((t) => t.resolveSoa_ValidDomain_CallsCallbackWithRecord)
  .add(FactAttribute);
