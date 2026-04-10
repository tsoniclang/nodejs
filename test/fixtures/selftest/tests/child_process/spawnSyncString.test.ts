import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ExecOptions } from "@tsonic/nodejs/child_process.js";
import * as child_process from "@tsonic/nodejs/child_process.js";

export class ChildProcessSpawnSyncStringTests {
  public spawnSyncString_ReturnsStringOutput(): void {
    const command = "echo";
    const args = ["Hello"];
    const result = child_process.spawnSyncString(command, args);

    Assert.NotNull(result);
    Assert.True(typeof result.stdout === "string");
    Assert.True(result.stdout.includes("Hello"));
  }

  public spawnSyncString_WithOptions_ReturnsStringOutput(): void {
    const command = "echo";
    const args = ["Test"];
    const options = new ExecOptions();
    options.encoding = "utf8";
    const result = child_process.spawnSyncString(command, args, options);

    Assert.True(typeof result.stdout === "string");
    Assert.True(typeof result.stderr === "string");
  }
}

A<ChildProcessSpawnSyncStringTests>()
  .method((t) => t.spawnSyncString_ReturnsStringOutput)
  .add(FactAttribute);
A<ChildProcessSpawnSyncStringTests>()
  .method((t) => t.spawnSyncString_WithOptions_ReturnsStringOutput)
  .add(FactAttribute);
