import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, IOException, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class rmSyncTests {
  public rmSync_ShouldRemoveFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "rm-test.txt");
      File.WriteAllText(filePath, "content");
      fs.rmSync(filePath);
      Assert.False(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public rmSync_ShouldRemoveEmptyDirectory(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-dir");
      Directory.CreateDirectory(dirPath);
      fs.rmSync(dirPath);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public rmSync_Recursive_ShouldRemoveDirectoryWithContents(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-tree");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      fs.rmSync(dirPath, true);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public rmSync_NonRecursive_DirectoryWithContents_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-non-recursive");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      const error = assertThrows(() => fs.rmSync(dirPath, false));
      Assert.True(error instanceof IOException);
    } finally {
      deleteIfExists(dir);
    }
  }

  public rmSync_NonExistent_ShouldNotThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-rm.txt");
      fs.rmSync(filePath);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(rmSyncTests).method((t) => t.rmSync_ShouldRemoveFile).add(FactAttribute);
A.on(rmSyncTests).method((t) => t.rmSync_ShouldRemoveEmptyDirectory).add(FactAttribute);
A.on(rmSyncTests).method((t) => t.rmSync_Recursive_ShouldRemoveDirectoryWithContents).add(FactAttribute);
A.on(rmSyncTests)
  .method((t) => t.rmSync_NonRecursive_DirectoryWithContents_ShouldThrow)
  .add(FactAttribute);
A.on(rmSyncTests).method((t) => t.rmSync_NonExistent_ShouldNotThrow).add(FactAttribute);
