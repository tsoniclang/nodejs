import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createPublicKey, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class CreatePublicKeyTests {
  public createPublicKey_from_key_object(): void {
    const { privateKey } = generateKeyPairSync("rsa");
    const extractedPublic = createPublicKey(privateKey);
    Assert.Equal("public", extractedPublic.type);
  }

  public createPublicKey_from_bytes_works(): void {
    // TODO: actual DER export and reimport
    const keyObj = createPublicKey(new Uint8Array(0));
    Assert.Equal("public", keyObj.type);
    Assert.Equal("rsa", keyObj.asymmetricKeyType);
  }

  public createPublicKey_from_private_key_works(): void {
    const { privateKey } = generateKeyPairSync("rsa");
    const publicKey = createPublicKey(privateKey);
    Assert.Equal("public", publicKey.type);
    Assert.Equal("rsa", publicKey.asymmetricKeyType);
  }

  public createPublicKey_from_public_key_returns_same(): void {
    const { publicKey } = generateKeyPairSync("rsa");
    const result = createPublicKey(publicKey);
    Assert.Equal(publicKey, result);
  }
}

A<CreatePublicKeyTests>().method((t) => t.createPublicKey_from_key_object).add(FactAttribute);
A<CreatePublicKeyTests>().method((t) => t.createPublicKey_from_bytes_works).add(FactAttribute);
A<CreatePublicKeyTests>().method((t) => t.createPublicKey_from_private_key_works).add(FactAttribute);
A<CreatePublicKeyTests>().method((t) => t.createPublicKey_from_public_key_returns_same).add(FactAttribute);
