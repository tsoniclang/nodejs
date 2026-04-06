import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { scrypt } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class ScryptTests {
  public scrypt_callback_generates_key(): void {
    let caughtError: Error | null = null;
    let resultKey: Uint8Array | null = null;
    scrypt("password", "salt", 32 as int, null, (err, key) => {
      caughtError = err;
      resultKey = key;
    });
    Assert.Equal(null, caughtError);
    Assert.NotNull(resultKey);
    Assert.Equal(32, resultKey!.length);
  }
}

A<ScryptTests>().method((t) => t.scrypt_callback_generates_key).add(FactAttribute);
