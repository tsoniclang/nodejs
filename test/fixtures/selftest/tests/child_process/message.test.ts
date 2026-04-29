import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessMessageTests {
  message_MessageEvent_CanBeAttached(): void {
    const command = "echo";
    const args = ["test"];

    const child = child_process.spawn(command, args);

    // Verify we can attach message event handler
    child.on("message", (_message: RuntimeValue, _sendHandle: RuntimeValue) => {
      // Handler attached successfully
    });

    Assert.NotNull(child);
  }
}

A<ChildProcessMessageTests>()
  .method((t) => t.message_MessageEvent_CanBeAttached)
  .add(FactAttribute);
