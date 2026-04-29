import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";
import { Directory } from "@tsonic/dotnet/System.IO.js";

import { assertContains } from "./helpers.ts";

export class ResolveTests {
  resolve_returns_absolute_path(): void {
    const result = nodePath.resolve("foo", "bar");
    Assert.True(nodePath.isAbsolute(result));
    assertContains("foo", result);
    assertContains("bar", result);
  }

  resolve_empty_segments_return_current_directory(): void {
    Assert.Equal(Directory.GetCurrentDirectory(), nodePath.resolve());
    Assert.Equal(Directory.GetCurrentDirectory(), nodePath.resolve("", ""));
  }
}

A<ResolveTests>()
  .method((t) => t.resolve_returns_absolute_path)
  .add(FactAttribute);
A<ResolveTests>()
  .method((t) => t.resolve_empty_segments_return_current_directory)
  .add(FactAttribute);
