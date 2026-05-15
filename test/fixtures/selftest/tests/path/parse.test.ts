import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

export class ParseTests {
  parse_returns_components(): void {
    const result = nodePath.parse("/home/user/dir/file.txt");

    Assert.Equal("file.txt", result.base);
    Assert.Equal(".txt", result.ext);
    Assert.Equal("file", result.name);
    Assert.True(result.dir.length > 0);
  }

  parse_empty_path_returns_empty_components(): void {
    const result = nodePath.parse("");

    Assert.Equal("", result.root);
    Assert.Equal("", result.dir);
    Assert.Equal("", result.base);
    Assert.Equal("", result.ext);
    Assert.Equal("", result.name);
  }
}

A<ParseTests>().method((t) => t.parse_returns_components).add(FactAttribute);
A<ParseTests>()
  .method((t) => t.parse_empty_path_returns_empty_components)
  .add(FactAttribute);
