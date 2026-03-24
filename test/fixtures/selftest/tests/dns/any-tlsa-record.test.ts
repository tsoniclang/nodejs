import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { AnyTlsaRecord } from "@tsonic/nodejs/dns.js";

export class AnyTlsaRecordTests {
  public AnyTlsaRecord_HasCorrectType(): void {
    const record = new AnyTlsaRecord();
    Assert.Equal("TLSA", record.type);
  }
}

A.on(AnyTlsaRecordTests)
  .method((t) => t.AnyTlsaRecord_HasCorrectType)
  .add(FactAttribute);
