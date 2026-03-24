import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class statSyncTests {
  public statSync_File_ShouldReturnFileStats(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stat-test.txt");
      File.WriteAllText(filePath, "Test content");
      const stats = fs.statSync(filePath);
      Assert.True(stats.isFile);
      Assert.False(stats.isDirectory);
      Assert.True(stats.size >= "Test content".length);
      Assert.True(stats.IsFile());
      Assert.False(stats.IsDirectory());
    } finally {
      deleteIfExists(dir);
    }
  }

  public statSync_Directory_ShouldReturnDirectoryStats(): void {
    const dir = createTempDir();
    try {
      const childDir = getTestPath(dir, "stat-dir");
      Directory.CreateDirectory(childDir);
      const stats = fs.statSync(childDir);
      Assert.False(stats.isFile);
      Assert.True(stats.isDirectory);
      Assert.Equal(0, stats.size);
      Assert.False(stats.IsFile());
      Assert.True(stats.IsDirectory());
    } finally {
      deleteIfExists(dir);
    }
  }

  public statSync_NonExistent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      assertThrows(() => fs.statSync(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public stats_Methods_ShouldWorkCorrectly(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stats-methods.txt");
      File.WriteAllText(filePath, "content");
      const stats = fs.statSync(filePath);
      Assert.True(stats.IsFile());
      Assert.False(stats.IsDirectory());
      Assert.False(stats.IsSymbolicLink());
      Assert.False(stats.IsBlockDevice());
      Assert.False(stats.IsCharacterDevice());
      Assert.False(stats.IsFIFO());
      Assert.False(stats.IsSocket());
    } finally {
      deleteIfExists(dir);
    }
  }

  public statSync_ShouldExposeUnixMillisecondTimestamps(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stats-time.txt");
      File.WriteAllText(filePath, "content");
      const stats = fs.statSync(filePath);
      Assert.True(stats.atimeMs > 0);
      Assert.True(stats.mtimeMs > 0);
      Assert.True(stats.ctimeMs > 0);
      Assert.True(stats.birthtimeMs > 0);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(statSyncTests).method((t) => t.statSync_File_ShouldReturnFileStats).add(FactAttribute);
A.on(statSyncTests).method((t) => t.statSync_Directory_ShouldReturnDirectoryStats).add(FactAttribute);
A.on(statSyncTests).method((t) => t.statSync_NonExistent_ShouldThrow).add(FactAttribute);
A.on(statSyncTests).method((t) => t.stats_Methods_ShouldWorkCorrectly).add(FactAttribute);
A.on(statSyncTests).method((t) => t.statSync_ShouldExposeUnixMillisecondTimestamps).add(FactAttribute);
