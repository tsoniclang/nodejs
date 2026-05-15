import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { generateKeyPairSync } from "@tsonic/nodejs/crypto.js";

export class GenerateKeyPairSyncTests {
  generateKeyPairSync_rsa_creates_valid_key_pair(): void {
    const { publicKey, privateKey } = generateKeyPairSync("rsa");
    Assert.NotNull(publicKey);
    Assert.NotNull(privateKey);
    Assert.Equal("public", publicKey.type);
    Assert.Equal("private", privateKey.type);
    Assert.Equal("rsa", publicKey.asymmetricKeyType);
    Assert.Equal("rsa", privateKey.asymmetricKeyType);
  }

  generateKeyPairSync_ec_creates_valid_key_pair(): void {
    const { publicKey, privateKey } = generateKeyPairSync("ec");
    Assert.NotNull(publicKey);
    Assert.NotNull(privateKey);
    Assert.Equal("public", publicKey.type);
    Assert.Equal("private", privateKey.type);
    Assert.Equal("ec", publicKey.asymmetricKeyType);
    Assert.Equal("ec", privateKey.asymmetricKeyType);
  }

  generateKeyPairSync_ed25519_generates_keys(): void {
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    Assert.NotNull(publicKey);
    Assert.NotNull(privateKey);
    Assert.Equal("public", publicKey.type);
    Assert.Equal("private", privateKey.type);
    Assert.Equal("ed25519", publicKey.asymmetricKeyType);
    Assert.Equal("ed25519", privateKey.asymmetricKeyType);
  }

  generateKeyPairSync_dsa_generates_keys(): void {
    const { publicKey, privateKey } = generateKeyPairSync("dsa");
    Assert.NotNull(publicKey);
    Assert.NotNull(privateKey);
    Assert.Equal("public", publicKey.type);
    Assert.Equal("private", privateKey.type);
    Assert.Equal("dsa", publicKey.asymmetricKeyType);
    Assert.Equal("dsa", privateKey.asymmetricKeyType);
  }

  generateKeyPairSync_dh_generates_keys(): void {
    const { publicKey, privateKey } = generateKeyPairSync("dh");
    Assert.NotNull(publicKey);
    Assert.NotNull(privateKey);
    Assert.Equal("secret", publicKey.type);
    Assert.Equal("secret", privateKey.type);
  }

  generateKeyPairSync_dh_generates_keys_reliably(): void {
    for (let i = 0; i < 8; i++) {
      const { publicKey, privateKey } = generateKeyPairSync("dh");
      Assert.NotNull(publicKey);
      Assert.NotNull(privateKey);
      Assert.Equal("secret", publicKey.type);
      Assert.Equal("secret", privateKey.type);
    }
  }

  generateKeyPairSync_invalid_type_throws(): void {
    let threw = false;
    try {
      generateKeyPairSync("invalid");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}

A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_rsa_creates_valid_key_pair).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_ec_creates_valid_key_pair).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_ed25519_generates_keys).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_dsa_generates_keys).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_dh_generates_keys).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_dh_generates_keys_reliably).add(FactAttribute);
A<GenerateKeyPairSyncTests>().method((t) => t.generateKeyPairSync_invalid_type_throws).add(FactAttribute);
