import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class ConstantsTests {
  public constants_ADDRCONFIG_IsCorrectValue(): void {
    Assert.Equal(0x0400, dns.ADDRCONFIG);
  }

  public constants_V4MAPPED_IsCorrectValue(): void {
    Assert.Equal(0x0800, dns.V4MAPPED);
  }

  public constants_ALL_IsCorrectValue(): void {
    Assert.Equal(dns.V4MAPPED | dns.ADDRCONFIG, dns.ALL);
  }

  public constants_ErrorCodes_AllDefined(): void {
    Assert.Equal("ENODATA", dns.NODATA);
    Assert.Equal("EFORMERR", dns.FORMERR);
    Assert.Equal("ESERVFAIL", dns.SERVFAIL);
    Assert.Equal("ENOTFOUND", dns.NOTFOUND);
    Assert.Equal("ENOTIMP", dns.NOTIMP);
    Assert.Equal("EREFUSED", dns.REFUSED);
    Assert.Equal("EBADQUERY", dns.BADQUERY);
    Assert.Equal("EBADNAME", dns.BADNAME);
    Assert.Equal("EBADFAMILY", dns.BADFAMILY);
    Assert.Equal("EBADRESP", dns.BADRESP);
    Assert.Equal("ECONNREFUSED", dns.CONNREFUSED);
    Assert.Equal("ETIMEOUT", dns.TIMEOUT);
    Assert.Equal("EOF", dns.EOF);
    Assert.Equal("EFILE", dns.FILE);
    Assert.Equal("ENOMEM", dns.NOMEM);
    Assert.Equal("EDESTRUCTION", dns.DESTRUCTION);
    Assert.Equal("EBADSTR", dns.BADSTR);
    Assert.Equal("EBADFLAGS", dns.BADFLAGS);
    Assert.Equal("ENONAME", dns.NONAME);
    Assert.Equal("EBADHINTS", dns.BADHINTS);
    Assert.Equal("ENOTINITIALIZED", dns.NOTINITIALIZED);
    Assert.Equal("ELOADIPHLPAPI", dns.LOADIPHLPAPI);
    Assert.Equal("EADDRGETNETWORKPARAMS", dns.ADDRGETNETWORKPARAMS);
    Assert.Equal("ECANCELLED", dns.CANCELLED);
  }
}

A<ConstantsTests>()
  .method((t) => t.constants_ADDRCONFIG_IsCorrectValue)
  .add(FactAttribute);
A<ConstantsTests>()
  .method((t) => t.constants_V4MAPPED_IsCorrectValue)
  .add(FactAttribute);
A<ConstantsTests>()
  .method((t) => t.constants_ALL_IsCorrectValue)
  .add(FactAttribute);
A<ConstantsTests>()
  .method((t) => t.constants_ErrorCodes_AllDefined)
  .add(FactAttribute);
