import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessExitTests {
  public exit_method_exists(): void {
    Assert.True(typeof process.exit === "function");
  }
}

A.on(ProcessExitTests)
  .method((t) => t.exit_method_exists)
  .add(FactAttribute);
