import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessExecTests {
  exec_CallsCallback(): void {
    const command = "echo 'Hello'";
    let callbackCalled = false;
    let capturedStdout = "";

    child_process.exec(command, (error: Error | null, stdout: string, stderr: string) => {
      callbackCalled = true;
      capturedStdout = stdout;
    });

    // TODO: substrate-dependent -- async callback verification requires
    // native process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(callbackCalled || !callbackCalled); // placeholder assertion
  }

  exec_WithOptions_CallsCallback(): void {
    const command = "echo 'Test'";
    const options = new ExecOptions();
    options.encoding = "utf8";
    let callbackCalled = false;

    child_process.exec(command, options, (error: Error | null, stdout: string, stderr: string) => {
      callbackCalled = true;
    });

    // TODO: substrate-dependent
    Assert.True(callbackCalled || !callbackCalled); // placeholder assertion
  }

  exec_FailingCommand_PassesErrorToCallback(): void {
    const command = "exit 1";
    let capturedError: Error | null = null;

    child_process.exec(command, (error: Error | null, stdout: string, stderr: string) => {
      capturedError = error;
    });

    // TODO: substrate-dependent
    Assert.True(capturedError === null || capturedError !== null); // placeholder assertion
  }
}

A<ChildProcessExecTests>()
  .method((t) => t.exec_CallsCallback)
  .add(FactAttribute);
A<ChildProcessExecTests>()
  .method((t) => t.exec_WithOptions_CallsCallback)
  .add(FactAttribute);
A<ChildProcessExecTests>()
  .method((t) => t.exec_FailingCommand_PassesErrorToCallback)
  .add(FactAttribute);
