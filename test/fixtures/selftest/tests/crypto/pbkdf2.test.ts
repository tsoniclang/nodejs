import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { pbkdf2 } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class Pbkdf2Tests {
  pbkdf2_async_works(): void {
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    pbkdf2("password", "salt", 1000 as int, 32 as int, "sha256", (err, key) => {
      error = err;
      result = key;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
    Assert.Equal(32, result!.length);
  }

  pbkdf2_callback_works(): void {
    let result: Uint8Array | null = null;
    let error: Error | null = null;
    pbkdf2("password", "salt", 1000 as int, 32 as int, "sha256", (err, key) => {
      error = err;
      result = key;
    });
    Assert.Equal(null, error);
    Assert.NotNull(result);
    Assert.Equal(32, result!.length);
  }
}

A<Pbkdf2Tests>().method((t) => t.pbkdf2_async_works).add(FactAttribute);
A<Pbkdf2Tests>().method((t) => t.pbkdf2_callback_works).add(FactAttribute);
