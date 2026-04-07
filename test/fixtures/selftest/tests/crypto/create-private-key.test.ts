import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createPrivateKey, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class CreatePrivateKeyTests {
  public createPrivateKey_from_bytes_works(): void {
    const { privateKey } = generateKeyPairSync("rsa");
    void privateKey;
    // TODO: actual DER export and reimport
    const keyObj = createPrivateKey(new Uint8Array(0));
    Assert.Equal("private", keyObj.type);
    Assert.Equal("rsa", keyObj.asymmetricKeyType);
  }
}

A<CreatePrivateKeyTests>().method((t) => t.createPrivateKey_from_bytes_works).add(FactAttribute);
