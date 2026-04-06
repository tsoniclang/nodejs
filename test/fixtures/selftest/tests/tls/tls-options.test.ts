import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TlsOptions } from "@tsonic/nodejs/tls.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/tls/TlsOptions.tests.cs
 */
export class TlsOptionsTests {
  public TlsOptions_AllProperties_CanBeSet(): void {
    const opts = new TlsOptions();
    opts.handshakeTimeout = 120000;
    opts.sessionTimeout = 300;
    opts.ca = "ca";
    opts.cert = "cert";
    opts.key = "key";
    opts.passphrase = "pass";

    Assert.Equal(120000, opts.handshakeTimeout);
    Assert.Equal(300, opts.sessionTimeout);
  }
}

A<TlsOptionsTests>()
  .method((t) => t.TlsOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
