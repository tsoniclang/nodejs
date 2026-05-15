import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getHashes } from "@tsonic/nodejs/crypto.js";

export class GetHashesTests {
  getHashes_returns_non_empty_list(): void {
    const hashes = getHashes();
    Assert.True(hashes.length > 0);
    Assert.True(hashes.includes("sha256"));
    Assert.True(hashes.includes("md5"));
  }

  getHashes_contains_expected_algorithms(): void {
    const hashes = getHashes();
    Assert.True(hashes.includes("md5"));
    Assert.True(hashes.includes("sha1"));
    Assert.True(hashes.includes("sha256"));
    Assert.True(hashes.includes("sha384"));
    Assert.True(hashes.includes("sha512"));
  }
}

A<GetHashesTests>().method((t) => t.getHashes_returns_non_empty_list).add(FactAttribute);
A<GetHashesTests>().method((t) => t.getHashes_contains_expected_algorithms).add(FactAttribute);
