import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/connected.tests.cs
 */
export class ChildProcessConnectedTests {
  public connected_InitiallyFalse(): void {
    const child = child_process.spawn("echo", ["test"]);

    // Connected is for IPC, which spawn doesn't set up
    Assert.False(child.connected);
  }
}

A<ChildProcessConnectedTests>()
  .method((t) => t.connected_InitiallyFalse)
  .add(FactAttribute);
