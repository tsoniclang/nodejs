import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/disconnectEvent.tests.cs
 */
export class ChildProcessDisconnectEventTests {
  public disconnectEvent_CanBeEmitted(): void {
    const child = child_process.spawn("echo", ["test"]);
    child.on("disconnect", () => {
      // Disconnect event handler attached
    });

    child.disconnect();

    // disconnect() immediately sets connected to false
    Assert.False(child.connected);
  }
}

A.on(ChildProcessDisconnectEventTests)
  .method((t) => t.disconnectEvent_CanBeEmitted)
  .add(FactAttribute);
