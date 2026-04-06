import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SoaRecord } from "@tsonic/nodejs/dns.js";

export class SoaRecordTests {
  public SoaRecord_AllProperties_CanBeSet(): void {
    const record = new SoaRecord();
    record.nsname = "ns.example.com";
    record.hostmaster = "root.example.com";
    record.serial = 2013101809;
    record.refresh = 10000;
    record.retry = 2400;
    record.expire = 604800;
    record.minttl = 3600;

    Assert.Equal("ns.example.com", record.nsname);
    Assert.Equal("root.example.com", record.hostmaster);
    Assert.Equal(2013101809, record.serial);
    Assert.Equal(10000, record.refresh);
    Assert.Equal(2400, record.retry);
    Assert.Equal(604800, record.expire);
    Assert.Equal(3600, record.minttl);
  }
}

A<SoaRecordTests>()
  .method((t) => t.SoaRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
