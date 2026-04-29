import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { hash } from "@tsonic/nodejs/crypto.js";

export class HashTests {
  hash_static_works(): void {
    const data = new Uint8Array([116, 101, 115, 116]);
    const result = hash("sha256", data);
    Assert.Equal(32, result.length);
  }

  hash_static_hash_works(): void {
    const data = new Uint8Array([84, 101, 115, 116, 32, 100, 97, 116, 97]);
    const result = hash("sha256", data, undefined);
    Assert.Equal(32, result.length);
  }
}

A<HashTests>().method((t) => t.hash_static_works).add(FactAttribute);
A<HashTests>().method((t) => t.hash_static_hash_works).add(FactAttribute);
