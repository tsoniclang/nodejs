import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/stdout.tests.cs
 */
export class ChildProcessStdoutTests {
  public stdout_StdoutProperty_IsAccessible(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    // stdout is null in current implementation (streams not yet implemented)
    // but property should be accessible
    const stdout = child.stdout;
    Assert.Null(stdout);
  }
}

A.on(ChildProcessStdoutTests)
  .method((t) => t.stdout_StdoutProperty_IsAccessible)
  .add(FactAttribute);
