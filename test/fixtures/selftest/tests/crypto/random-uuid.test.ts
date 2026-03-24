import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { randomUUID } from "@tsonic/nodejs/crypto.js";

export class RandomUUIDTests {
  public randomUUID_generates_valid_uuid(): void {
    const uuid = randomUUID();
    // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
    Assert.Equal(36, uuid.length);
    Assert.Equal("-", uuid.charAt(8));
    Assert.Equal("-", uuid.charAt(13));
    Assert.Equal("-", uuid.charAt(18));
    Assert.Equal("-", uuid.charAt(23));
  }
}

A.on(RandomUUIDTests).method((t) => t.randomUUID_generates_valid_uuid).add(FactAttribute);
