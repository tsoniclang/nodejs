import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyPtrRecord } from "@tsonic/nodejs/dns.js";

export class AnyPtrRecordTests {
  public AnyPtrRecord_AllProperties_CanBeSet(): void {
    const record = new AnyPtrRecord();
    record.value = "example.com";

    Assert.Equal("PTR", record.type);
    Assert.Equal("example.com", record.value);
  }
}

A<AnyPtrRecordTests>()
  .method((t) => t.AnyPtrRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
