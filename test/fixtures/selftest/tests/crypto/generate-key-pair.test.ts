import { attributes as A } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { generateKeyPair, PublicKeyObject, PrivateKeyObject } from "@tsonic/nodejs/crypto.js";

export class GenerateKeyPairTests {
  public generateKeyPair_callback_works(): void {
    let pubKey: JsValue = null;
    let privKey: JsValue = null;
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
