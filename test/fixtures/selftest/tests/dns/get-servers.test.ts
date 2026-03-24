import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class GetServersTests {
  public getServers_ReturnsServerArray(): void {
    const servers = dns.getServers();
    Assert.NotNull(servers);
  }
}

A.on(GetServersTests)
  .method((t) => t.getServers_ReturnsServerArray)
  .add(FactAttribute);
