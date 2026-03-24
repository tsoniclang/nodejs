import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/spawnSyncReturns.tests.cs
 */
export class ChildProcessSpawnSyncReturnsTests {
  public spawnSyncReturns_AllPropertiesAccessible(): void {
    const command = "echo";
    const args = ["test"];
    const result = child_process.spawnSync(command, args);

    // Verify all properties are accessible
    Assert.True(result.pid > 0);
    Assert.NotNull(result.output);
    Assert.NotNull(result.stdout);
    Assert.NotNull(result.stderr);
    Assert.True(result.status === 0 || result.status === null);
    // signal is null for successful execution
    // error is null for successful execution
  }
}

A.on(ChildProcessSpawnSyncReturnsTests)
  .method((t) => t.spawnSyncReturns_AllPropertiesAccessible)
  .add(FactAttribute);
