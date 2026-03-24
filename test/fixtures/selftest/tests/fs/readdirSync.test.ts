import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readdirSyncTests {
  public readdirSync_ShouldListDirectoryContents(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "read-dir");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file1.txt"), "content");
      File.WriteAllText(Path.Combine(dirPath, "file2.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      const files = fs.readdirSync(dirPath);
      Assert.Equal(3, files.length);
      Assert.True(files.includes("file1.txt"));
      Assert.True(files.includes("file2.txt"));
      Assert.True(files.includes("subdir"));
    } finally {
      deleteIfExists(dir);
    }
  }

  public readdirSync_EmptyDirectory_ShouldReturnEmptyArray(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "empty-dir");
      Directory.CreateDirectory(dirPath);
      const files = fs.readdirSync(dirPath);
      Assert.Equal(0, files.length);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(readdirSyncTests).method((t) => t.readdirSync_ShouldListDirectoryContents).add(FactAttribute);
A.on(readdirSyncTests)
  .method((t) => t.readdirSync_EmptyDirectory_ShouldReturnEmptyArray)
  .add(FactAttribute);
