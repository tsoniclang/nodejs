import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessSpawnSyncTests {
  spawnSync_SimpleCommand_ReturnsResult(): void {
    const command = "echo";
    const args = ["Hello"];
    const result = child_process.spawnSync(command, args);

    Assert.NotNull(result);
    Assert.True(result.status === 0 || result.status === null);
    Assert.NotNull(result.stdout);
  }

  spawnSync_HasPid(): void {
    const command = "echo";
    const args = ["test"];
    const result = child_process.spawnSync(command, args);

    Assert.True(result.pid > 0);
  }

  spawnSync_WithInvalidCommand_SetsError(): void {
    const result = child_process.spawnSync("nonexistent_command_xyz");

    Assert.NotNull(result.error);
  }

  spawnSync_OutputArray_ContainsStdoutStderr(): void {
    const command = "echo";
    const args = ["test"];
    const result = child_process.spawnSync(command, args);

    Assert.NotNull(result.output);
    Assert.True(result.output.length >= 3);
    // output[0] is null (stdin), output[1] is stdout, output[2] is stderr
  }
}

A<ChildProcessSpawnSyncTests>()
  .method((t) => t.spawnSync_SimpleCommand_ReturnsResult)
  .add(FactAttribute);
A<ChildProcessSpawnSyncTests>()
  .method((t) => t.spawnSync_HasPid)
  .add(FactAttribute);
A<ChildProcessSpawnSyncTests>()
  .method((t) => t.spawnSync_WithInvalidCommand_SetsError)
  .add(FactAttribute);
A<ChildProcessSpawnSyncTests>()
  .method((t) => t.spawnSync_OutputArray_ContainsStdoutStderr)
  .add(FactAttribute);
