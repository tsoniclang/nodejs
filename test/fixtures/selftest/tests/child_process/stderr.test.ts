import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/stderr.tests.cs
 */
export class ChildProcessStderrTests {
  public stderr_StderrProperty_IsAccessible(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    // stderr is null in current implementation (streams not yet implemented)
    // but property should be accessible
    const stderr = child.stderr;
    Assert.Null(stderr);
  }
}

A.on(ChildProcessStderrTests)
  .method((t) => t.stderr_StderrProperty_IsAccessible)
  .add(FactAttribute);
