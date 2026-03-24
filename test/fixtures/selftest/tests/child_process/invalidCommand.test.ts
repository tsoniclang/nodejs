import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";
import { assertThrows } from "./helpers.ts";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/child_process/invalidCommand.tests.cs
 */
export class ChildProcessInvalidCommandTests {
  public invalidCommand_ThrowsException(): void {
    // Invalid commands should throw when process exits with non-zero code
    const command = "exit 99";

    assertThrows(() => {
      child_process.execSync(command);
    });
  }
}

A.on(ChildProcessInvalidCommandTests)
  .method((t) => t.invalidCommand_ThrowsException)
  .add(FactAttribute);
