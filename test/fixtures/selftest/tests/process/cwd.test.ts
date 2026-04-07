import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, Path } from "@tsonic/dotnet/System.IO.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessCwdTests {
  public cwd_returns_current_directory(): void {
    const cwd = process.cwd();
    Assert.True(cwd.length > 0);
  }

  public cwd_matches_dotnet_current_directory(): void {
    const cwd = process.cwd();
    Assert.Equal(Directory.GetCurrentDirectory(), cwd);
  }

  public cwd_is_absolute(): void {
    const cwd = process.cwd();
    Assert.True(Path.IsPathRooted(cwd));
  }

  public cwd_exists(): void {
    const cwd = process.cwd();
    Assert.True(Directory.Exists(cwd));
  }
}

A<ProcessCwdTests>()
  .method((t) => t.cwd_returns_current_directory)
  .add(FactAttribute);
A<ProcessCwdTests>()
  .method((t) => t.cwd_matches_dotnet_current_directory)
  .add(FactAttribute);
A<ProcessCwdTests>()
  .method((t) => t.cwd_is_absolute)
  .add(FactAttribute);
A<ProcessCwdTests>()
  .method((t) => t.cwd_exists)
  .add(FactAttribute);
