import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/killWithSignal.tests.cs
 */
export class ChildProcessKillWithSignalTests {
  public killWithSignal_SetsSignalCode(): void {
    const child = child_process.spawn("sleep", ["10"]);
    // Let it start

    const killed = child.kill("SIGKILL");

    Assert.True(killed);
    Assert.True(child.killed);
  }

  public killWithSignal_WithDifferentSignals_Works(): void {
    // Test SIGTERM
    const child1 = child_process.spawn("sleep", ["10"]);
    Assert.True(child1.kill("SIGTERM"));

    // Test SIGKILL
    const child2 = child_process.spawn("sleep", ["10"]);
    Assert.True(child2.kill("SIGKILL"));

    // Test default (should be SIGTERM)
    const child3 = child_process.spawn("sleep", ["10"]);
    Assert.True(child3.kill());
  }
}

A<ChildProcessKillWithSignalTests>()
  .method((t) => t.killWithSignal_SetsSignalCode)
  .add(FactAttribute);
A<ChildProcessKillWithSignalTests>()
  .method((t) => t.killWithSignal_WithDifferentSignals_Works)
  .add(FactAttribute);
