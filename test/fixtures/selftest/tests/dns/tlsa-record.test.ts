import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { TlsaRecord } from "@tsonic/nodejs/dns.js";

export class TlsaRecordTests {
  TlsaRecord_AllProperties_CanBeSet(): void {
    const record = new TlsaRecord();
    record.certUsage = 3;
    record.selector = 1;
    record.match = 1;
    record.data = [1, 2, 3, 4];

    Assert.Equal(3, record.certUsage);
    Assert.Equal(1, record.selector);
    Assert.Equal(1, record.match);
    Assert.Equal(4, record.data.length);
    Assert.Equal(1, record.data[0]);
    Assert.Equal(2, record.data[1]);
    Assert.Equal(3, record.data[2]);
    Assert.Equal(4, record.data[3]);
  }
}

A<TlsaRecordTests>()
  .method((t) => t.TlsaRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
