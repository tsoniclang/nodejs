import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnySoaRecord } from "@tsonic/nodejs/dns.js";

export class AnySoaRecordTests {
  public AnySoaRecord_HasCorrectType(): void {
    const record = new AnySoaRecord();
    Assert.Equal("SOA", record.type);
  }
}

A<AnySoaRecordTests>()
  .method((t) => t.AnySoaRecord_HasCorrectType)
  .add(FactAttribute);
