import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TLSCertificateInfo } from "@tsonic/nodejs/tls.js";

export class TLSCertificateInfoTests {
  public TLSCertificateInfo_AllProperties_CanBeSet(): void {
    const cert = new TLSCertificateInfo();
    cert.C = "US";
    cert.ST = "CA";
    cert.L = "San Francisco";
    cert.O = "Test Corp";
    cert.OU = "Test Unit";
    cert.CN = "test.example.com";

    Assert.Equal("US", cert.C);
    Assert.Equal("CA", cert.ST);
    Assert.Equal("San Francisco", cert.L);
    Assert.Equal("Test Corp", cert.O);
    Assert.Equal("Test Unit", cert.OU);
    Assert.Equal("test.example.com", cert.CN);
  }
}

A<TLSCertificateInfoTests>()
  .method((t) => t.TLSCertificateInfo_AllProperties_CanBeSet)
  .add(FactAttribute);
