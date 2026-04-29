import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class GetServersTests {
  getServers_ReturnsServerArray(): void {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
    const servers = dns.getServers();
    Assert.NotNull(servers);
    Assert.Equal(2 as number, servers.length as number);
    Assert.Equal("1.1.1.1", servers[0] as string);
  }
}

A<GetServersTests>()
  .method((t) => t.getServers_ReturnsServerArray)
  .add(FactAttribute);
