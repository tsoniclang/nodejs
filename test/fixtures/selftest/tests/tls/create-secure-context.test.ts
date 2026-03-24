import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  createSecureContext,
  SecureContextOptions,
} from "@tsonic/nodejs/tls.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/tls/createSecureContext.tests.cs
 */
export class createSecureContextTests {
  public createSecureContext_NoOptions_ReturnsContext(): void {
    const context = createSecureContext();
    Assert.NotNull(context);
  }

  public createSecureContext_WithCert_LoadsCertificate(): void {
    const opts = new SecureContextOptions();
    opts.cert = "test-pem-data";

    const context = createSecureContext(opts);
    Assert.NotNull(context);
    Assert.True(context.hasCertificate);
  }
}

A.on(createSecureContextTests)
  .method((t) => t.createSecureContext_NoOptions_ReturnsContext)
  .add(FactAttribute);
A.on(createSecureContextTests)
  .method((t) => t.createSecureContext_WithCert_LoadsCertificate)
  .add(FactAttribute);
