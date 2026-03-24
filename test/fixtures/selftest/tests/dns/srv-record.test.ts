import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SrvRecord } from "@tsonic/nodejs/dns.js";

export class SrvRecordTests {
  public SrvRecord_AllProperties_CanBeSet(): void {
    const record = new SrvRecord();
    record.priority = 10;
    record.weight = 5;
    record.port = 21223;
    record.name = "service.example.com";

    Assert.Equal(10, record.priority);
    Assert.Equal(5, record.weight);
    Assert.Equal(21223, record.port);
    Assert.Equal("service.example.com", record.name);
  }
}

A.on(SrvRecordTests)
  .method((t) => t.SrvRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
