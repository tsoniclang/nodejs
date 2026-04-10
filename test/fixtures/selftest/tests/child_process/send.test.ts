import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessSendTests {
  public send_WhenNotConnected_ReturnsFalse(): void {
    const command = "echo";
    const args = ["test"];
    const child = child_process.spawn(command, args);

    const sent = child.send("test message");
    Assert.False(sent);
  }
}

A<ChildProcessSendTests>()
  .method((t) => t.send_WhenNotConnected_ReturnsFalse)
  .add(FactAttribute);
