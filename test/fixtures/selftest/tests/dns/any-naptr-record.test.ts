import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyNaptrRecord } from "@tsonic/nodejs/dns.js";

export class AnyNaptrRecordTests {
  AnyNaptrRecord_HasCorrectType(): void {
    const record = new AnyNaptrRecord();
    Assert.Equal("NAPTR", record.type);
  }
}

A<AnyNaptrRecordTests>()
  .method((t) => t.AnyNaptrRecord_HasCorrectType)
  .add(FactAttribute);
