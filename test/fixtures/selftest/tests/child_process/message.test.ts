import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/message.tests.cs
 */
export class ChildProcessMessageTests {
  public message_MessageEvent_CanBeAttached(): void {
    const command = "echo";
    const args = ["test"];

    const child = child_process.spawn(command, args);

    // Verify we can attach message event handler
    child.on("message", (message: unknown, sendHandle: unknown) => {
      // Handler attached successfully
    });

    Assert.NotNull(child);
  }
}

A.on(ChildProcessMessageTests)
  .method((t) => t.message_MessageEvent_CanBeAttached)
  .add(FactAttribute);
