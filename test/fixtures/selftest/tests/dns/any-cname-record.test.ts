import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyCnameRecord } from "@tsonic/nodejs/dns.js";

export class AnyCnameRecordTests {
  AnyCnameRecord_AllProperties_CanBeSet(): void {
    const record = new AnyCnameRecord();
    record.value = "www.example.com";

    Assert.Equal("CNAME", record.type);
    Assert.Equal("www.example.com", record.value);
  }
}

A<AnyCnameRecordTests>()
  .method((t) => t.AnyCnameRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
