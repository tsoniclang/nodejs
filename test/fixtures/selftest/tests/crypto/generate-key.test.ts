import { attributes as A } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { generateKey, generateKeyAsync } from "@tsonic/nodejs/crypto.js";

export class GenerateKeyTests {
  public generateKey_aes256_generates_key(): void {
    const key = generateKey("aes-256-cbc", { length: 256 });
    Assert.NotNull(key);
    Assert.Equal("secret", key.type);
    Assert.Equal(32, key.symmetricKeySize);
  }

  public generateKey_aes128_generates_key(): void {
    const key = generateKey("aes-128-cbc", { length: 128 });
    Assert.NotNull(key);
    Assert.Equal("secret", key.type);
    Assert.Equal(16, key.symmetricKeySize);
  }

  public generateKey_callback_works(): void {
    let caughtError: Error | null = null;
    let resultKey: JsValue = null;
    generateKeyAsync("aes", { length: 256 }, (err, key) => {
      caughtError = err;
      resultKey = key;
    });
    Assert.Equal(null, caughtError);
    Assert.NotNull(resultKey);
  }
}

A<GenerateKeyTests>().method((t) => t.generateKey_aes256_generates_key).add(FactAttribute);
A<GenerateKeyTests>().method((t) => t.generateKey_aes128_generates_key).add(FactAttribute);
A<GenerateKeyTests>().method((t) => t.generateKey_callback_works).add(FactAttribute);
