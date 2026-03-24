import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ReverseTests {
  public reverse_ValidIPv4_CallsCallback(): void {
    let called = false;
    dns.reverse("127.0.0.1", (err, hosts) => {
      called = true;
    });
    Assert.True(called);
  }

  public reverse_ValidIPv6_CallsCallback(): void {
    let called = false;
    dns.reverse("::1", (err, hosts) => {
      called = true;
    });
    Assert.True(called);
  }

  public reverse_InvalidIP_CallsCallback(): void {
    let called = false;
    dns.reverse("invalid-ip", (err, hosts) => {
      called = true;
    });
    Assert.True(called);
  }
}

A.on(ReverseTests)
  .method((t) => t.reverse_ValidIPv4_CallsCallback)
  .add(FactAttribute);
A.on(ReverseTests)
  .method((t) => t.reverse_ValidIPv6_CallsCallback)
  .add(FactAttribute);
A.on(ReverseTests)
  .method((t) => t.reverse_InvalidIP_CallsCallback)
  .add(FactAttribute);
