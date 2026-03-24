import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class SetDefaultResultOrderTests {
  public setDefaultResultOrder_IPv4First_UpdatesOrder(): void {
    dns.setDefaultResultOrder("ipv4first");
    const order = dns.getDefaultResultOrder();
    Assert.Equal("ipv4first", order);

    // Reset to default
    dns.setDefaultResultOrder("verbatim");
  }

  public setDefaultResultOrder_IPv6First_UpdatesOrder(): void {
    dns.setDefaultResultOrder("ipv6first");
    const order = dns.getDefaultResultOrder();
    Assert.Equal("ipv6first", order);

    // Reset to default
    dns.setDefaultResultOrder("verbatim");
  }

  public setDefaultResultOrder_Verbatim_UpdatesOrder(): void {
    dns.setDefaultResultOrder("verbatim");
    const order = dns.getDefaultResultOrder();
    Assert.Equal("verbatim", order);
  }

  public setDefaultResultOrder_InvalidValue_ThrowsError(): void {
    let threw = false;
    try {
      dns.setDefaultResultOrder("invalid");
    } catch (e) {
      threw = true;
    }
    Assert.True(threw);
  }
}

A.on(SetDefaultResultOrderTests)
  .method((t) => t.setDefaultResultOrder_IPv4First_UpdatesOrder)
  .add(FactAttribute);
A.on(SetDefaultResultOrderTests)
  .method((t) => t.setDefaultResultOrder_IPv6First_UpdatesOrder)
  .add(FactAttribute);
A.on(SetDefaultResultOrderTests)
  .method((t) => t.setDefaultResultOrder_Verbatim_UpdatesOrder)
  .add(FactAttribute);
A.on(SetDefaultResultOrderTests)
  .method((t) => t.setDefaultResultOrder_InvalidValue_ThrowsError)
  .add(FactAttribute);
