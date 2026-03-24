import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyARecord } from "@tsonic/nodejs/dns.js";

export class AnyARecordTests {
  public AnyARecord_HasCorrectType(): void {
    const record = new AnyARecord();
    Assert.Equal("A", record.type);
  }
}

A.on(AnyARecordTests)
  .method((t) => t.AnyARecord_HasCorrectType)
  .add(FactAttribute);
