import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSecretKey, randomBytes } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class CreateSecretKeyTests {
  createSecretKey_creates_key_object(): void {
    const key = createSecretKey(randomBytes(32 as int));
    Assert.Equal("secret", key.type);
    Assert.Equal(32, key.symmetricKeySize);
    Assert.Equal(null, key.asymmetricKeyType);
  }

  createSecretKey_with_string(): void {
    const key = createSecretKey("my-secret-key", "utf8");
    Assert.Equal("secret", key.type);
    Assert.Equal(null, key.asymmetricKeyType);
  }

  createSecretKey_export_works(): void {
    const originalKey = randomBytes(32 as int);
    const keyObj = createSecretKey(originalKey);
    const exported = keyObj.export();
    Assert.Equal(originalKey, exported);
  }

  createSecretKey_with_hex_encoding_works(): void {
    const hexKey = "0123456789abcdef";
    const keyObj = createSecretKey(hexKey, "hex");
    Assert.Equal("secret", keyObj.type);
    Assert.Equal(8, keyObj.symmetricKeySize);
  }

  createSecretKey_with_base64_encoding_works(): void {
    // Base64 of [1,2,3,4,5,6,7,8]
    const base64Key = "AQIDBAUGBwg=";
    const keyObj = createSecretKey(base64Key, "base64");
    Assert.Equal("secret", keyObj.type);
    Assert.Equal(8, keyObj.symmetricKeySize);
  }

  createSecretKey_with_base64url_encoding_works(): void {
    const base64url = "AQIDBAUG";
    const keyObj = createSecretKey(base64url, "base64url");
    Assert.Equal("secret", keyObj.type);
    Assert.Equal(6, keyObj.symmetricKeySize);
  }
}

A<CreateSecretKeyTests>().method((t) => t.createSecretKey_creates_key_object).add(FactAttribute);
A<CreateSecretKeyTests>().method((t) => t.createSecretKey_with_string).add(FactAttribute);
A<CreateSecretKeyTests>().method((t) => t.createSecretKey_export_works).add(FactAttribute);
A<CreateSecretKeyTests>().method((t) => t.createSecretKey_with_hex_encoding_works).add(FactAttribute);
A<CreateSecretKeyTests>().method((t) => t.createSecretKey_with_base64_encoding_works).add(FactAttribute);
A<CreateSecretKeyTests>().method((t) => t.createSecretKey_with_base64url_encoding_works).add(FactAttribute);
