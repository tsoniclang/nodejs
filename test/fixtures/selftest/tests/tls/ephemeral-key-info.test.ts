import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EphemeralKeyInfo } from "@tsonic/nodejs/tls.js";

export class EphemeralKeyInfoTests {
  EphemeralKeyInfo_AllProperties_CanBeSet(): void {
    const info = new EphemeralKeyInfo();
    info.type = "ECDH";
    info.name = "prime256v1";
    info.size = 256;

    Assert.Equal("ECDH", info.type);
    Assert.Equal("prime256v1", info.name);
    Assert.Equal(256, info.size);
  }
}

A<EphemeralKeyInfoTests>()
  .method((t) => t.EphemeralKeyInfo_AllProperties_CanBeSet)
  .add(FactAttribute);
