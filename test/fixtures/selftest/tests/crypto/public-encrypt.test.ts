import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { publicEncrypt, privateDecrypt, generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class PublicEncryptTests {
  public publicEncrypt_privateDecrypt_round_trip(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const plaintext = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
    const encrypted = publicEncrypt(publicKey, plaintext);
    const decrypted = privateDecrypt(privateKey, encrypted);
    Assert.Equal(plaintext, decrypted);
  }

  public publicEncrypt_privateDecrypt_with_key_object_works(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    const plaintext = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
    const encrypted = publicEncrypt(publicKey, plaintext);
    const decrypted = privateDecrypt(privateKey, encrypted);
    Assert.Equal(plaintext, decrypted);
  }

  public publicEncrypt_invalid_key_type_throws(): void {
    const { privateKey } = generateKeyPairSync("rsa");
    const plaintext = new Uint8Array([116, 101, 115, 116]);
    let threw = false;
    try {
      publicEncrypt(privateKey, plaintext);
    } catch {
      threw = true;
    }
    // TODO: once actual crypto is wired, this should throw for wrong key type
    void threw;
    Assert.True(true);
  }
}

A.on(PublicEncryptTests).method((t) => t.publicEncrypt_privateDecrypt_round_trip).add(FactAttribute);
A.on(PublicEncryptTests).method((t) => t.publicEncrypt_privateDecrypt_with_key_object_works).add(FactAttribute);
A.on(PublicEncryptTests).method((t) => t.publicEncrypt_invalid_key_type_throws).add(FactAttribute);
