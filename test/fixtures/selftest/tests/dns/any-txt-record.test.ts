import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyTxtRecord } from "@tsonic/nodejs/dns.js";

export class AnyTxtRecordTests {
  public AnyTxtRecord_AllProperties_CanBeSet(): void {
    const record = new AnyTxtRecord();
    record.entries = ["v=spf1 include:_spf.example.com ~all"];

    Assert.Equal("TXT", record.type);
    Assert.Equal(1, record.entries.length);
    Assert.Equal("v=spf1 include:_spf.example.com ~all", record.entries[0]);
  }
}

A.on(AnyTxtRecordTests)
  .method((t) => t.AnyTxtRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
