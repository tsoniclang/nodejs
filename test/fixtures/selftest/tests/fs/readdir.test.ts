import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readdirTests {
  public async readdir_ShouldListDirectoryContents(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "read-dir-async");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file1.txt"), "content");
      File.WriteAllText(Path.Combine(dirPath, "file2.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      const files = await fs.readdir(dirPath);
      Assert.Equal(3, files.length);
      Assert.True(files.includes("file1.txt"));
      Assert.True(files.includes("file2.txt"));
      Assert.True(files.includes("subdir"));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async readdir_EmptyDirectory_ShouldReturnEmptyArray(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "empty-dir-async");
      Directory.CreateDirectory(dirPath);
      const files = await fs.readdir(dirPath);
      Assert.Equal(0, files.length);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(readdirTests).method((t) => t.readdir_ShouldListDirectoryContents).add(FactAttribute);
A.on(readdirTests).method((t) => t.readdir_EmptyDirectory_ShouldReturnEmptyArray).add(FactAttribute);
