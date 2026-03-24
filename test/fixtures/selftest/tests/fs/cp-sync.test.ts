import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class cpSyncTests {
  public cpSync_File_ShouldCopyFile(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src.txt");
      const destinationPath = getTestPath(dir, "cp-dest.txt");
      File.WriteAllText(sourcePath, "Copy this content");
      fs.cpSync(sourcePath, destinationPath);
      Assert.True(File.Exists(destinationPath));
      Assert.Equal("Copy this content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public cpSync_ShouldOverwriteDestination(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src2.txt");
      const destinationPath = getTestPath(dir, "cp-dest2.txt");
      File.WriteAllText(sourcePath, "New content");
      File.WriteAllText(destinationPath, "Old content");
      fs.cpSync(sourcePath, destinationPath);
      Assert.Equal("New content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public cpSync_Directory_NonRecursive_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src-dir");
      const destinationPath = getTestPath(dir, "cp-dest-dir");
      Directory.CreateDirectory(sourcePath);
      File.WriteAllText(Path.Combine(sourcePath, "file.txt"), "content");
      assertThrows(() => fs.cpSync(sourcePath, destinationPath, false));
    } finally {
      deleteIfExists(dir);
    }
  }

  public cpSync_Directory_Recursive_ShouldCopyAll(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "cp-src-tree");
      const destinationPath = getTestPath(dir, "cp-dest-tree");
      Directory.CreateDirectory(sourcePath);
      File.WriteAllText(Path.Combine(sourcePath, "file1.txt"), "content1");
      const subdir = Path.Combine(sourcePath, "subdir");
      Directory.CreateDirectory(subdir);
      File.WriteAllText(Path.Combine(subdir, "file2.txt"), "content2");
      fs.cpSync(sourcePath, destinationPath, true);
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

  public cpSync_NonExistentSource_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "nonexistent-cp.txt");
      const destinationPath = getTestPath(dir, "dest.txt");
      assertThrows(() => fs.cpSync(sourcePath, destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(cpSyncTests).method((t) => t.cpSync_File_ShouldCopyFile).add(FactAttribute);
A.on(cpSyncTests).method((t) => t.cpSync_ShouldOverwriteDestination).add(FactAttribute);
A.on(cpSyncTests)
  .method((t) => t.cpSync_Directory_NonRecursive_ShouldThrow)
  .add(FactAttribute);
A.on(cpSyncTests)
  .method((t) => t.cpSync_Directory_Recursive_ShouldCopyAll)
  .add(FactAttribute);
A.on(cpSyncTests).method((t) => t.cpSync_NonExistentSource_ShouldThrow).add(FactAttribute);
