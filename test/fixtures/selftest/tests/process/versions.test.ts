import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessVersionsTests {
  public versions_returns_a_valid_object(): void {
    Assert.True(process.versions !== undefined);
  }

  public versions_contains_node_version(): void {
    Assert.True(process.versions.node.length > 0);
  }

  public versions_contains_v8_version(): void {
    Assert.True(process.versions.v8.length > 0);
  }

  public versions_contains_dotnet_version(): void {
    Assert.True(process.versions.dotnet.length > 0);
  }

  public versions_contains_tsonic_version(): void {
    Assert.True(process.versions.tsonic.length > 0);
  }
}

A<ProcessVersionsTests>()
  .method((t) => t.versions_returns_a_valid_object)
  .add(FactAttribute);
A<ProcessVersionsTests>()
  .method((t) => t.versions_contains_node_version)
  .add(FactAttribute);
A<ProcessVersionsTests>()
  .method((t) => t.versions_contains_v8_version)
  .add(FactAttribute);
A<ProcessVersionsTests>()
  .method((t) => t.versions_contains_dotnet_version)
  .add(FactAttribute);
A<ProcessVersionsTests>()
  .method((t) => t.versions_contains_tsonic_version)
  .add(FactAttribute);
