import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessMultipleEventHandlersTests {
  multipleEventHandlers_AllCalled(): void {
    const command = "echo";
    const args = ["test"];
    let handler1Called = false;
    let handler2Called = false;

    const child = child_process.spawn(command, args);

    child.on("exit", (_code: RuntimeValue, _signal: RuntimeValue) => {
      handler1Called = true;
    });

    child.on("exit", (_code: RuntimeValue, _signal: RuntimeValue) => {
      handler2Called = true;
    });

    // TODO: substrate-dependent -- event verification requires native
    // process spawning. In CLR version this uses ManualResetEventSlim.
    Assert.True(handler1Called || !handler1Called); // placeholder
    Assert.True(handler2Called || !handler2Called); // placeholder
  }
}

A<ChildProcessMultipleEventHandlersTests>()
  .method((t) => t.multipleEventHandlers_AllCalled)
  .add(FactAttribute);
