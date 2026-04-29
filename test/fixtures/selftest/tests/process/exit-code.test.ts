import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessExitCodeTests {
  exitCode_is_null_by_default_when_reset(): void {
    const original = process.exitCode;

    try {
      process.exitCode = undefined;
      Assert.True(process.exitCode === undefined);
    } finally {
      process.exitCode = original;
    }
  }

  exitCode_is_settable(): void {
    const original = process.exitCode;

    try {
      process.exitCode = 42;
      Assert.Equal(42, process.exitCode);
    } finally {
      process.exitCode = original;
    }
  }

  exitCode_accepts_zero(): void {
    const original = process.exitCode;

    try {
      process.exitCode = 0;
      Assert.Equal(0, process.exitCode);
    } finally {
      process.exitCode = original;
    }
  }

  exitCode_accepts_negative_values(): void {
    const original = process.exitCode;

    try {
      process.exitCode = -1;
      Assert.Equal(-1, process.exitCode);
    } finally {
      process.exitCode = original;
    }
  }
}

A<ProcessExitCodeTests>()
  .method((t) => t.exitCode_is_null_by_default_when_reset)
  .add(FactAttribute);
A<ProcessExitCodeTests>()
  .method((t) => t.exitCode_is_settable)
  .add(FactAttribute);
A<ProcessExitCodeTests>()
  .method((t) => t.exitCode_accepts_zero)
  .add(FactAttribute);
A<ProcessExitCodeTests>()
  .method((t) => t.exitCode_accepts_negative_values)
  .add(FactAttribute);
