import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";
import { Path } from "@tsonic/dotnet/System.IO.js";

export class PathModuleTests {
  public separator_matches_platform_value(): void {
    Assert.Equal(Path.DirectorySeparatorChar, nodePath.sep);
  }

  public delimiter_matches_platform_value(): void {
    Assert.Equal(Path.PathSeparator, nodePath.delimiter);
  }

  public posix_and_win32_exports_exist_and_alias_the_same_namespace(): void {
    Assert.True(nodePath.posix !== undefined);
    Assert.True(nodePath.win32 !== undefined);
    Assert.True(nodePath.posix === nodePath.win32);
  }

  public path_namespace_objects_delegate_to_named_exports(): void {
    Assert.Equal("file.txt", nodePath.basename("file.txt"));
    Assert.Equal("/foo", nodePath.dirname("/foo/bar"));
    Assert.Equal(".txt", nodePath.extname("file.txt"));
    Assert.Equal(nodePath.sep, nodePath.posix.sep);
    Assert.Equal(nodePath.delimiter, nodePath.win32.delimiter);
    Assert.Equal(nodePath.basename("file.txt"), nodePath.posix.basename("file.txt"));
    Assert.Equal(nodePath.dirname("/foo/bar"), nodePath.win32.dirname("/foo/bar"));
    Assert.Equal(nodePath.extname("file.txt"), nodePath.posix.extname("file.txt"));
  }
}

A<PathModuleTests>()
  .method((t) => t.separator_matches_platform_value)
  .add(FactAttribute);
A<PathModuleTests>()
  .method((t) => t.delimiter_matches_platform_value)
  .add(FactAttribute);
A<PathModuleTests>()
  .method((t) => t.posix_and_win32_exports_exist_and_alias_the_same_namespace)
  .add(FactAttribute);
A<PathModuleTests>()
  .method((t) => t.path_namespace_objects_delegate_to_named_exports)
  .add(FactAttribute);
