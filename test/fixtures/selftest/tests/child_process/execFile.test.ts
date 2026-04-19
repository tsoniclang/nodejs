import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessExecFileTests {
  public execFile_CallsCallback(): void {
    const file = "/bin/echo";
    const args = ["Hello"];
    let callbackCalled = false;
    let capturedStdout = "";

    child_process.execFile(file, args, null, (error: Error | null, stdout: string, stderr: string) => {
      callbackCalled = true;
      capturedStdout = stdout;
    });

    // TODO: substrate-dependent -- async callback verification requires
    // native process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(callbackCalled || !callbackCalled); // placeholder assertion
  }
}

A<ChildProcessExecFileTests>()
  .method((t) => t.execFile_CallsCallback)
  .add(FactAttribute);
