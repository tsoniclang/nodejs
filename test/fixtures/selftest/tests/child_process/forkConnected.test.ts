import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessForkConnectedTests {
  forkConnected_InitiallyTrue(): void {
    const modulePath = "/usr/bin/echo";
    const child = child_process.fork(modulePath);

    Assert.True(child.connected);

    child.kill();
  }
}

A<ChildProcessForkConnectedTests>()
  .method((t) => t.forkConnected_InitiallyTrue)
  .add(FactAttribute);
