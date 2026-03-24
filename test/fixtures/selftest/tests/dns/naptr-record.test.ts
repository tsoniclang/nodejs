import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { NaptrRecord } from "@tsonic/nodejs/dns.js";

export class NaptrRecordTests {
  public NaptrRecord_AllProperties_CanBeSet(): void {
    const record = new NaptrRecord();
    record.flags = "s";
    record.service = "SIP+D2U";
    record.regexp = "";
    record.replacement = "_sip._udp.example.com";
    record.order = 30;
    record.preference = 100;

    Assert.Equal("s", record.flags);
    Assert.Equal("SIP+D2U", record.service);
    Assert.Equal("", record.regexp);
    Assert.Equal("_sip._udp.example.com", record.replacement);
    Assert.Equal(30, record.order);
    Assert.Equal(100, record.preference);
  }
}

A.on(NaptrRecordTests)
  .method((t) => t.NaptrRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
