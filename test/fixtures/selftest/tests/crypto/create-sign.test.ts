import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSign, createVerify, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class CreateSignTests {
  createSign_rsa_sha256(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const data = new Uint8Array([73, 109, 112, 111, 114, 116, 97, 110, 116]);
    const s = createSign("sha256");
    s.update(data);
    const signature = s.sign(privateKey);
    Assert.True(signature.length > 0);
  }

  createSign_verify_with_string_data(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const s = createSign("sha256");
    s.update("Important message");
    const signature = s.sign(privateKey);
    const v = createVerify("sha256");
    v.update("Important message");
    const isValid = v.verify(publicKey, signature as Uint8Array);
    Assert.True(isValid);
  }

  createSign_multiple_updates(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const s = createSign("sha256");
    s.update("Part 1");
    s.update(" Part 2");
    s.update(" Part 3");
    const signature = s.sign(privateKey);
    const v = createVerify("sha256");
    v.update("Part 1 Part 2 Part 3");
    const isValid = v.verify(publicKey, signature as Uint8Array);
    Assert.True(isValid);
  }

  createSign_dsa_works(): void {
    const { publicKey, privateKey } = generateKeyPairSync("dsa");
    const s = createSign("sha256");
    s.update("test data");
    const signature = s.sign(privateKey);
    const v = createVerify("sha256");
    v.update("test data");
    const isValid = v.verify(publicKey, signature as Uint8Array);
    Assert.True(isValid);
  }
}

A<CreateSignTests>().method((t) => t.createSign_rsa_sha256).add(FactAttribute);
A<CreateSignTests>().method((t) => t.createSign_verify_with_string_data).add(FactAttribute);
A<CreateSignTests>().method((t) => t.createSign_multiple_updates).add(FactAttribute);
A<CreateSignTests>().method((t) => t.createSign_dsa_works).add(FactAttribute);
