import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { pbkdf2Sync } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class Pbkdf2SyncTests {
  public pbkdf2Sync_generates_correct_length(): void {
    const derived = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha256");
    Assert.Equal(32, derived.length);
  }

  public pbkdf2Sync_deterministic_output(): void {
    const derived1 = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha256");
    const derived2 = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha256");
    Assert.Equal(derived1, derived2);
  }

  public pbkdf2Sync_different_iterations(): void {
    const derived1 = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha256");
    const derived2 = pbkdf2Sync("password", "salt", 2000 as int, 32 as int, "sha256");
    Assert.NotEqual(derived1, derived2);
  }

  public pbkdf2Sync_different_salts(): void {
    const derived1 = pbkdf2Sync("password", "salt1", 1000 as int, 32 as int, "sha256");
    const derived2 = pbkdf2Sync("password", "salt2", 1000 as int, 32 as int, "sha256");
    Assert.NotEqual(derived1, derived2);
  }

  public pbkdf2Sync_sha1(): void {
    const derived = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha1");
    Assert.Equal(32, derived.length);
  }

  public pbkdf2Sync_sha384(): void {
    const derived = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha384");
    Assert.Equal(32, derived.length);
  }

  public pbkdf2Sync_sha512(): void {
    const derived = pbkdf2Sync("password", "salt", 1000 as int, 32 as int, "sha512");
    Assert.Equal(32, derived.length);
  }

  public pbkdf2Sync_with_byte_arrays(): void {
    const password = new Uint8Array([112, 97, 115, 115, 119, 111, 114, 100]);
    const salt = new Uint8Array([115, 97, 108, 116]);
    const derived = pbkdf2Sync(password, salt, 1000 as int, 32 as int, "sha256");
    Assert.Equal(32, derived.length);
  }
}

A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_generates_correct_length).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_deterministic_output).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_different_iterations).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_different_salts).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_sha1).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_sha384).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_sha512).add(FactAttribute);
A.on(Pbkdf2SyncTests).method((t) => t.pbkdf2Sync_with_byte_arrays).add(FactAttribute);
