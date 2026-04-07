import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class rmdirSyncTests {
  public rmdirSync_ShouldRemoveEmptyDirectory(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "remove-dir");
      Directory.CreateDirectory(dirPath);
      fs.rmdirSync(dirPath);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public rmdirSync_Recursive_ShouldRemoveDirectoryWithContents(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "remove-tree");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      fs.rmdirSync(dirPath, true);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<rmdirSyncTests>().method((t) => t.rmdirSync_ShouldRemoveEmptyDirectory).add(FactAttribute);
A<rmdirSyncTests>()
  .method((t) => t.rmdirSync_Recursive_ShouldRemoveDirectoryWithContents)
  .add(FactAttribute);
