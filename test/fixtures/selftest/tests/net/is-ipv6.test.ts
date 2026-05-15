import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class IsIPv6Tests {
  is_ipv6_valid_returns_true(): void {
    Assert.True(net.isIPv6("::1"));
    Assert.True(net.isIPv6("2001:4860:4860::8888"));
  }

  is_ipv6_ipv4_returns_false(): void {
    Assert.False(net.isIPv6("127.0.0.1"));
    Assert.False(net.isIPv6("192.168.1.1"));
  }

  is_ipv6_invalid_returns_false(): void {
    Assert.False(net.isIPv6("invalid"));
    Assert.False(net.isIPv6(""));
  }
}

A<IsIPv6Tests>()
  .method((t) => t.is_ipv6_valid_returns_true)
  .add(FactAttribute);
A<IsIPv6Tests>()
  .method((t) => t.is_ipv6_ipv4_returns_false)
  .add(FactAttribute);
A<IsIPv6Tests>()
  .method((t) => t.is_ipv6_invalid_returns_false)
  .add(FactAttribute);
