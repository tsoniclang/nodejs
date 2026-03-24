import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import {
  Directory,
  File,
  FileNotFoundException,
  Path,
} from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class renameSyncTests {
  public renameSync_File_ShouldRenameFile(): void {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "old-name.txt");
      const newPath = getTestPath(dir, "new-name.txt");
      const content = "Content";
      File.WriteAllText(oldPath, content);
      fs.renameSync(oldPath, newPath);
      Assert.False(File.Exists(oldPath));
      Assert.True(File.Exists(newPath));
      Assert.Equal(content, File.ReadAllText(newPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public renameSync_Directory_ShouldRenameDirectory(): void {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "old-dir");
      const newPath = getTestPath(dir, "new-dir");
      Directory.CreateDirectory(oldPath);
      File.WriteAllText(Path.Combine(oldPath, "file.txt"), "content");
      fs.renameSync(oldPath, newPath);
      Assert.False(Directory.Exists(oldPath));
      Assert.True(Directory.Exists(newPath));
      Assert.True(File.Exists(Path.Combine(newPath, "file.txt")));
    } finally {
      deleteIfExists(dir);
    }
  }

  public renameSync_NonExistent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const oldPath = getTestPath(dir, "nonexistent.txt");
      const newPath = getTestPath(dir, "new.txt");
      const error = assertThrows(() => fs.renameSync(oldPath, newPath));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(renameSyncTests).method((t) => t.renameSync_File_ShouldRenameFile).add(FactAttribute);
A.on(renameSyncTests)
  .method((t) => t.renameSync_Directory_ShouldRenameDirectory)
  .add(FactAttribute);
A.on(renameSyncTests).method((t) => t.renameSync_NonExistent_ShouldThrow).add(FactAttribute);
