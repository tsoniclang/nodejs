import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { IpcSocketConnectOpts } from "@tsonic/nodejs/net.js";

export class IpcSocketConnectOptsTests {
  public path_can_be_set(): void {
    const opts = new IpcSocketConnectOpts();
    opts.path = "/tmp/socket";

    Assert.Equal("/tmp/socket", opts.path);
  }
}

A<IpcSocketConnectOptsTests>()
  .method((t) => t.path_can_be_set)
  .add(FactAttribute);
