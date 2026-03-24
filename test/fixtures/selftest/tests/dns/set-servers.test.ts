import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as dns from "@tsonic/nodejs/dns.js";

export class SetServersTests {
  public setServers_ValidServers_DoesNotThrow(): void {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
    // If we got here, no exception was thrown
    Assert.True(true);
  }
}

A.on(SetServersTests)
  .method((t) => t.setServers_ValidServers_DoesNotThrow)
  .add(FactAttribute);
