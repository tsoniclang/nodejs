import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ResolverOptions } from "@tsonic/nodejs/dns.js";

export class ResolverOptionsTests {
  public ResolverOptions_AllProperties_CanBeSet(): void {
    const options = new ResolverOptions();
    options.timeout = 5000;
    options.tries = 3;
    options.maxTimeout = 10000;

    Assert.Equal(5000, options.timeout);
    Assert.Equal(3, options.tries);
    Assert.Equal(10000, options.maxTimeout);
  }
}

A<ResolverOptionsTests>()
  .method((t) => t.ResolverOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
