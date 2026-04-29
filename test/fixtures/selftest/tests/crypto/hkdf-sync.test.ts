import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { hkdfSync } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class HkdfSyncTests {
  hkdfSync_derives_key(): void {
    const ikm = new Uint8Array(32);
    const salt = new Uint8Array(16);
    const info = new Uint8Array(16);
    const key = hkdfSync("sha256", ikm, salt, info, 32 as int);
    Assert.NotNull(key);
    Assert.Equal(32, key.length);
  }
}

A<HkdfSyncTests>().method((t) => t.hkdfSync_derives_key).add(FactAttribute);
