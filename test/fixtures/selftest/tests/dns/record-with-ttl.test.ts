import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { RecordWithTtl } from "@tsonic/nodejs/dns.js";

export class RecordWithTtlTests {
  public RecordWithTtl_AllProperties_CanBeSet(): void {
    const record = new RecordWithTtl();
    record.address = "127.0.0.1";
    record.ttl = 300;

    Assert.Equal("127.0.0.1", record.address);
    Assert.Equal(300, record.ttl);
  }
}

A.on(RecordWithTtlTests)
  .method((t) => t.RecordWithTtl_AllProperties_CanBeSet)
  .add(FactAttribute);
