import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyAaaaRecord } from "@tsonic/nodejs/dns.js";

export class AnyAaaaRecordTests {
  public AnyAaaaRecord_HasCorrectType(): void {
    const record = new AnyAaaaRecord();
    Assert.Equal("AAAA", record.type);
  }
}

A.on(AnyAaaaRecordTests)
  .method((t) => t.AnyAaaaRecord_HasCorrectType)
  .add(FactAttribute);
