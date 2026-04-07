import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getDiffieHellman } from "@tsonic/nodejs/crypto.js";

export class GetDiffieHellmanTests {
  public getDiffieHellman_creates_group_instance(): void {
    const dh = getDiffieHellman("modp1");
    Assert.NotNull(dh);
    Assert.NotNull(dh.getPrime());
    Assert.NotNull(dh.getGenerator());
  }
}

A<GetDiffieHellmanTests>().method((t) => t.getDiffieHellman_creates_group_instance).add(FactAttribute);
