import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/spawnSync.tests.cs
 */
export class ChildProcessSpawnSyncTests {
  public spawnSync_SimpleCommand_ReturnsResult(): void {
    const command = "echo";
    const args = ["Hello"];
    const result = child_process.spawnSync(command, args);

    Assert.NotNull(result);
    Assert.True(result.status === 0 || result.status === null);
    Assert.NotNull(result.stdout);
  }

  public spawnSync_HasPid(): void {
    const command = "echo";
    const args = ["test"];
    const result = child_process.spawnSync(command, args);

    Assert.True(result.pid > 0);
  }

  public spawnSync_WithInvalidCommand_SetsError(): void {
    const result = child_process.spawnSync("nonexistent_command_xyz");

    Assert.NotNull(result.error);
  }

  public spawnSync_OutputArray_ContainsStdoutStderr(): void {
    const command = "echo";
    const args = ["test"];
    const result = child_process.spawnSync(command, args);

    Assert.NotNull(result.output);
    Assert.True(result.output.length >= 3);
    // output[0] is null (stdin), output[1] is stdout, output[2] is stderr
  }
}

A.on(ChildProcessSpawnSyncTests)
  .method((t) => t.spawnSync_SimpleCommand_ReturnsResult)
  .add(FactAttribute);
A.on(ChildProcessSpawnSyncTests)
  .method((t) => t.spawnSync_HasPid)
  .add(FactAttribute);
A.on(ChildProcessSpawnSyncTests)
  .method((t) => t.spawnSync_WithInvalidCommand_SetsError)
  .add(FactAttribute);
A.on(ChildProcessSpawnSyncTests)
  .method((t) => t.spawnSync_OutputArray_ContainsStdoutStderr)
  .add(FactAttribute);
