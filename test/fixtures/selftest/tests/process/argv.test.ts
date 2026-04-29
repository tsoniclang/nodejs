import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessArgvTests {
  argv_returns_an_array(): void {
    Assert.True(process.argv !== undefined);
  }

  argv0_returns_a_string(): void {
    Assert.True(process.argv0 !== undefined);
  }

  argv_is_settable(): void {
    const original = process.argv;
    const next = ["test", "args"];

    try {
      process.argv = next;
      Assert.Equal(next.length, process.argv.length);
      Assert.Equal("test", process.argv[0]);
      Assert.Equal("args", process.argv[1]);
    } finally {
      process.argv = original;
    }
  }

  argv0_is_settable(): void {
    const original = process.argv0;

    try {
      process.argv0 = "test-executable";
      Assert.Equal("test-executable", process.argv0);
    } finally {
      process.argv0 = original;
    }
  }

  argv_handles_undefined_by_becoming_empty(): void {
    const original = process.argv;

    try {
      process.argv = undefined;
      Assert.Equal(0, process.argv.length);
    } finally {
      process.argv = original;
    }
  }

  argv0_handles_undefined_by_becoming_empty_string(): void {
    const original = process.argv0;

    try {
      process.argv0 = undefined;
      Assert.Equal("", process.argv0);
    } finally {
      process.argv0 = original;
    }
  }
}

A<ProcessArgvTests>()
  .method((t) => t.argv_returns_an_array)
  .add(FactAttribute);
A<ProcessArgvTests>()
  .method((t) => t.argv0_returns_a_string)
  .add(FactAttribute);
A<ProcessArgvTests>()
  .method((t) => t.argv_is_settable)
  .add(FactAttribute);
A<ProcessArgvTests>()
  .method((t) => t.argv0_is_settable)
  .add(FactAttribute);
A<ProcessArgvTests>()
  .method((t) => t.argv_handles_undefined_by_becoming_empty)
  .add(FactAttribute);
A<ProcessArgvTests>()
  .method((t) => t.argv0_handles_undefined_by_becoming_empty_string)
  .add(FactAttribute);
