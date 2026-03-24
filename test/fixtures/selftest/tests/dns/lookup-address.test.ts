import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { LookupAddress } from "@tsonic/nodejs/dns.js";

export class LookupAddressTests {
  public LookupAddress_AllProperties_CanBeSet(): void {
    const address = new LookupAddress();
    address.address = "127.0.0.1";
    address.family = 4;

    Assert.Equal("127.0.0.1", address.address);
    Assert.Equal(4, address.family);
  }
}

A.on(LookupAddressTests)
  .method((t) => t.LookupAddress_AllProperties_CanBeSet)
  .add(FactAttribute);
