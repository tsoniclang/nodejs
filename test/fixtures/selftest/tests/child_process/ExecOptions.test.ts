import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";
import { assertThrows } from "./helpers.ts";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/ExecOptions.tests.cs
 */
export class ChildProcessExecOptionsTests {
  public ExecOptions_WithEnvVariables_PassesEnvironment(): void {
    const command = "echo $TEST_VAR";
    const options = new ExecOptions();
    options.encoding = "utf8";
    options.env = { TEST_VAR: "test_value" };
    const result = child_process.execSync(command, options);

    Assert.NotNull(result);
    Assert.True(typeof result === "string");
    Assert.True((result as string).includes("test_value"));
  }

  public ExecOptions_WithTimeout_TerminatesProcess(): void {
    const command = "sleep 10";
    const options = new ExecOptions();
    options.timeout = 100; // 100ms timeout

    // TODO: substrate-dependent -- timeout handling requires native process spawning
    assertThrows(() => {
      child_process.execSync(command, options);
    });
  }

  public ExecOptions_WithTimeout_SetsSignal(): void {
    const command = "sleep";
    const args = ["10"];
    const options = new ExecOptions();
    options.timeout = 100; // 100ms timeout
    const result = child_process.spawnSync(command, args, options);

    Assert.NotNull(result.signal);
    Assert.Equal("SIGTERM", result.signal!);
    Assert.NotNull(result.error);
  }

  public ExecOptions_AllProperties_CanBeSet(): void {
    const options = new ExecOptions();
    options.cwd = "/tmp";
    options.env = { TEST: "value" };
    options.encoding = "utf8";
    options.shell = "/bin/sh";
    options.timeout = 1000;
    options.maxBuffer = 2048;
    options.killSignal = "SIGKILL";
    options.windowsHide = true;
    options.windowsVerbatimArguments = false;
    options.detached = false;
    options.uid = 1000;
    options.gid = 1000;
    options.argv0 = "test";
    options.stdio = "pipe";
    options.input = "test input";

    Assert.Equal("/tmp", options.cwd);
    Assert.NotNull(options.env);
    Assert.Equal("utf8", options.encoding);
    Assert.Equal("/bin/sh", options.shell);
    Assert.Equal(1000, options.timeout);
    Assert.Equal(2048, options.maxBuffer);
    Assert.Equal("SIGKILL", options.killSignal);
    Assert.True(options.windowsHide);
    Assert.False(options.windowsVerbatimArguments);
    Assert.False(options.detached);
    Assert.Equal(1000, options.uid!);
    Assert.Equal(1000, options.gid!);
    Assert.Equal("test", options.argv0);
    Assert.Equal("pipe", options.stdio);
    Assert.Equal("test input", options.input);
  }

  public ExecOptions_WithMaxBuffer_RespectedInOptions(): void {
    const command = "echo 'test'";
    const options = new ExecOptions();
    options.encoding = "utf8";
    options.maxBuffer = 1024 * 10; // 10KB
    const result = child_process.execSync(command, options);

    Assert.NotNull(result);
    Assert.True(typeof result === "string");
  }
}

A.on(ChildProcessExecOptionsTests)
  .method((t) => t.ExecOptions_WithEnvVariables_PassesEnvironment)
  .add(FactAttribute);
A.on(ChildProcessExecOptionsTests)
  .method((t) => t.ExecOptions_WithTimeout_TerminatesProcess)
  .add(FactAttribute);
A.on(ChildProcessExecOptionsTests)
  .method((t) => t.ExecOptions_WithTimeout_SetsSignal)
  .add(FactAttribute);
A.on(ChildProcessExecOptionsTests)
  .method((t) => t.ExecOptions_AllProperties_CanBeSet)
  .add(FactAttribute);
A.on(ChildProcessExecOptionsTests)
  .method((t) => t.ExecOptions_WithMaxBuffer_RespectedInOptions)
  .add(FactAttribute);
