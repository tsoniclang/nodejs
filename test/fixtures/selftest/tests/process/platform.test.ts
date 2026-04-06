import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import {
  OSPlatform,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessPlatformTests {
  public platform_returns_a_known_platform_string(): void {
    Assert.True(
      [
        "win32",
        "linux",
        "darwin",
        "freebsd",
        "openbsd",
        "sunos",
        "aix",
      ].includes(process.platform),
    );
  }

  public platform_matches_runtime_platform(): void {
    if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) {
      Assert.Equal("win32", process.platform);
      return;
    }

    if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) {
      Assert.Equal("darwin", process.platform);
      return;
    }

    if (RuntimeInformation.IsOSPlatform(OSPlatform.FreeBSD)) {
      Assert.Equal("freebsd", process.platform);
      return;
    }

    Assert.Equal("linux", process.platform);
  }
}

A<ProcessPlatformTests>()
  .method((t) => t.platform_returns_a_known_platform_string)
  .add(FactAttribute);
A<ProcessPlatformTests>()
  .method((t) => t.platform_matches_runtime_platform)
  .add(FactAttribute);
