import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getCACertificates } from "@tsonic/nodejs/tls.js";

export class getCACertificatesTests {
  public getCACertificates_ReturnsArray(): void {
    const certs = getCACertificates();
    Assert.NotNull(certs);
    // May be empty depending on substrate
  }
}

A<getCACertificatesTests>()
  .method((t) => t.getCACertificates_ReturnsArray)
  .add(FactAttribute);
