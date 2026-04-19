import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TLSSocketOptions } from "@tsonic/nodejs/tls.js";

export class TLSSocketOptionsTests {
  public TLSSocketOptions_AllProperties_CanBeSet(): void {
    const opts = new TLSSocketOptions();
    opts.isServer = true;
    opts.servername = "example.com";
    opts.ca = "ca";
    opts.cert = "cert";
    opts.key = "key";
    opts.passphrase = "pass";

    Assert.True(opts.isServer);
    Assert.Equal("example.com", opts.servername);
  }
}

A<TLSSocketOptionsTests>()
  .method((t) => t.TLSSocketOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
