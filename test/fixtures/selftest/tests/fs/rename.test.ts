import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import {
  Directory,
  File,
  FileNotFoundException,
  Path,
} from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class renameTests {
  async rename_File_ShouldRenameFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "old-name-async.txt");
      const newPath = getTestPath(dir, "new-name-async.txt");
      const content = "Content";
      File.WriteAllText(oldPath, content);
      await fs.rename(oldPath, newPath);
      Assert.False(File.Exists(oldPath));
      Assert.True(File.Exists(newPath));
      Assert.Equal(content, File.ReadAllText(newPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async rename_Directory_ShouldRenameDirectory(): Promise<void> {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "old-dir-async");
      const newPath = getTestPath(dir, "new-dir-async-renamed");
      Directory.CreateDirectory(oldPath);
      File.WriteAllText(Path.Combine(oldPath, "file.txt"), "content");
      await fs.rename(oldPath, newPath);
      Assert.False(Directory.Exists(oldPath));
      Assert.True(Directory.Exists(newPath));
      Assert.True(File.Exists(Path.Combine(newPath, "file.txt")));
    } finally {
      deleteIfExists(dir);
    }
  }

  async rename_NonExistent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "nonexistent-async-rename.txt");
      const newPath = getTestPath(dir, "new-async.txt");
      const error = await assertThrowsAsync(() => fs.rename(oldPath, newPath));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<renameTests>().method((t) => t.rename_File_ShouldRenameFile).add(FactAttribute);
A<renameTests>().method((t) => t.rename_Directory_ShouldRenameDirectory).add(FactAttribute);
A<renameTests>().method((t) => t.rename_NonExistent_ShouldThrow).add(FactAttribute);
