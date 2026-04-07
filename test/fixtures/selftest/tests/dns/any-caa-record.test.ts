import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyCaaRecord } from "@tsonic/nodejs/dns.js";

export class AnyCaaRecordTests {
  public AnyCaaRecord_HasCorrectType(): void {
    const record = new AnyCaaRecord();
    Assert.Equal("CAA", record.type);
  }
}

A<AnyCaaRecordTests>()
  .method((t) => t.AnyCaaRecord_HasCorrectType)
  .add(FactAttribute);
