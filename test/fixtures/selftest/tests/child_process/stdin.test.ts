import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessStdinTests {
  public stdin_StdinProperty_IsAccessible(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    // stdin is null in current implementation (streams not yet implemented)
    // but property should be accessible
    const stdin = child.stdin;
    Assert.Null(stdin);
  }
}

A<ChildProcessStdinTests>()
  .method((t) => t.stdin_StdinProperty_IsAccessible)
  .add(FactAttribute);
