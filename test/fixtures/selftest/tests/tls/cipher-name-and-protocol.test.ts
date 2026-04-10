import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { CipherNameAndProtocol } from "@tsonic/nodejs/tls.js";

export class CipherNameAndProtocolTests {
  public CipherNameAndProtocol_AllProperties_CanBeSet(): void {
    const cipher = new CipherNameAndProtocol();
    cipher.name = "AES256-GCM-SHA384";
    cipher.version = "TLSv1.3";
    cipher.standardName = "TLS_AES_256_GCM_SHA384";

    Assert.Equal("AES256-GCM-SHA384", cipher.name);
    Assert.Equal("TLSv1.3", cipher.version);
  }
}

A<CipherNameAndProtocolTests>()
  .method((t) => t.CipherNameAndProtocol_AllProperties_CanBeSet)
  .add(FactAttribute);
