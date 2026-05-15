import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { privateEncrypt, publicDecrypt, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class PrivateEncryptTests {
  privateEncrypt_publicDecrypt_roundtrip(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const plaintext = new Uint8Array(32);
    // TODO: fill with random data
    const encrypted = privateEncrypt(privateKey, plaintext);
    const decrypted = publicDecrypt(publicKey, encrypted);
    Assert.Equal(plaintext, decrypted);
  }

  privateEncrypt_publicDecrypt_with_key_objects(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const plaintext = new Uint8Array(32);
    const encrypted = privateEncrypt(privateKey, plaintext);
    const decrypted = publicDecrypt(publicKey, encrypted);
    Assert.Equal(plaintext, decrypted);
  }
}

A<PrivateEncryptTests>().method((t) => t.privateEncrypt_publicDecrypt_roundtrip).add(FactAttribute);
A<PrivateEncryptTests>().method((t) => t.privateEncrypt_publicDecrypt_with_key_objects).add(FactAttribute);
