import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createHmac } from "@tsonic/nodejs/crypto.js";

export class CreateHmacTests {
  public createHmac_sha256_produces_correct_digest(): void {
    const hmac = createHmac("sha256", "secret-key");
    hmac.update("Hello, World!");
    const digest = hmac.digest("hex");
    Assert.True(digest.length > 0);
    Assert.Equal(64, digest.length);
  }

  public createHmac_md5_works(): void {
    const hmac = createHmac("md5", "key");
    hmac.update("data");
    const digest = hmac.digest("hex");
    Assert.Equal(32, digest.length);
  }

  public createHmac_sha1_works(): void {
    const hmac = createHmac("sha1", "key");
    hmac.update("data");
    const digest = hmac.digest("hex");
    Assert.Equal(40, digest.length);
  }

  public createHmac_sha384_works(): void {
    const hmac = createHmac("sha384", "key");
    hmac.update("data");
    const digest = hmac.digest("hex");
    Assert.Equal(96, digest.length);
  }

  public createHmac_sha512_works(): void {
    const hmac = createHmac("sha512", "key");
    hmac.update("data");
    const digest = hmac.digest("hex");
    Assert.Equal(128, digest.length);
  }

  public createHmac_with_byte_array_key(): void {
    const key = new Uint8Array([115, 101, 99, 114, 101, 116, 45, 107, 101, 121]);
    const hmac = createHmac("sha256", key);
    hmac.update("data");
    const digest = hmac.digest("hex");
    Assert.True(digest.length > 0);
  }

  public createHmac_binary_output(): void {
    const hmac = createHmac("sha256", "key");
    hmac.update("data");
    const digest = hmac.digest();
    Assert.Equal(32, digest.length);
  }

  public createHmac_update_with_bytes_works(): void {
    const hmac = createHmac("sha256", new Uint8Array([1, 2, 3, 4]));
    hmac.update(new Uint8Array([116, 101, 115, 116]));
    const digest = hmac.digest("hex");
    Assert.True(digest.length > 0);
    Assert.Equal(64, digest.length);
  }

  public createHmac_digest_as_bytes_works(): void {
    const hmac = createHmac("sha256", "key");
    hmac.update("test");
    const digest = hmac.digest();
    Assert.Equal(32, digest.length);
  }
}

A.on(CreateHmacTests).method((t) => t.createHmac_sha256_produces_correct_digest).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_md5_works).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_sha1_works).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_sha384_works).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_sha512_works).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_with_byte_array_key).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_binary_output).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_update_with_bytes_works).add(FactAttribute);
A.on(CreateHmacTests).method((t) => t.createHmac_digest_as_bytes_works).add(FactAttribute);
