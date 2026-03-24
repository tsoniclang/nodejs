import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class cpTests {
  public async cp_File_ShouldCopyFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src-async.txt");
      const destinationPath = getTestPath(dir, "cp-dest-async.txt");
      File.WriteAllText(sourcePath, "Copy this content");
      await fs.cp(sourcePath, destinationPath);
      Assert.True(File.Exists(destinationPath));
      Assert.Equal("Copy this content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async cp_ShouldOverwriteDestination(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src2-async.txt");
      const destinationPath = getTestPath(dir, "cp-dest2-async.txt");
      File.WriteAllText(sourcePath, "New content");
      File.WriteAllText(destinationPath, "Old content");
      await fs.cp(sourcePath, destinationPath);
      Assert.Equal("New content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async cp_Directory_NonRecursive_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src-dir-async");
      const destinationPath = getTestPath(dir, "cp-dest-dir-async");
      Directory.CreateDirectory(sourcePath);
      File.WriteAllText(Path.Combine(sourcePath, "file.txt"), "content");
      await assertThrowsAsync(() => fs.cp(sourcePath, destinationPath, false));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async cp_Directory_Recursive_ShouldCopyAll(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src-tree-async");
      const destinationPath = getTestPath(dir, "cp-dest-tree-async");
      Directory.CreateDirectory(sourcePath);
      File.WriteAllText(Path.Combine(sourcePath, "file1.txt"), "content1");
      const subdir = Path.Combine(sourcePath, "subdir");
      Directory.CreateDirectory(subdir);
      File.WriteAllText(Path.Combine(subdir, "file2.txt"), "content2");
      await fs.cp(sourcePath, destinationPath, true);
      Assert.True(Directory.Exists(destinationPath));
      Assert.True(File.Exists(Path.Combine(destinationPath, "file1.txt")));
      Assert.True(Directory.Exists(Path.Combine(destinationPath, "subdir")));
      Assert.True(File.Exists(Path.Combine(destinationPath, "subdir", "file2.txt")));
      Assert.Equal("content1", File.ReadAllText(Path.Combine(destinationPath, "file1.txt")));
      Assert.Equal(
        "content2",
        File.ReadAllText(Path.Combine(destinationPath, "subdir", "file2.txt"))
      );
    } finally {
      deleteIfExists(dir);
    }
  }

  public async cp_NonExistentSource_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "nonexistent-cp-async.txt");
      const destinationPath = getTestPath(dir, "dest-async.txt");
      await assertThrowsAsync(() => fs.cp(sourcePath, destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(cpTests).method((t) => t.cp_File_ShouldCopyFile).add(FactAttribute);
A.on(cpTests).method((t) => t.cp_ShouldOverwriteDestination).add(FactAttribute);
A.on(cpTests)
  .method((t) => t.cp_Directory_NonRecursive_ShouldThrow)
  .add(FactAttribute);
A.on(cpTests)
  .method((t) => t.cp_Directory_Recursive_ShouldCopyAll)
  .add(FactAttribute);
A.on(cpTests).method((t) => t.cp_NonExistentSource_ShouldThrow).add(FactAttribute);
