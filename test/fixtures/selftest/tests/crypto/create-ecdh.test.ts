import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createECDH } from "@tsonic/nodejs/crypto.js";

export class CreateECDHTests {
  public createECDH_generates_keys(): void {
    const ecdh = createECDH("secp256r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  public createECDH_computes_shared_secret(): void {
    const alice = createECDH("secp256r1");
    const bob = createECDH("secp256r1");
    alice.generateKeys();
    bob.generateKeys();
    const aliceSecret = alice.computeSecret(bob.getPublicKey() as unknown as Uint8Array);
    const bobSecret = bob.computeSecret(alice.getPublicKey() as unknown as Uint8Array);
    Assert.Equal(aliceSecret, bobSecret);
  }

  public createECDH_get_public_key(): void {
    const ecdh = createECDH("secp256r1");
    ecdh.generateKeys();
    const publicKey = ecdh.getPublicKey();
    Assert.True(publicKey.length > 0);
  }

  public createECDH_get_private_key(): void {
    const ecdh = createECDH("secp256r1");
    ecdh.generateKeys();
    const privateKey = ecdh.getPrivateKey();
    Assert.True(privateKey.length > 0);
  }

  public createECDH_with_encoded_keys(): void {
    const ecdh = createECDH("secp256r1");
    const publicKeyHex = ecdh.generateKeys("hex");
    Assert.True(publicKeyHex.length > 0);
  }

  public createECDH_shared_secret_with_encoding(): void {
    const alice = createECDH("secp256r1");
    const bob = createECDH("secp256r1");
    alice.generateKeys();
    bob.generateKeys();
    const aliceSecretHex = alice.computeSecret(bob.getPublicKey() as unknown as Uint8Array, "hex");
    const bobSecretHex = bob.computeSecret(alice.getPublicKey() as unknown as Uint8Array, "hex");
    Assert.Equal(aliceSecretHex, bobSecretHex);
  }

  public createECDH_secp384r1_curve(): void {
    const ecdh = createECDH("secp384r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  public createECDH_secp521r1_curve(): void {
    const ecdh = createECDH("secp521r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  public createECDH_secp256k1_curve(): void {
    const ecdh = createECDH("secp256k1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  public createECDH_secp256k1_shared_secret(): void {
    const alice = createECDH("secp256k1");
    const bob = createECDH("secp256k1");
    const alicePublic = alice.generateKeys();
    const bobPublic = bob.generateKeys();
    const aliceShared = alice.computeSecret(bobPublic as unknown as Uint8Array);
    const bobShared = bob.computeSecret(alicePublic as unknown as Uint8Array);
    Assert.Equal(aliceShared, bobShared);
  }

  public createECDH_set_public_key_throws_not_supported(): void {
    const ecdh = createECDH("secp256r1");
    let threw = false;
    try {
      ecdh.setPublicKey(new Uint8Array(65));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createECDH_set_private_key_works(): void {
    const ecdh1 = createECDH("secp256r1");
    ecdh1.generateKeys();
    const privateKey = ecdh1.getPrivateKey();
    const ecdh2 = createECDH("secp256r1");
    ecdh2.setPrivateKey(privateKey as Uint8Array);
    const retrieved = ecdh2.getPrivateKey();
    Assert.Equal(privateKey, retrieved);
  }
}

A.on(CreateECDHTests).method((t) => t.createECDH_generates_keys).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_computes_shared_secret).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_get_public_key).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_get_private_key).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_with_encoded_keys).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_shared_secret_with_encoding).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_secp384r1_curve).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_secp521r1_curve).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_secp256k1_curve).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_secp256k1_shared_secret).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_set_public_key_throws_not_supported).add(FactAttribute);
A.on(CreateECDHTests).method((t) => t.createECDH_set_private_key_works).add(FactAttribute);
