import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { generateKeyPair, PublicKeyObject, PrivateKeyObject } from "@tsonic/nodejs/crypto.js";

export class GenerateKeyPairTests {
  generateKeyPair_callback_works(): void {
    let pubKey: RuntimeValue = null;
    let privKey: RuntimeValue = null;
    let error: Error | null = null;
    generateKeyPair("rsa", null, (err, pub, priv) => {
      error = err;
      pubKey = pub;
      privKey = priv;
    });
    Assert.Equal(null, error);
    Assert.NotNull(pubKey);
    Assert.NotNull(privKey);
    Assert.True(pubKey instanceof PublicKeyObject);
    Assert.True(privKey instanceof PrivateKeyObject);
  }
}

A<GenerateKeyPairTests>().method((t) => t.generateKeyPair_callback_works).add(FactAttribute);
