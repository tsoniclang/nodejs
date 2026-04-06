import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Path } from "@tsonic/dotnet/System.IO.js";

import { process } from "@tsonic/nodejs/process.js";

import { assertFileExists } from "./helpers.ts";

export class ProcessExecPathTests {
  public execPath_is_non_empty(): void {
    Assert.True(process.execPath.length > 0);
  }

  public execPath_is_absolute(): void {
    Assert.True(Path.IsPathRooted(process.execPath));
  }

  public execPath_points_to_an_existing_file(): void {
    assertFileExists(process.execPath);
  }
}

A<ProcessExecPathTests>()
  .method((t) => t.execPath_is_non_empty)
  .add(FactAttribute);
A<ProcessExecPathTests>()
  .method((t) => t.execPath_is_absolute)
  .add(FactAttribute);
A<ProcessExecPathTests>()
  .method((t) => t.execPath_points_to_an_existing_file)
  .add(FactAttribute);
