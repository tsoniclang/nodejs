import { asinterface, attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createECDH } from "@tsonic/nodejs/crypto.js";

export class CreateECDHTests {
  createECDH_generates_keys(): void {
    const ecdh = createECDH("secp256r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  createECDH_computes_shared_secret(): void {
    const alice = createECDH("secp256r1");
    const bob = createECDH("secp256r1");
    alice.generateKeys();
    bob.generateKeys();
    const aliceSecret = alice.computeSecret(asinterface<Uint8Array>(bob.getPublicKey()));
    const bobSecret = bob.computeSecret(asinterface<Uint8Array>(alice.getPublicKey()));
    Assert.Equal(aliceSecret, bobSecret);
  }

  createECDH_get_public_key(): void {
    const ecdh = createECDH("secp256r1");
    ecdh.generateKeys();
    const publicKey = ecdh.getPublicKey();
    Assert.True(publicKey.length > 0);
  }

  createECDH_get_private_key(): void {
    const ecdh = createECDH("secp256r1");
    ecdh.generateKeys();
    const privateKey = ecdh.getPrivateKey();
    Assert.True(privateKey.length > 0);
  }

  createECDH_with_encoded_keys(): void {
    const ecdh = createECDH("secp256r1");
    const publicKeyHex = ecdh.generateKeys("hex");
    Assert.True(publicKeyHex.length > 0);
  }

  createECDH_shared_secret_with_encoding(): void {
    const alice = createECDH("secp256r1");
    const bob = createECDH("secp256r1");
    alice.generateKeys();
    bob.generateKeys();
    const aliceSecretHex = alice.computeSecret(asinterface<Uint8Array>(bob.getPublicKey()), "hex");
    const bobSecretHex = bob.computeSecret(asinterface<Uint8Array>(alice.getPublicKey()), "hex");
    Assert.Equal(aliceSecretHex, bobSecretHex);
  }

  createECDH_secp384r1_curve(): void {
    const ecdh = createECDH("secp384r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  createECDH_secp521r1_curve(): void {
    const ecdh = createECDH("secp521r1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  createECDH_secp256k1_curve(): void {
    const ecdh = createECDH("secp256k1");
    const publicKey = ecdh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  createECDH_secp256k1_shared_secret(): void {
    const alice = createECDH("secp256k1");
    const bob = createECDH("secp256k1");
    const alicePublic = alice.generateKeys();
    const bobPublic = bob.generateKeys();
    const aliceShared = alice.computeSecret(asinterface<Uint8Array>(bobPublic));
    const bobShared = bob.computeSecret(asinterface<Uint8Array>(alicePublic));
    Assert.Equal(aliceShared, bobShared);
  }

  createECDH_set_public_key_round_trips(): void {
    const ecdh = createECDH("secp256r1");
    const publicKey = new Uint8Array(65);
    publicKey[0] = 4;
    publicKey[64] = 1;
    ecdh.setPublicKey(publicKey);
    Assert.Equal(publicKey, ecdh.getPublicKey());
  }

  createECDH_set_private_key_works(): void {
    const ecdh1 = createECDH("secp256r1");
    ecdh1.generateKeys();
    const privateKey = ecdh1.getPrivateKey();
    const ecdh2 = createECDH("secp256r1");
    ecdh2.setPrivateKey(privateKey as Uint8Array);
    const retrieved = ecdh2.getPrivateKey();
    Assert.Equal(privateKey, retrieved);
  }
}

A<CreateECDHTests>().method((t) => t.createECDH_generates_keys).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_computes_shared_secret).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_get_public_key).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_get_private_key).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_with_encoded_keys).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_shared_secret_with_encoding).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_secp384r1_curve).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_secp521r1_curve).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_secp256k1_curve).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_secp256k1_shared_secret).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_set_public_key_round_trips).add(FactAttribute);
A<CreateECDHTests>().method((t) => t.createECDH_set_private_key_works).add(FactAttribute);
