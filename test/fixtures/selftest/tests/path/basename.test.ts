import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { isWindows } from "./helpers.ts";

export class BasenameTests {
  basename_returns_file_name(): void {
    Assert.Equal("file.txt", nodePath.basename("/foo/bar/file.txt"));
    Assert.Equal("file.txt", nodePath.basename("file.txt"));

    if (isWindows()) {
      Assert.Equal("file.txt", nodePath.basename("C:\\foo\\bar\\file.txt"));
    }
  }

  basename_removes_matching_suffix(): void {
    Assert.Equal("file", nodePath.basename("/foo/bar/file.txt", ".txt"));
    Assert.Equal("file.txt", nodePath.basename("/foo/bar/file.txt", ".html"));
    Assert.Equal("index", nodePath.basename("index.html", ".html"));
  }

  basename_empty_path_returns_empty_string(): void {
    Assert.Equal("", nodePath.basename(""));
  }
}

A<BasenameTests>().method((t) => t.basename_returns_file_name).add(FactAttribute);
A<BasenameTests>()
  .method((t) => t.basename_removes_matching_suffix)
  .add(FactAttribute);
A<BasenameTests>()
  .method((t) => t.basename_empty_path_returns_empty_string)
  .add(FactAttribute);
