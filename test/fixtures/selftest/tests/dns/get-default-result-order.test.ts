import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class GetDefaultResultOrderTests {
  getDefaultResultOrder_ReturnsSupportedOrder(): void {
    const order = dns.getDefaultResultOrder();
    Assert.True(
      order === "verbatim" ||
        order === "ipv4first" ||
        order === "ipv6first"
    );
  }
}

A<GetDefaultResultOrderTests>()
  .method((t) => t.getDefaultResultOrder_ReturnsSupportedOrder)
  .add(FactAttribute);
