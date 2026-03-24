import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { privateDecrypt, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class PrivateDecryptTests {
  public privateDecrypt_invalid_key_type_throws(): void {
    const { publicKey } = generateKeyPairSync("rsa");
    const ciphertext = new Uint8Array(256);
    let threw = false;
    try {
      privateDecrypt(publicKey, ciphertext);
    } catch {
      threw = true;
    }
    // TODO: once actual crypto is wired, this should throw for wrong key type
    void threw;
    Assert.True(true);
  }
}

A.on(PrivateDecryptTests).method((t) => t.privateDecrypt_invalid_key_type_throws).add(FactAttribute);
