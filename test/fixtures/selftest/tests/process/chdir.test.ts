import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, Path } from "@tsonic/dotnet/System.IO.js";

import { process } from "@tsonic/nodejs/process.js";

import { assertThrows, createTempDir, deleteIfExists } from "./helpers.ts";

export class ProcessChdirTests {
  chdir_changes_current_directory(): void {
    const original = Directory.GetCurrentDirectory();
    const target = createTempDir();

    try {
      process.chdir(target);
      Assert.Equal(target, process.cwd());
    } finally {
      Directory.SetCurrentDirectory(original);
      deleteIfExists(target);
    }
  }

  chdir_updates_dotnet_current_directory(): void {
    const original = Directory.GetCurrentDirectory();
    const target = createTempDir();

    try {
      process.chdir(target);
      Assert.Equal(target, Directory.GetCurrentDirectory());
    } finally {
      Directory.SetCurrentDirectory(original);
      deleteIfExists(target);
    }
  }

  chdir_supports_relative_paths(): void {
    const original = Directory.GetCurrentDirectory();
    const target = createTempDir();
    const child = Path.Combine(target, "subdir");
    Directory.CreateDirectory(child);

    try {
      process.chdir(target);
      process.chdir("subdir");
      Assert.Equal(child, process.cwd());
    } finally {
      Directory.SetCurrentDirectory(original);
      deleteIfExists(target);
    }
  }

  chdir_rejects_missing_directory(): void {
    assertThrows(() => process.chdir(undefined as never));
  }

  chdir_rejects_empty_directory(): void {
    assertThrows(() => process.chdir(""));
  }

  chdir_rejects_non_existent_directory(): void {
    assertThrows(() =>
      process.chdir(Path.Combine(Path.GetTempPath(), "does-not-exist-nodejs-next"))
    );
  }
}

A<ProcessChdirTests>()
  .method((t) => t.chdir_changes_current_directory)
  .add(FactAttribute);
A<ProcessChdirTests>()
  .method((t) => t.chdir_updates_dotnet_current_directory)
  .add(FactAttribute);
A<ProcessChdirTests>()
  .method((t) => t.chdir_supports_relative_paths)
  .add(FactAttribute);
A<ProcessChdirTests>()
  .method((t) => t.chdir_rejects_missing_directory)
  .add(FactAttribute);
A<ProcessChdirTests>()
  .method((t) => t.chdir_rejects_empty_directory)
  .add(FactAttribute);
A<ProcessChdirTests>()
  .method((t) => t.chdir_rejects_non_existent_directory)
  .add(FactAttribute);
