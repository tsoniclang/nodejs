import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class SetServersTests {
  public setServers_ValidServers_DoesNotThrow(): void {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    const servers = dns.getServers();
    Assert.Equal(2 as number, servers.length as number);
    Assert.Equal("8.8.8.8", servers[0] as string);
    Assert.Equal("8.8.4.4", servers[1] as string);
  }
}

A<SetServersTests>()
  .method((t) => t.setServers_ValidServers_DoesNotThrow)
  .add(FactAttribute);
