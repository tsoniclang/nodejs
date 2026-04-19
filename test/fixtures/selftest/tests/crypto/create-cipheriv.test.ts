import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createCipheriv, createDecipheriv, randomBytes } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class CreateCipherivTests {
  public createCipheriv_decipher_aes256_round_trip(): void {
    const key = randomBytes(32 as int);
    const iv = randomBytes(16 as int);
    const plaintext = "Hello, World! This is a test message.";
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const decipher = createDecipheriv("aes-256-cbc", key, iv);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");
    Assert.Equal(plaintext, decryptedFinal);
  }

  public createCipheriv_final_only_once(): void {
    const key = randomBytes(32 as int);
    const iv = randomBytes(16 as int);
    const cipher = createCipheriv("aes-256-cbc", key, iv);
    cipher.update("test");
    cipher.final();
    let threw = false;
    try {
      cipher.final();
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createCipheriv_aes128cbc_works(): void {
    const key = randomBytes(16 as int);
    const iv = randomBytes(16 as int);
    const plaintext = "Test message";
    const cipher = createCipheriv("aes-128-cbc", key, iv);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const decipher = createDecipheriv("aes-128-cbc", key, iv);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");
    Assert.Equal(plaintext, decryptedFinal);
  }

  public createCipheriv_aes192cbc_works(): void {
    const key = randomBytes(24 as int);
    const iv = randomBytes(16 as int);
    const plaintext = "Test message";
    const cipher = createCipheriv("aes-192-cbc", key, iv);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const decipher = createDecipheriv("aes-192-cbc", key, iv);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");
    Assert.Equal(plaintext, decryptedFinal);
  }

  public createCipheriv_aes256ecb_works(): void {
    const key = randomBytes(32 as int);
    const plaintext = "Test message";
    const cipher = createCipheriv("aes-256-ecb", key, null);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const decipher = createDecipheriv("aes-256-ecb", key, null);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");
    Assert.Equal(plaintext, decryptedFinal);
  }

  public createCipheriv_aes256cfb_works(): void {
    const key = randomBytes(32 as int);
    const iv = randomBytes(16 as int);
    const plaintext = "Test message";
    const cipher = createCipheriv("aes-256-cfb", key, iv);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const decipher = createDecipheriv("aes-256-cfb", key, iv);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");
    Assert.Equal(plaintext, decryptedFinal);
  }

  public createCipheriv_string_key_and_iv(): void {
    const cipher = createCipheriv("aes-256-cbc", "12345678901234567890123456789012", "1234567890123456");
    const encrypted = cipher.update("test", "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    Assert.True(encryptedFinal.length > 0);
  }

  public createCipheriv_update_after_final_throws(): void {
    const cipher = createCipheriv("aes-256-cbc", randomBytes(32 as int), randomBytes(16 as int));
    cipher.update("test");
    cipher.final();
    let threw = false;
    try {
      cipher.update("more");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createCipheriv_get_auth_tag_throws_not_implemented(): void {
    const cipher = createCipheriv("aes-256-cbc", randomBytes(32 as int), randomBytes(16 as int));
    cipher.update("test data", "utf8", "hex");
    cipher.final("hex");
    let threw = false;
    try {
      cipher.getAuthTag();
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createCipheriv_set_aad_throws_not_implemented(): void {
    const cipher = createCipheriv("aes-256-cbc", randomBytes(32 as int), randomBytes(16 as int));
    let threw = false;
    try {
      cipher.setAAD(new Uint8Array([97, 100, 100, 105, 116, 105, 111, 110, 97, 108]));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createCipheriv_aes256gcm_round_trip(): void {
    const key = randomBytes(32 as int);
    const iv = randomBytes(12 as int);
    const aad = new Uint8Array([97, 97, 100]);
    const plaintext = "hello gcm";

    const cipher = createCipheriv("aes-256-gcm", key, iv);
    cipher.setAAD(aad);
    const encrypted = cipher.update(plaintext, "utf8", "hex");
    const encryptedFinal = encrypted + cipher.final("hex");
    const authTag = cipher.getAuthTag();

    Assert.Equal(16, authTag.length);

    const decipher = createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAAD(aad);
    decipher.setAuthTag(authTag);
    const decrypted = decipher.update(encryptedFinal, "hex", "utf8");
    const decryptedFinal = decrypted + decipher.final("utf8");

    Assert.Equal(plaintext, decryptedFinal);
  }
}

A<CreateCipherivTests>().method((t) => t.createCipheriv_decipher_aes256_round_trip).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_final_only_once).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_aes128cbc_works).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_aes192cbc_works).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_aes256ecb_works).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_aes256cfb_works).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_string_key_and_iv).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_update_after_final_throws).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_get_auth_tag_throws_not_implemented).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_set_aad_throws_not_implemented).add(FactAttribute);
A<CreateCipherivTests>().method((t) => t.createCipheriv_aes256gcm_round_trip).add(FactAttribute);
