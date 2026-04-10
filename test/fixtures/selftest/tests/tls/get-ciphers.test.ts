import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getCiphers } from "@tsonic/nodejs/tls.js";

export class getCiphersTests {
  public getCiphers_ReturnsArray(): void {
    const ciphers = getCiphers();
    Assert.NotNull(ciphers);
    Assert.True(ciphers.length > 0);
  }
}

A<getCiphersTests>()
  .method((t) => t.getCiphers_ReturnsArray)
  .add(FactAttribute);
