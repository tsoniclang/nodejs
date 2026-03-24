import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ResolveOptions } from "@tsonic/nodejs/dns.js";

export class ResolveOptionsTests {
  public ResolveOptions_TtlProperty_CanBeSet(): void {
    const options = new ResolveOptions();
    options.ttl = true;
    Assert.True(options.ttl);
  }
}

A.on(ResolveOptionsTests)
  .method((t) => t.ResolveOptions_TtlProperty_CanBeSet)
  .add(FactAttribute);
