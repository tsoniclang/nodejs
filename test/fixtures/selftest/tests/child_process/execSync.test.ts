import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";
import { assertThrows } from "./helpers.ts";

export class ChildProcessExecSyncTests {
  public execSync_SimpleCommand_ReturnsOutput(): void {
    const command = "echo 'Hello'";
    const result = child_process.execSync(command);

    Assert.NotNull(result);
  }

  public execSync_WithOptions_ReturnsString(): void {
    const command = "echo 'Hello'";
    const options = new ExecOptions();
    options.encoding = "utf8";
    const result = child_process.execSync(command, options);

    Assert.True(typeof result === "string");
    Assert.True((result as string).includes("Hello"));
  }

  public execSync_WithBufferEncoding_ReturnsByteArray(): void {
    const command = "echo 'Hello'";
    const options = new ExecOptions();
    options.encoding = "buffer";
    const result = child_process.execSync(command, options);

    Assert.True(typeof result === "string" || result instanceof Uint8Array);
  }

  public execSync_WithCwd_ExecutesInDirectory(): void {
    const command = "pwd";
    const options = new ExecOptions();
    options.cwd = "/tmp";
    options.encoding = "utf8";
    const result = child_process.execSync(command, options);

    Assert.True(typeof result === "string");
    // Result should contain temp directory path
  }

  public execSync_NonZeroExit_ThrowsException(): void {
    const command = "exit 1";

    assertThrows(() => {
      child_process.execSync(command);
    });
  }
}

A<ChildProcessExecSyncTests>()
  .method((t) => t.execSync_SimpleCommand_ReturnsOutput)
  .add(FactAttribute);
A<ChildProcessExecSyncTests>()
  .method((t) => t.execSync_WithOptions_ReturnsString)
  .add(FactAttribute);
A<ChildProcessExecSyncTests>()
  .method((t) => t.execSync_WithBufferEncoding_ReturnsByteArray)
  .add(FactAttribute);
A<ChildProcessExecSyncTests>()
  .method((t) => t.execSync_WithCwd_ExecutesInDirectory)
  .add(FactAttribute);
A<ChildProcessExecSyncTests>()
  .method((t) => t.execSync_NonZeroExit_ThrowsException)
  .add(FactAttribute);
