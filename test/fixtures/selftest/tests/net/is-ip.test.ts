import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as net from "@tsonic/nodejs/net.js";

export class IsIPTests {
  is_ip_valid_ipv4_returns_4(): void {
    Assert.Equal(4, net.isIP("127.0.0.1"));
    Assert.Equal(4, net.isIP("192.168.1.1"));
    Assert.Equal(4, net.isIP("8.8.8.8"));
  }

  is_ip_valid_ipv6_returns_6(): void {
    Assert.Equal(6, net.isIP("::1"));
    Assert.Equal(6, net.isIP("2001:4860:4860::8888"));
    Assert.Equal(6, net.isIP("fe80::1"));
  }

  is_ip_invalid_returns_0(): void {
    Assert.Equal(0, net.isIP("invalid"));
    Assert.Equal(0, net.isIP("999.999.999.999"));
    Assert.Equal(0, net.isIP(""));
    Assert.Equal(0, net.isIP("localhost"));
  }
}

A<IsIPTests>()
  .method((t) => t.is_ip_valid_ipv4_returns_4)
  .add(FactAttribute);
A<IsIPTests>()
  .method((t) => t.is_ip_valid_ipv6_returns_6)
  .add(FactAttribute);
A<IsIPTests>()
  .method((t) => t.is_ip_invalid_returns_0)
  .add(FactAttribute);
