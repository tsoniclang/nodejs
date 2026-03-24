import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  checkServerIdentity,
  PeerCertificate,
  TLSCertificateInfo,
} from "@tsonic/nodejs/tls.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/tls/checkServerIdentity.tests.cs
 */
export class checkServerIdentityTests {
  public checkServerIdentity_MatchingHostname_ReturnsNull(): void {
    const subject = new TLSCertificateInfo();
    subject.CN = "example.com";

    const cert = new PeerCertificate();
    cert.subject = subject;

    const error = checkServerIdentity("example.com", cert);
    Assert.Null(error);
  }

  public checkServerIdentity_MismatchedHostname_ReturnsError(): void {
    const subject = new TLSCertificateInfo();
    subject.CN = "example.com";

    const cert = new PeerCertificate();
    cert.subject = subject;

    const error = checkServerIdentity("other.com", cert);
    Assert.NotNull(error);
  }
}

A.on(checkServerIdentityTests)
  .method((t) => t.checkServerIdentity_MatchingHostname_ReturnsNull)
  .add(FactAttribute);
A.on(checkServerIdentityTests)
  .method((t) => t.checkServerIdentity_MismatchedHostname_ReturnsError)
  .add(FactAttribute);
