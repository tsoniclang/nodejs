import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/execFileSync.tests.cs
 */
export class ChildProcessExecFileSyncTests {
  public execFileSync_SimpleCommand_ReturnsOutput(): void {
    const file = "/bin/echo";
    const args = ["Hello"];
    const result = child_process.execFileSync(file, args);

    Assert.NotNull(result);
  }

  public execFileSync_WithStringEncoding_ReturnsString(): void {
    const file = "/bin/echo";
    const args = ["Hello"];
    const options = new ExecOptions();
    options.encoding = "utf8";
    const result = child_process.execFileSync(file, args, options);

    Assert.NotNull(result);
    // In CLR: Assert.IsType<string>(result) and Assert.Contains("Hello", (string)result)
    Assert.True(typeof result === "string");
    Assert.True((result as string).includes("Hello"));
  }
}

A<ChildProcessExecFileSyncTests>()
  .method((t) => t.execFileSync_SimpleCommand_ReturnsOutput)
  .add(FactAttribute);
A<ChildProcessExecFileSyncTests>()
  .method((t) => t.execFileSync_WithStringEncoding_ReturnsString)
  .add(FactAttribute);
