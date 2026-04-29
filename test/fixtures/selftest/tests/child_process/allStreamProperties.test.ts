import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessAllStreamPropertiesTests {
  allStreamProperties_AreNull(): void {
    const child = child_process.spawn("echo", ["test"]);

    // All stream properties should be null (streams not yet implemented)
    Assert.Null(child.stdin);
    Assert.Null(child.stdout);
    Assert.Null(child.stderr);
  }
}

A<ChildProcessAllStreamPropertiesTests>()
  .method((t) => t.allStreamProperties_AreNull)
  .add(FactAttribute);
