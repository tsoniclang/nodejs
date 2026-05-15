import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessExitTests {
  exit_method_exists(): void {
    Assert.True(typeof process.exit === "function");
  }
}

A<ProcessExitTests>()
  .method((t) => t.exit_method_exists)
  .add(FactAttribute);
