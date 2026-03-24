import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { assertContains } from "./helpers.ts";

export class FormatTests {
  public format_builds_path_from_dir_and_base(): void {
    const result = nodePath.format(nodePath.parse("/home/user/dir/file.txt"));
    assertContains("file.txt", result);
  }

  public format_with_only_base_returns_base(): void {
    Assert.Equal("file.txt", nodePath.format(nodePath.parse("file.txt")));
  }

  public format_preserves_root_only_directory_joining(): void {
    Assert.Equal("/file.txt", nodePath.format(nodePath.parse("/file.txt")));
  }
}

A.on(FormatTests)
  .method((t) => t.format_builds_path_from_dir_and_base)
  .add(FactAttribute);
A.on(FormatTests)
  .method((t) => t.format_with_only_base_returns_base)
  .add(FactAttribute);
A.on(FormatTests)
  .method((t) => t.format_preserves_root_only_directory_joining)
  .add(FactAttribute);
