import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createHash } from "@tsonic/nodejs/crypto.js";

export class CreateHashTests {
  public createHash_sha256_produces_correct_digest(): void {
    const hash = createHash("sha256");
    hash.update("Hello, World!");
    const digest = hash.digest("hex");
    Assert.Equal("dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f", digest);
  }

  public createHash_md5_produces_correct_digest(): void {
    const hash = createHash("md5");
    hash.update("Hello, World!");
    const digest = hash.digest("hex");
    Assert.Equal("65a8e27d8879283831b664bd8b7f0ad4", digest);
  }

  public createHash_multiple_updates_produces_correct_digest(): void {
    const hash = createHash("sha256");
    hash.update("Hello");
    hash.update(", ");
    hash.update("World!");
    const digest = hash.digest("hex");
    Assert.Equal("dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f", digest);
  }

  public createHash_digest_only_once(): void {
    const hash = createHash("sha256");
    hash.update("test");
    hash.digest();
    let threw = false;
    try {
      hash.digest();
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createHash_sha1_produces_correct_length(): void {
    const hash = createHash("sha1");
    hash.update("test");
    const digest = hash.digest("hex");
    Assert.Equal(40, digest.length);
  }

  public createHash_sha384_produces_correct_length(): void {
    const hash = createHash("sha384");
    hash.update("test");
    const digest = hash.digest("hex");
    Assert.Equal(96, digest.length);
  }

  public createHash_sha512_produces_correct_length(): void {
    const hash = createHash("sha512");
    hash.update("test");
    const digest = hash.digest("hex");
    Assert.Equal(128, digest.length);
  }

  public createHash_sha512_224_produces_correct_length(): void {
    const hash = createHash("sha512-224");
    hash.update("test");
    const digest = hash.digest("hex");
    Assert.Equal(56, digest.length);
  }

  public createHash_sha512_256_produces_correct_length(): void {
    const hash = createHash("sha512-256");
    hash.update("test");
    const digest = hash.digest("hex");
    Assert.Equal(64, digest.length);
  }

  public createHash_shake128_produces_correct_length(): void {
    const hash = createHash("shake128");
    hash.update("test");
    const digest = hash.digest(16);
    Assert.Equal(16, digest.length);
  }

  public createHash_shake128_default_output(): void {
    const hash = createHash("shake128");
    hash.update("test");
    const digest = hash.digest();
    Assert.Equal(16, digest.length);
  }

  public createHash_shake256_produces_correct_length(): void {
    const hash = createHash("shake256");
    hash.update("test");
    const digest = hash.digest(32);
    Assert.Equal(32, digest.length);
  }

  public createHash_shake256_default_output(): void {
    const hash = createHash("shake256");
    hash.update("test");
    const digest = hash.digest();
    Assert.Equal(32, digest.length);
  }

  public createHash_copy_works_correctly(): void {
    const hash1 = createHash("blake2b512");
    hash1.update("part1");
    const hash2 = hash1.copy();
    hash1.update("part2a");
    const digest1 = hash1.digest("hex");
    hash2.update("part2b");
    const digest2 = hash2.digest("hex");
    Assert.NotEqual(digest1, digest2);
  }

  public createHash_copy_sha3_works_correctly(): void {
    const hash1 = createHash("sha3-256");
    hash1.update("test");
    const hash2 = hash1.copy();
    const digest1 = hash1.digest("hex");
    const digest2 = hash2.digest("hex");
    Assert.Equal(digest1, digest2);
  }

  public createHash_copy_shake_works_correctly(): void {
    const hash1 = createHash("shake128");
    hash1.update("test");
    const hash2 = hash1.copy();
    const digest1 = hash1.digest(16);
    const digest2 = hash2.digest(16);
    Assert.Equal(digest1, digest2);
  }

  public createHash_base64_encoding(): void {
    const hash = createHash("sha256");
    hash.update("test");
    const digest = hash.digest("base64");
    Assert.True(digest.length > 0);
  }

  public createHash_base64url_encoding(): void {
    const hash = createHash("sha256");
    hash.update("test");
    const digest = hash.digest("base64url");
    Assert.True(digest.length > 0);
    Assert.False(digest.includes("+"));
    Assert.False(digest.includes("/"));
  }

  public createHash_binary_output(): void {
    const hash = createHash("sha256");
    hash.update("test");
    const digest = hash.digest();
    Assert.Equal(32, digest.length);
  }

  public createHash_update_after_digest_throws(): void {
    const hash = createHash("sha256");
    hash.update("test");
    hash.digest();
    let threw = false;
    try {
      hash.update("more");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createHash_update_with_bytes_works(): void {
    const hash = createHash("sha256");
    const bytes = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
    hash.update(bytes);
    const digest = hash.digest("hex");
    Assert.Equal("dffd6021bb2bd5b0af676290809ec3a53191dd81c7f70a4b28688a362182986f", digest);
  }

  public createHash_digest_as_bytes_works(): void {
    const hash = createHash("sha256");
    hash.update("test");
    const digest = hash.digest();
    Assert.Equal(32, digest.length);
  }

  public createHash_digest_base64url_works(): void {
    const hash = createHash("sha256");
    hash.update("test");
    const digest = hash.digest("base64url");
    Assert.True(digest.length > 0);
    Assert.False(digest.includes("+"));
    Assert.False(digest.includes("/"));
    Assert.False(digest.includes("="));
  }
}

A<CreateHashTests>().method((t) => t.createHash_sha256_produces_correct_digest).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_md5_produces_correct_digest).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_multiple_updates_produces_correct_digest).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_digest_only_once).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_sha1_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_sha384_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_sha512_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_sha512_224_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_sha512_256_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_shake128_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_shake128_default_output).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_shake256_produces_correct_length).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_shake256_default_output).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_copy_works_correctly).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_copy_sha3_works_correctly).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_copy_shake_works_correctly).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_base64_encoding).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_base64url_encoding).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_binary_output).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_update_after_digest_throws).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_update_with_bytes_works).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_digest_as_bytes_works).add(FactAttribute);
A<CreateHashTests>().method((t) => t.createHash_digest_base64url_works).add(FactAttribute);
