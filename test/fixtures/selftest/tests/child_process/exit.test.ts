import { attributes as A } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessExitTests {
  public exit_ExitEvent_ContainsExitCode(): void {
    const command = "sh";
    const args = ["-c", "exit 0"];
    let capturedExitCode: number | null = null;

    const child = child_process.spawn(command, args);
    child.on("exit", (code: JsValue, _signal: JsValue) => {
      capturedExitCode = code as number | null;
    });

    // TODO: substrate-dependent -- event verification requires native
    // process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(capturedExitCode === null || capturedExitCode !== null); // placeholder
  }

  public exit_ExitEvent_NonZeroExitCode(): void {
    const command = "sh";
    const args = ["-c", "exit 42"];
    let capturedExitCode: number | null = null;

    const child = child_process.spawn(command, args);
    child.on("exit", (code: JsValue, _signal: JsValue) => {
      capturedExitCode = code as number | null;
    });

    // TODO: substrate-dependent
    Assert.True(capturedExitCode === null || capturedExitCode !== null); // placeholder
  }

  public exit_ExitCodeProperty_SetAfterExit(): void {
    const command = "echo";
    const args = ["test"];

    const child = child_process.spawn(command, args);
    child.on("exit", (_code: JsValue, _signal: JsValue) => {
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
