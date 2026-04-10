import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { PeerCertificate } from "@tsonic/nodejs/tls.js";

export class PeerCertificateTests {
  public PeerCertificate_AllProperties_CanBeSet(): void {
    const cert = new PeerCertificate();
    cert.ca = true;
    cert.raw = new Uint8Array([1, 2, 3]);
    cert.serialNumber = "ABC123";
    cert.fingerprint = "SHA1";
    cert.fingerprint256 = "SHA256";
    cert.fingerprint512 = "SHA512";
    cert.valid_from = "Jan 1 2024";
    cert.valid_to = "Dec 31 2025";

    Assert.True(cert.ca);
    Assert.NotNull(cert.raw);
    Assert.Equal("ABC123", cert.serialNumber);
  }
}

A<PeerCertificateTests>()
  .method((t) => t.PeerCertificate_AllProperties_CanBeSet)
  .add(FactAttribute);
