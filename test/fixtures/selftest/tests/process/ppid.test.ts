import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessPpidTests {
  ppid_is_non_negative(): void {
    Assert.True(process.ppid >= 0);
  }

  ppid_differs_from_pid_when_available(): void {
    if (process.ppid > 0) {
      Assert.False(process.ppid === process.pid);
    }
  }
}

A<ProcessPpidTests>().method((t) => t.ppid_is_non_negative).add(FactAttribute);
A<ProcessPpidTests>()
  .method((t) => t.ppid_differs_from_pid_when_available)
  .add(FactAttribute);
