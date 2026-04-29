import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Certificate, X509CertificateInfo } from "@tsonic/nodejs/crypto.js";

export class CertificateTests {
  exportChallenge_string_extracts_tagged_value(): void {
    const challenge = Certificate.exportChallenge("challenge=hello");
    Assert.Equal(5, challenge.length);
    Assert.Equal(104, challenge[0]);
    Assert.Equal(101, challenge[1]);
    Assert.Equal(108, challenge[2]);
    Assert.Equal(108, challenge[3]);
    Assert.Equal(111, challenge[4]);
  }

  exportChallenge_bytes_without_tag_returns_empty_bytes(): void {
    const challenge = Certificate.exportChallenge(new Uint8Array([0x30, 0x01, 0x00]));
    Assert.Equal(0, challenge.length);
  }

  exportPublicKey_string_extracts_tagged_value(): void {
    const publicKey = Certificate.exportPublicKey("publicKey=aGVsbG8=");
    Assert.Equal(5, publicKey.length);
    Assert.Equal(104, publicKey[0]);
    Assert.Equal(101, publicKey[1]);
    Assert.Equal(108, publicKey[2]);
    Assert.Equal(108, publicKey[3]);
    Assert.Equal(111, publicKey[4]);
  }

  exportPublicKey_der_payload_round_trips_bytes(): void {
    const source = new Uint8Array([0x30, 0x01, 0x00]);
    const publicKey = Certificate.exportPublicKey(source);
    Assert.Equal(source.length, publicKey.length);
    Assert.Equal(source[0], publicKey[0]);
  }

  verifySpkac_string_without_structure_returns_false(): void {
    Assert.False(Certificate.verifySpkac("test"));
  }

  verifySpkac_bytes_with_der_sequence_returns_true(): void {
    Assert.True(Certificate.verifySpkac(new Uint8Array([0x30, 0x01, 0x00])));
  }

  x509_certificate_info_matches_subject_fields_and_pem_output(): void {
    const cert = new X509CertificateInfo(
      "CN=example.com, emailAddress=ops@example.com, IP Address=127.0.0.1",
      "CN=Example CA",
      "1234",
      "2024-01-01",
      "2026-01-01",
      "fp1",
      "fp256",
      "fp512",
      new Uint8Array([1, 2, 3]),
      new Uint8Array([0x30, 0x82, 0x01, 0x0a]),
    );

    Assert.Equal("example.com", cert.checkHost("example.com") as string);
    Assert.Equal("ops@example.com", cert.checkEmail("ops@example.com") as string);
    Assert.Equal("127.0.0.1", cert.checkIP("127.0.0.1") as string);
    Assert.Contains("BEGIN CERTIFICATE", cert.toPEM());
  }

  x509_certificate_info_verifies_issuer_relationship(): void {
    const issuer = new X509CertificateInfo(
      "CN=Example CA",
      "CN=Example Root",
      "ca",
      "2024-01-01",
      "2026-01-01",
      "ca1",
      "ca256",
      "ca512",
      new Uint8Array([1]),
      new Uint8Array([1]),
    );
    const leaf = new X509CertificateInfo(
      "CN=example.com",
      "CN=Example CA",
      "leaf",
      "2024-01-01",
      "2026-01-01",
      "leaf1",
      "leaf256",
      "leaf512",
      new Uint8Array([2]),
      new Uint8Array([2]),
    );

    Assert.Null(issuer.checkIssued(leaf));
    Assert.True(leaf.verify(issuer));
  }
}

A<CertificateTests>().method((t) => t.exportChallenge_string_extracts_tagged_value).add(FactAttribute);
A<CertificateTests>().method((t) => t.exportChallenge_bytes_without_tag_returns_empty_bytes).add(FactAttribute);
A<CertificateTests>().method((t) => t.exportPublicKey_string_extracts_tagged_value).add(FactAttribute);
A<CertificateTests>().method((t) => t.exportPublicKey_der_payload_round_trips_bytes).add(FactAttribute);
A<CertificateTests>().method((t) => t.verifySpkac_string_without_structure_returns_false).add(FactAttribute);
A<CertificateTests>().method((t) => t.verifySpkac_bytes_with_der_sequence_returns_true).add(FactAttribute);
A<CertificateTests>().method((t) => t.x509_certificate_info_matches_subject_fields_and_pem_output).add(FactAttribute);
A<CertificateTests>().method((t) => t.x509_certificate_info_verifies_issuer_relationship).add(FactAttribute);
