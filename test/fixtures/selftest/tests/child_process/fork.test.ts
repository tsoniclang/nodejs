import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/fork.tests.cs
 */
export class ChildProcessForkTests {
  public fork_CreatesChildProcess(): void {
    // Fork needs a valid module path
    const modulePath = "/usr/bin/echo";
    const child = child_process.fork(modulePath);

    Assert.NotNull(child);
    Assert.True(child.pid > 0);
    Assert.True(child.connected); // fork sets up IPC channel

    // Kill it so test doesn't hang
    child.kill();
  }

  public fork_WithArgs_PassesArguments(): void {
    const modulePath = "/usr/bin/echo";
    const args = ["--version"];
    const child = child_process.fork(modulePath, args);

    Assert.NotNull(child);
    Assert.True(child.pid > 0);

    // Kill it so test doesn't hang
    child.kill();
  }
}

A<ChildProcessForkTests>()
  .method((t) => t.fork_CreatesChildProcess)
  .add(FactAttribute);
A<ChildProcessForkTests>()
  .method((t) => t.fork_WithArgs_PassesArguments)
  .add(FactAttribute);
