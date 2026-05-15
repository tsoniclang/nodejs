import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AddressInfo } from "@tsonic/nodejs/net.js";

export class AddressInfoTests {
  all_properties_can_be_set(): void {
    const addressInfo = new AddressInfo();
    addressInfo.address = "192.168.1.1";
    addressInfo.family = "IPv4";
    addressInfo.port = 8080;

    Assert.Equal("192.168.1.1", addressInfo.address);
    Assert.Equal("IPv4", addressInfo.family);
    Assert.Equal(8080, addressInfo.port);
  }
}

A<AddressInfoTests>()
  .method((t) => t.all_properties_can_be_set)
  .add(FactAttribute);
