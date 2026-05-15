import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSecretKey, generateKeyPairSync, randomBytes, SecretKeyObject } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class KeyObjectTests {
  keyObject_secret_key_object_export_works(): void {
    const keyData = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
    const keyObj = createSecretKey(keyData);
    Assert.True(keyObj instanceof SecretKeyObject);
    const exported = (keyObj as SecretKeyObject).export();
    Assert.Equal(keyData, exported);
  }

  keyObject_public_key_object_type(): void {
    const { publicKey } = generateKeyPairSync("rsa");
    Assert.Equal("public", publicKey.type);
    Assert.Equal("rsa", publicKey.asymmetricKeyType);
  }

  keyObject_private_key_object_type(): void {
    const { privateKey } = generateKeyPairSync("rsa");
    Assert.Equal("private", privateKey.type);
    Assert.Equal("rsa", privateKey.asymmetricKeyType);
  }
}

A<KeyObjectTests>().method((t) => t.keyObject_secret_key_object_export_works).add(FactAttribute);
A<KeyObjectTests>().method((t) => t.keyObject_public_key_object_type).add(FactAttribute);
A<KeyObjectTests>().method((t) => t.keyObject_private_key_object_type).add(FactAttribute);
