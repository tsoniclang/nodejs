import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ConnectionOptions } from "@tsonic/nodejs/tls.js";

export class ConnectionOptionsTests {
  public ConnectionOptions_AllProperties_CanBeSet(): void {
    const opts = new ConnectionOptions();
    opts.host = "example.com";
    opts.port = 443;
    opts.servername = "example.com";
    opts.timeout = 5000;

    Assert.Equal("example.com", opts.host);
    Assert.Equal(443, opts.port);
    Assert.Equal(5000, opts.timeout);
  }
}

A<ConnectionOptionsTests>()
  .method((t) => t.ConnectionOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
