import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";
import { assertThrows } from "./helpers.ts";

export class ChildProcessInvalidCommandTests {
  invalidCommand_ThrowsException(): void {
    // Invalid commands should throw when process exits with non-zero code
    const command = "exit 99";

    assertThrows(() => {
      child_process.execSync(command);
    });
  }
}

A<ChildProcessInvalidCommandTests>()
  .method((t) => t.invalidCommand_ThrowsException)
  .add(FactAttribute);
