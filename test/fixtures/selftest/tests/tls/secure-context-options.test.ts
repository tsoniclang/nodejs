import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SecureContextOptions } from "@tsonic/nodejs/tls.js";

export class SecureContextOptionsTests {
  public SecureContextOptions_AllProperties_CanBeSet(): void {
    const opts = new SecureContextOptions();
    opts.ca = "ca-cert";
    opts.cert = "cert";
    opts.key = "key";
    opts.passphrase = "pass";
    opts.ciphers = "HIGH";
    opts.maxVersion = "TLSv1.3";
    opts.minVersion = "TLSv1.2";

    Assert.Equal("ca-cert", opts.ca);
    Assert.Equal("pass", opts.passphrase);
  }
}

A<SecureContextOptionsTests>()
  .method((t) => t.SecureContextOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
