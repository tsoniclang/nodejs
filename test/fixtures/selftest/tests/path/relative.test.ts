import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";
import { Directory, Path } from "@tsonic/dotnet/System.IO.js";

export class RelativeTests {
  public relative_calculates_non_absolute_path(): void {
    const from = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "foo", "bar"));
    const to = Path.GetFullPath(Path.Combine(Directory.GetCurrentDirectory(), "foo", "baz"));

    const result = nodePath.relative(from, to);
    Assert.True(result.length > 0);
    Assert.True(!Path.IsPathRooted(result));
  }

  public relative_same_path_returns_empty_string(): void {
    const samePath = Path.GetFullPath("foo");
    Assert.Equal("", nodePath.relative(samePath, samePath));
  }
}

A<RelativeTests>()
  .method((t) => t.relative_calculates_non_absolute_path)
  .add(FactAttribute);
A<RelativeTests>()
  .method((t) => t.relative_same_path_returns_empty_string)
  .add(FactAttribute);
