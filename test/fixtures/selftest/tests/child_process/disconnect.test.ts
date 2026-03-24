import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/disconnect.tests.cs
 */
export class ChildProcessDisconnectTests {
  public disconnect_SetsConnectedFalse(): void {
    const child = child_process.spawn("echo", ["test"]);

    child.disconnect();
    Assert.False(child.connected);
  }
}

A.on(ChildProcessDisconnectTests)
  .method((t) => t.disconnect_SetsConnectedFalse)
  .add(FactAttribute);
