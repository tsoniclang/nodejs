import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class IsIPv4Tests {
  public is_ipv4_valid_returns_true(): void {
    Assert.True(net.isIPv4("127.0.0.1"));
    Assert.True(net.isIPv4("192.168.1.1"));
  }

  public is_ipv4_ipv6_returns_false(): void {
    Assert.False(net.isIPv4("::1"));
    Assert.False(net.isIPv4("2001:4860:4860::8888"));
  }

  public is_ipv4_invalid_returns_false(): void {
    Assert.False(net.isIPv4("invalid"));
    Assert.False(net.isIPv4(""));
  }
}

A<IsIPv4Tests>()
  .method((t) => t.is_ipv4_valid_returns_true)
  .add(FactAttribute);
A<IsIPv4Tests>()
  .method((t) => t.is_ipv4_ipv6_returns_false)
  .add(FactAttribute);
A<IsIPv4Tests>()
  .method((t) => t.is_ipv4_invalid_returns_false)
  .add(FactAttribute);
