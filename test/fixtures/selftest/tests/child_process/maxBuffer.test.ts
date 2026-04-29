import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessMaxBufferTests {
  maxBuffer_RespectedInOptions(): void {
    const command = "echo 'test'";
    const options = new ExecOptions();
    options.encoding = "utf8";
    options.maxBuffer = 1024 * 10; // 10KB
    const result = child_process.execSync(command, options);

    Assert.NotNull(result);
    Assert.True(typeof result === "string");
  }
}

A<ChildProcessMaxBufferTests>()
  .method((t) => t.maxBuffer_RespectedInOptions)
  .add(FactAttribute);
