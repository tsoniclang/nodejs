import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SecureContext } from "@tsonic/nodejs/tls.js";

export class SecureContextTests {
  SecureContext_Constructor_CreatesInstance(): void {
    const context = new SecureContext();
    Assert.NotNull(context);
  }

  SecureContext_LoadCertificate_StoresCertificate(): void {
    const context = new SecureContext();
    context.loadCertificate("test-pem-data", null, null);
    Assert.True(context.hasCertificate);
  }

  SecureContext_SetProtocols_ConfiguresProtocols(): void {
    const context = new SecureContext();
    context.setProtocols("TLSv1.2", "TLSv1.3");
    Assert.Equal("TLSv1.2", context.minVersion);
    Assert.Equal("TLSv1.3", context.maxVersion);
  }
}

A<SecureContextTests>()
  .method((t) => t.SecureContext_Constructor_CreatesInstance)
  .add(FactAttribute);
A<SecureContextTests>()
  .method((t) => t.SecureContext_LoadCertificate_StoresCertificate)
  .add(FactAttribute);
A<SecureContextTests>()
  .method((t) => t.SecureContext_SetProtocols_ConfiguresProtocols)
  .add(FactAttribute);
