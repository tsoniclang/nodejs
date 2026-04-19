import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ReverseTests {
  public reverse_ValidIPv4_CallsCallback(): void {
    let called = false;
    let error: Error | null = null;
    let count = 0;
    dns.reverse("127.0.0.1", (err, hosts) => {
      called = true;
      error = err;
      count = hosts.length;
    });
    Assert.True(called);
    Assert.Null(error);
    Assert.True(count > 0);
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
    let error: Error | null = null;
    dns.reverse("invalid-ip", (err, hosts) => {
      called = true;
      error = err;
    });
    Assert.True(called);
    Assert.NotNull(error);
  }
}

A<ReverseTests>()
  .method((t) => t.reverse_ValidIPv4_CallsCallback)
  .add(FactAttribute);
A<ReverseTests>()
  .method((t) => t.reverse_ValidIPv6_CallsCallback)
  .add(FactAttribute);
A<ReverseTests>()
  .method((t) => t.reverse_InvalidIP_CallsCallback)
  .add(FactAttribute);
