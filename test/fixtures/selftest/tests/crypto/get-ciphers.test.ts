import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getCiphers } from "@tsonic/nodejs/crypto.js";

export class GetCiphersTests {
  public getCiphers_returns_non_empty_list(): void {
    const ciphers = getCiphers();
    Assert.True(ciphers.length > 0);
    Assert.True(ciphers.includes("aes-256-cbc"));
  }

  public getCiphers_contains_expected_algorithms(): void {
    const ciphers = getCiphers();
    Assert.True(ciphers.includes("aes-128-cbc"));
    Assert.True(ciphers.includes("aes-192-cbc"));
    Assert.True(ciphers.includes("aes-256-cbc"));
    Assert.True(ciphers.includes("des-cbc"));
  }
}

A.on(GetCiphersTests).method((t) => t.getCiphers_returns_non_empty_list).add(FactAttribute);
A.on(GetCiphersTests).method((t) => t.getCiphers_contains_expected_algorithms).add(FactAttribute);
