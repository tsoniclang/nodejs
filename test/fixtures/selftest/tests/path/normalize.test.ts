import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { assertDoesNotContain } from "./helpers.ts";

export class NormalizeTests {
  public normalize_resolves_dot_segments(): void {
    const result = nodePath.normalize("/foo/bar/../baz");
    assertDoesNotContain("..", result);
  }

  public normalize_empty_path_returns_dot(): void {
    Assert.Equal(".", nodePath.normalize(""));
  }
}

A<NormalizeTests>()
  .method((t) => t.normalize_resolves_dot_segments)
  .add(FactAttribute);
A<NormalizeTests>()
  .method((t) => t.normalize_empty_path_returns_dot)
  .add(FactAttribute);
