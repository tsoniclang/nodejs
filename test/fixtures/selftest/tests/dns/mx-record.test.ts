import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { MxRecord } from "@tsonic/nodejs/dns.js";

export class MxRecordTests {
  public MxRecord_AllProperties_CanBeSet(): void {
    const record = new MxRecord();
    record.priority = 10;
    record.exchange = "mail.example.com";

    Assert.Equal(10, record.priority);
    Assert.Equal("mail.example.com", record.exchange);
  }
}

A<MxRecordTests>()
  .method((t) => t.MxRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
