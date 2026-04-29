import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ServerOpts } from "@tsonic/nodejs/net.js";

export class ServerOptsTests {
  all_properties_can_be_set(): void {
    const opts = new ServerOpts();
    opts.allowHalfOpen = true;
    opts.pauseOnConnect = true;

    Assert.Equal(true, opts.allowHalfOpen);
    Assert.Equal(true, opts.pauseOnConnect);
  }
}

A<ServerOptsTests>()
  .method((t) => t.all_properties_can_be_set)
  .add(FactAttribute);
