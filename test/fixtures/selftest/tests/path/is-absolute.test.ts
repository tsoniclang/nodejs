import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { isPosix } from "./helpers.ts";

export class IsAbsoluteTests {
  public isAbsolute_detects_platform_paths(): void {
    if (isPosix()) {
      Assert.True(nodePath.isAbsolute("/foo/bar"));
      Assert.True(!nodePath.isAbsolute("foo/bar"));
      Assert.True(!nodePath.isAbsolute("./foo"));
      return;
    }

    Assert.True(nodePath.isAbsolute("C:\\foo\\bar"));
    Assert.True(!nodePath.isAbsolute("foo\\bar"));
    Assert.True(!nodePath.isAbsolute(".\\foo"));
  }

  public isAbsolute_empty_path_returns_false(): void {
    Assert.True(!nodePath.isAbsolute(""));
  }
}

A.on(IsAbsoluteTests)
  .method((t) => t.isAbsolute_detects_platform_paths)
  .add(FactAttribute);
A.on(IsAbsoluteTests)
  .method((t) => t.isAbsolute_empty_path_returns_false)
  .add(FactAttribute);
