import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/kill.tests.cs
 */
export class ChildProcessKillTests {
  public kill_ReturnsTrue(): void {
    const child = child_process.spawn("sleep", ["5"]);
    // Let it start -- in CLR version Thread.Sleep(100) is used

    const killed = child.kill();
    Assert.True(killed);
    Assert.True(child.killed);
  }

  public kill_AlreadyExited_ReturnsFalse(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    // Wait for process to complete -- in CLR version Thread.Sleep(500) is used

    // Try to kill already-exited process
    const killed = child.kill();
    Assert.False(killed);
  }
}

A.on(ChildProcessKillTests)
  .method((t) => t.kill_ReturnsTrue)
  .add(FactAttribute);
A.on(ChildProcessKillTests)
  .method((t) => t.kill_AlreadyExited_ReturnsFalse)
  .add(FactAttribute);
