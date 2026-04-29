import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { isWindows } from "./helpers.ts";

export class ToNamespacedPathTests {
  toNamespacedPath_handles_empty_path(): void {
    Assert.Equal("", nodePath.toNamespacedPath(""));
    const input = "foo/bar";
    const output = nodePath.toNamespacedPath(input);

    if (isWindows()) {
      Assert.True(output.startsWith("\\\\?\\"));
      return;
    }

    Assert.Equal(input, output);
  }
}

A<ToNamespacedPathTests>()
  .method((t) => t.toNamespacedPath_handles_empty_path)
  .add(FactAttribute);
