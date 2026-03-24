import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Certificate } from "@tsonic/nodejs/crypto.js";

export class CertificateTests {
  public exportChallenge_string_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.exportChallenge("test");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public exportChallenge_bytes_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.exportChallenge(new Uint8Array(64));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public exportPublicKey_string_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.exportPublicKey("test");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public exportPublicKey_bytes_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.exportPublicKey(new Uint8Array(64));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public verifySpkac_string_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.verifySpkac("test");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public verifySpkac_bytes_throws_not_implemented(): void {
    let threw = false;
    try {
      Certificate.verifySpkac(new Uint8Array(64));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}

A.on(CertificateTests).method((t) => t.exportChallenge_string_throws_not_implemented).add(FactAttribute);
A.on(CertificateTests).method((t) => t.exportChallenge_bytes_throws_not_implemented).add(FactAttribute);
A.on(CertificateTests).method((t) => t.exportPublicKey_string_throws_not_implemented).add(FactAttribute);
A.on(CertificateTests).method((t) => t.exportPublicKey_bytes_throws_not_implemented).add(FactAttribute);
A.on(CertificateTests).method((t) => t.verifySpkac_string_throws_not_implemented).add(FactAttribute);
A.on(CertificateTests).method((t) => t.verifySpkac_bytes_throws_not_implemented).add(FactAttribute);
