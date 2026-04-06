import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSign, createVerify, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class CreateVerifyTests {
  public createVerify_rsa_sha256(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const data = new Uint8Array([73, 109, 112, 111, 114, 116, 97, 110, 116]);
    const s = createSign("sha256");
    s.update(data);
    const signature = s.sign(privateKey);
    const v = createVerify("sha256");
    v.update(data);
    const isValid = v.verify(publicKey, signature as Uint8Array);
    Assert.True(isValid);
  }

  public createVerify_rsa_invalid_signature(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const data = new Uint8Array([73, 109, 112, 111, 114, 116, 97, 110, 116]);
    const s = createSign("sha256");
    s.update(data);
    const signature = s.sign(privateKey) as Uint8Array;
    const corrupted = new Uint8Array(signature.length);
    corrupted.set(signature);
    corrupted[0] = corrupted[0] ^ 0xFF;
    const v = createVerify("sha256");
    v.update(data);
    const isValid = v.verify(publicKey, corrupted);
    Assert.False(isValid);
  }

  public createVerify_dsa_fails_with_wrong_data(): void {
    const { publicKey, privateKey } = generateKeyPairSync("dsa");
    const s = createSign("sha256");
    s.update("test data");
    const signature = s.sign(privateKey);
    const v = createVerify("sha256");
    v.update("wrong data");
    const isValid = v.verify(publicKey, signature as Uint8Array);
    Assert.False(isValid);
  }
}

A<CreateVerifyTests>().method((t) => t.createVerify_rsa_sha256).add(FactAttribute);
A<CreateVerifyTests>().method((t) => t.createVerify_rsa_invalid_signature).add(FactAttribute);
A<CreateVerifyTests>().method((t) => t.createVerify_dsa_fails_with_wrong_data).add(FactAttribute);
