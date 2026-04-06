import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

export class DirnameTests {
  public dirname_returns_directory_portion(): void {
    Assert.Equal("/foo/bar", nodePath.dirname("/foo/bar/baz"));
    Assert.Equal("/foo", nodePath.dirname("/foo/bar"));
    Assert.Equal(".", nodePath.dirname("file.txt"));
  }

  public dirname_empty_path_returns_dot(): void {
    Assert.Equal(".", nodePath.dirname(""));
  }
}

A<DirnameTests>()
  .method((t) => t.dirname_returns_directory_portion)
  .add(FactAttribute);
A<DirnameTests>()
  .method((t) => t.dirname_empty_path_returns_dot)
  .add(FactAttribute);
