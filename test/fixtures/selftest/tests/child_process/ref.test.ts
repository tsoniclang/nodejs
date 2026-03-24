import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/ref.tests.cs
 */
export class ChildProcessRefTests {
  public ref_RefUnref_UpdatesReferencedProperty(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    // Default should be referenced
    Assert.True(child.referenced);

    // Unref should set to false
    child.unref();
    Assert.False(child.referenced);

    // Ref should set back to true
    child.ref();
    Assert.True(child.referenced);
  }
}

A.on(ChildProcessRefTests)
  .method((t) => t.ref_RefUnref_UpdatesReferencedProperty)
  .add(FactAttribute);
