import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, IOException, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class rmTests {
  public async rm_ShouldRemoveFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "rm-test-async.txt");
      File.WriteAllText(filePath, "content");
      await fs.rm(filePath);
      Assert.False(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async rm_ShouldRemoveEmptyDirectory(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-dir-async");
      Directory.CreateDirectory(dirPath);
      await fs.rm(dirPath);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async rm_Recursive_ShouldRemoveDirectoryWithContents(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-tree-async");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      Directory.CreateDirectory(Path.Combine(dirPath, "subdir"));
      await fs.rm(dirPath, true);
      Assert.False(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async rm_NonRecursive_DirectoryWithContents_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "rm-non-recursive-async");
      Directory.CreateDirectory(dirPath);
      File.WriteAllText(Path.Combine(dirPath, "file.txt"), "content");
      const error = await assertThrowsAsync(() => fs.rm(dirPath, false));
      Assert.True(error instanceof IOException);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async rm_NonExistent_ShouldNotThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-rm-async.txt");
      await fs.rm(filePath);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<rmTests>().method((t) => t.rm_ShouldRemoveFile).add(FactAttribute);
A<rmTests>().method((t) => t.rm_ShouldRemoveEmptyDirectory).add(FactAttribute);
A<rmTests>().method((t) => t.rm_Recursive_ShouldRemoveDirectoryWithContents).add(FactAttribute);
A<rmTests>()
  .method((t) => t.rm_NonRecursive_DirectoryWithContents_ShouldThrow)
  .add(FactAttribute);
A<rmTests>().method((t) => t.rm_NonExistent_ShouldNotThrow).add(FactAttribute);
