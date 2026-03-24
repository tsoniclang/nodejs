import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { scryptSync } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class ScryptSyncTests {
  public scryptSync_generates_key(): void {
    const key = scryptSync("password", "salt", 32 as int);
    Assert.NotNull(key);
    Assert.Equal(32, key.length);
  }
}

A.on(ScryptSyncTests).method((t) => t.scryptSync_generates_key).add(FactAttribute);
