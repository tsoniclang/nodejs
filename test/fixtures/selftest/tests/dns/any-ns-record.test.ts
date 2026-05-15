import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyNsRecord } from "@tsonic/nodejs/dns.js";

export class AnyNsRecordTests {
  AnyNsRecord_AllProperties_CanBeSet(): void {
    const record = new AnyNsRecord();
    record.value = "ns1.example.com";

    Assert.Equal("NS", record.type);
    Assert.Equal("ns1.example.com", record.value);
  }
}

A<AnyNsRecordTests>()
  .method((t) => t.AnyNsRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
