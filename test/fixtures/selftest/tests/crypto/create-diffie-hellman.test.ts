import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createDiffieHellman, randomBytes } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class CreateDiffieHellmanTests {
  public createDiffieHellman_with_prime_and_generator(): void {
    const prime = randomBytes(256 as int);
    const dh = createDiffieHellman(prime, 2);
    const publicKey = dh.generateKeys();
    Assert.True(publicKey.length > 0);
  }

  public createDiffieHellman_get_prime(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    const retrievedPrime = dh.getPrime();
    Assert.Equal(prime, retrievedPrime);
  }

  public createDiffieHellman_get_generator(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    const generator = dh.getGenerator();
    Assert.True(generator.length > 0);
  }

  public createDiffieHellman_get_public_key(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    dh.generateKeys();
    const publicKey = dh.getPublicKey();
    Assert.True(publicKey.length > 0);
  }

  public createDiffieHellman_get_private_key(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    dh.generateKeys();
    const privateKey = dh.getPrivateKey();
    Assert.True(privateKey.length > 0);
  }

  public createDiffieHellman_set_get_keys(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    dh.generateKeys();
    const publicKey = dh.getPublicKey();
    const privateKey = dh.getPrivateKey();
    const dh2 = createDiffieHellman(prime, 2);
    dh2.setPrivateKey(privateKey as Uint8Array);
    Assert.Equal(publicKey, dh2.getPublicKey());
  }

  public createDiffieHellman_with_encoded_keys(): void {
    const prime = randomBytes(128 as int);
    const dh = createDiffieHellman(prime, 2);
    const publicKeyHex = dh.generateKeys("hex");
    Assert.True(publicKeyHex.length > 0);
    const publicKeyBase64 = dh.getPublicKey("base64");
    Assert.True(publicKeyBase64.length > 0);
  }

  public createDiffieHellman_with_generated_prime_works(): void {
    const dh = createDiffieHellman(512);
    const prime = dh.getPrime();
    const generator = dh.getGenerator();
    Assert.True(prime.length > 0);
    Assert.True(generator.length > 0);
    const publicKey = dh.generateKeys();
    Assert.True(publicKey.length > 0);
  }
}

A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_with_prime_and_generator).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_get_prime).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_get_generator).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_get_public_key).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_get_private_key).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_set_get_keys).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_with_encoded_keys).add(FactAttribute);
A<CreateDiffieHellmanTests>().method((t) => t.createDiffieHellman_with_generated_prime_works).add(FactAttribute);
