import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createDecipheriv, randomBytes } from "@tsonic/nodejs/crypto.js";
import type { int } from "@tsonic/core/types.js";

export class CreateDecipherivTests {
  public createDecipheriv_set_auth_tag_throws_not_implemented(): void {
    const decipher = createDecipheriv("aes-256-cbc", randomBytes(32 as int), randomBytes(16 as int));
    let threw = false;
    try {
      decipher.setAuthTag(new Uint8Array(16));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createDecipheriv_set_aad_throws_not_implemented(): void {
    const decipher = createDecipheriv("aes-256-cbc", randomBytes(32 as int), randomBytes(16 as int));
    let threw = false;
    try {
      decipher.setAAD(new Uint8Array([97, 100, 100, 105, 116, 105, 111, 110, 97, 108]));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}

A.on(CreateDecipherivTests).method((t) => t.createDecipheriv_set_auth_tag_throws_not_implemented).add(FactAttribute);
A.on(CreateDecipherivTests).method((t) => t.createDecipheriv_set_aad_throws_not_implemented).add(FactAttribute);
