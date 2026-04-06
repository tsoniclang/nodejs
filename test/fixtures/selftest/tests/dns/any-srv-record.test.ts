import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnySrvRecord } from "@tsonic/nodejs/dns.js";

export class AnySrvRecordTests {
  public AnySrvRecord_HasCorrectType(): void {
    const record = new AnySrvRecord();
    Assert.Equal("SRV", record.type);
  }
}

A<AnySrvRecordTests>()
  .method((t) => t.AnySrvRecord_HasCorrectType)
  .add(FactAttribute);
