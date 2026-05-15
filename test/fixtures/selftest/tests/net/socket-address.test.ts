import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SocketAddress, SocketAddressInitOptions } from "@tsonic/nodejs/net.js";

export class SocketAddressTests {
  constructor_creates_instance(): void {
    const options = new SocketAddressInitOptions();
    options.address = "127.0.0.1";
    options.family = "ipv4";
    options.port = 8080;

    const socketAddress = new SocketAddress(options);
    Assert.NotNull(socketAddress);
    Assert.Equal("127.0.0.1", socketAddress.address);
    Assert.Equal("ipv4", socketAddress.family);
    Assert.Equal(8080, socketAddress.port);
  }

  constructor_default_values(): void {
    const options = new SocketAddressInitOptions();
    const socketAddress = new SocketAddress(options);

    Assert.Equal("0.0.0.0", socketAddress.address);
    Assert.Equal("ipv4", socketAddress.family);
    Assert.Equal(0, socketAddress.port);
  }

  flowlabel_can_be_set(): void {
    const options = new SocketAddressInitOptions();
    options.address = "::1";
    options.family = "ipv6";
    options.port = 8080;
    options.flowlabel = 12345;

    const socketAddress = new SocketAddress(options);
    Assert.Equal(12345, socketAddress.flowlabel);
  }
}

A<SocketAddressTests>()
  .method((t) => t.constructor_creates_instance)
  .add(FactAttribute);
A<SocketAddressTests>()
  .method((t) => t.constructor_default_values)
  .add(FactAttribute);
A<SocketAddressTests>()
  .method((t) => t.flowlabel_can_be_set)
  .add(FactAttribute);
