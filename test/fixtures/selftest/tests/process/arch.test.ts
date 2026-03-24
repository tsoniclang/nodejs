import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import {
  Architecture,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessArchTests {
  public arch_returns_known_name(): void {
    const valid = ["x64", "ia32", "arm", "arm64", "wasm", "s390x"];
    Assert.True(valid.includes(process.arch));
  }

  public arch_matches_runtime_architecture(): void {
    const expected =
      RuntimeInformation.ProcessArchitecture === Architecture.X64
        ? "x64"
        : RuntimeInformation.ProcessArchitecture === Architecture.X86
          ? "ia32"
          : RuntimeInformation.ProcessArchitecture === Architecture.Arm
            ? "arm"
            : RuntimeInformation.ProcessArchitecture === Architecture.Arm64
              ? "arm64"
              : RuntimeInformation.ProcessArchitecture === Architecture.Wasm
                  ? "wasm"
                  : RuntimeInformation.ProcessArchitecture === Architecture.S390x
                    ? "s390x"
                    : RuntimeInformation.ProcessArchitecture.toString().toLowerCase();

    Assert.Equal(expected, process.arch);
  }
}

A.on(ProcessArchTests).method((t) => t.arch_returns_known_name).add(FactAttribute);
A.on(ProcessArchTests)
  .method((t) => t.arch_matches_runtime_architecture)
  .add(FactAttribute);
