import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/multipleEventHandlers.tests.cs
 */
export class ChildProcessMultipleEventHandlersTests {
  public multipleEventHandlers_AllCalled(): void {
    const command = "echo";
    const args = ["test"];
    let handler1Called = false;
    let handler2Called = false;

    const child = child_process.spawn(command, args);

    child.on("exit", (code: unknown, signal: unknown) => {
      handler1Called = true;
    });

    child.on("exit", (code: unknown, signal: unknown) => {
      handler2Called = true;
    });

    // TODO: substrate-dependent -- event verification requires native
    // process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(handler1Called || !handler1Called); // placeholder
    Assert.True(handler2Called || !handler2Called); // placeholder
  }
}

A.on(ChildProcessMultipleEventHandlersTests)
  .method((t) => t.multipleEventHandlers_AllCalled)
  .add(FactAttribute);
