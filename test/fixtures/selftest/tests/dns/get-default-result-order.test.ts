import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class GetDefaultResultOrderTests {
  public getDefaultResultOrder_ReturnsVerbatim(): void {
    const order = dns.getDefaultResultOrder();
    Assert.Equal("verbatim", order);
  }
}

A<GetDefaultResultOrderTests>()
  .method((t) => t.getDefaultResultOrder_ReturnsVerbatim)
  .add(FactAttribute);
