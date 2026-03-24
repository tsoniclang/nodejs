import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessVersionTests {
  public version_has_a_node_style_prefix(): void {
    Assert.True(process.version.startsWith("v"));
  }

  public version_contains_tsonic_identifier(): void {
    Assert.True(process.version.toLowerCase().includes("tsonic"));
  }
}

A.on(ProcessVersionTests)
  .method((t) => t.version_has_a_node_style_prefix)
  .add(FactAttribute);
A.on(ProcessVersionTests)
  .method((t) => t.version_contains_tsonic_identifier)
  .add(FactAttribute);
