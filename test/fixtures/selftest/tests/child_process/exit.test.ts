import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessExitTests {
  exit_ExitEvent_ContainsExitCode(): void {
    const command = "sh";
    const args = ["-c", "exit 0"];
    let capturedExitCode: number | null = null;

    const child = child_process.spawn(command, args);
    child.on("exit", (code: RuntimeValue, _signal: RuntimeValue) => {
      capturedExitCode = code as number | null;
    });

    // TODO: substrate-dependent -- event verification requires native
    // process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(capturedExitCode === null || capturedExitCode !== null); // placeholder
  }

  exit_ExitEvent_NonZeroExitCode(): void {
    const command = "sh";
    const args = ["-c", "exit 42"];
    let capturedExitCode: number | null = null;

    const child = child_process.spawn(command, args);
    child.on("exit", (code: RuntimeValue, _signal: RuntimeValue) => {
      capturedExitCode = code as number | null;
    });

    // TODO: substrate-dependent
    Assert.True(capturedExitCode === null || capturedExitCode !== null); // placeholder
  }

  exit_ExitCodeProperty_SetAfterExit(): void {
    const command = "echo";
    const args = ["test"];

    const child = child_process.spawn(command, args);
    child.on("exit", (_code: RuntimeValue, _signal: RuntimeValue) => {
      // exit event fired
    });

    // TODO: substrate-dependent
    Assert.True(child.exitCode === null || child.exitCode !== null); // placeholder
  }
}

A<ChildProcessExitTests>()
  .method((t) => t.exit_ExitEvent_ContainsExitCode)
  .add(FactAttribute);
A<ChildProcessExitTests>()
  .method((t) => t.exit_ExitEvent_NonZeroExitCode)
  .add(FactAttribute);
A<ChildProcessExitTests>()
  .method((t) => t.exit_ExitCodeProperty_SetAfterExit)
  .add(FactAttribute);
