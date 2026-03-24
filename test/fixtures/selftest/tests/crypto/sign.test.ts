import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { sign, verify, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class SignStaticTests {
  public sign_static_sign_works(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const data = new Uint8Array([84, 101, 115, 116, 32, 100, 97, 116, 97]);
    const signature = sign("sha256", data, privateKey);
    Assert.True(signature.length > 0);
  }

  public sign_static_verify_works(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const data = new Uint8Array([84, 101, 115, 116, 32, 100, 97, 116, 97]);
    const signature = sign("sha256", data, privateKey);
    const isValid = verify("sha256", data, publicKey, signature);
    Assert.True(isValid);
  }
}

A.on(SignStaticTests).method((t) => t.sign_static_sign_works).add(FactAttribute);
A.on(SignStaticTests).method((t) => t.sign_static_verify_works).add(FactAttribute);
