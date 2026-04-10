import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessNoArgsTests {
  public noArgs_SpawnSync_Works(): void {
    const command = "pwd";
    const result = child_process.spawnSync(command);

    Assert.NotNull(result);
    Assert.True(result.pid > 0);
  }

  public noArgs_ExecFileSync_Works(): void {
    const file = "/bin/pwd";
    const result = child_process.execFileSync(file);

    Assert.NotNull(result);
  }
}

A<ChildProcessNoArgsTests>()
  .method((t) => t.noArgs_SpawnSync_Works)
  .add(FactAttribute);
A<ChildProcessNoArgsTests>()
  .method((t) => t.noArgs_ExecFileSync_Works)
  .add(FactAttribute);
