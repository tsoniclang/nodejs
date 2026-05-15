import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessPidPropertyTests {
  pidProperty_ValidAfterSpawn(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    Assert.True(child.pid > 0);
    Assert.True(child.pid < 2147483647); // int.MaxValue
  }
}

A<ChildProcessPidPropertyTests>()
  .method((t) => t.pidProperty_ValidAfterSpawn)
  .add(FactAttribute);
