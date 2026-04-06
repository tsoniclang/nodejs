import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TcpSocketConnectOpts } from "@tsonic/nodejs/net.js";

export class TcpSocketConnectOptsTests {
  public all_properties_can_be_set(): void {
    const opts = new TcpSocketConnectOpts();
    opts.port = 8080;
    opts.host = "localhost";
    opts.localAddress = "127.0.0.1";
    opts.localPort = 9090;
    opts.hints = 1;
    opts.family = 4;
    opts.noDelay = true;
    opts.keepAlive = true;
    opts.keepAliveInitialDelay = 1000;

    Assert.Equal(8080, opts.port);
    Assert.Equal("localhost", opts.host);
    Assert.Equal("127.0.0.1", opts.localAddress);
    Assert.Equal(9090, opts.localPort);
    Assert.Equal(1, opts.hints);
    Assert.Equal(4, opts.family);
    Assert.Equal(true, opts.noDelay);
    Assert.Equal(true, opts.keepAlive);
    Assert.Equal(1000, opts.keepAliveInitialDelay);
  }
}

A<TcpSocketConnectOptsTests>()
  .method((t) => t.all_properties_can_be_set)
  .add(FactAttribute);
