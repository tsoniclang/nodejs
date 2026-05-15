import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { CaaRecord } from "@tsonic/nodejs/dns.js";

export class CaaRecordTests {
  CaaRecord_AllProperties_CanBeSet(): void {
    const record = new CaaRecord();
    record.critical = 0;
    record.issue = "example.com";
    record.issuewild = "*.example.com";
    record.iodef = "mailto:security@example.com";
    record.contactemail = "security@example.com";
    record.contactphone = "+1-555-0100";

    Assert.Equal(0, record.critical);
    Assert.Equal("example.com", record.issue);
    Assert.Equal("*.example.com", record.issuewild);
    Assert.Equal("mailto:security@example.com", record.iodef);
    Assert.Equal("security@example.com", record.contactemail);
    Assert.Equal("+1-555-0100", record.contactphone);
  }
}

A<CaaRecordTests>()
  .method((t) => t.CaaRecord_AllProperties_CanBeSet)
  .add(FactAttribute);
