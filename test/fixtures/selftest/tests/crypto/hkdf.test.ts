import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { hkdf } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class HkdfTests {
  public hkdf_callback_derives_key(): void {
    let caughtError: Error | null = null;
    let resultKey: Uint8Array | null = null;
    hkdf("sha256", new Uint8Array(32), new Uint8Array(16), new Uint8Array(16), 32 as int, (err, key) => {
      caughtError = err;
      resultKey = key;
    });
    Assert.Equal(null, caughtError);
    Assert.NotNull(resultKey);
    Assert.Equal(32, resultKey!.length);
  }
}

A.on(HkdfTests).method((t) => t.hkdf_callback_derives_key).add(FactAttribute);
