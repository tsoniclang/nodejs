import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class rmdirTests {
  async rmdir_ShouldRemoveEmptyDirectory(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "remove-dir-async");
      Directory.CreateDirectory(dirPath);
      await fs.rmdir(dirPath);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async rmdir_Recursive_ShouldRemoveDirectoryWithContents(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "remove-tree-async");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      await fs.rmdir(dirPath, true);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<rmdirTests>().method((t) => t.rmdir_ShouldRemoveEmptyDirectory).add(FactAttribute);
A<rmdirTests>().method((t) => t.rmdir_Recursive_ShouldRemoveDirectoryWithContents).add(FactAttribute);
