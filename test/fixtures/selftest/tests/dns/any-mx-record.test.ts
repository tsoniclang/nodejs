import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyMxRecord } from "@tsonic/nodejs/dns.js";

export class AnyMxRecordTests {
  AnyMxRecord_HasCorrectType(): void {
    const record = new AnyMxRecord();
    Assert.Equal("MX", record.type);
  }
}

A<AnyMxRecordTests>()
  .method((t) => t.AnyMxRecord_HasCorrectType)
  .add(FactAttribute);
