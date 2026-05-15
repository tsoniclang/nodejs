import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, FileNotFoundException } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class statTests {
  async stat_File_ShouldReturnFileStats(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stat-test-async.txt");
      const content = "Test content";
      File.WriteAllText(filePath, content);
      const stats = await fs.stat(filePath);
      Assert.True(stats.isFile);
      Assert.False(stats.isDirectory);
      Assert.True(stats.size >= content.length);
      Assert.True(stats.IsFile());
      Assert.False(stats.IsDirectory());
    } finally {
      deleteIfExists(dir);
    }
  }

  async stat_Directory_ShouldReturnDirectoryStats(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "stat-dir-async");
      Directory.CreateDirectory(dirPath);
      const stats = await fs.stat(dirPath);
      Assert.False(stats.isFile);
      Assert.True(stats.isDirectory);
      Assert.Equal(0, stats.size);
      Assert.False(stats.IsFile());
      Assert.True(stats.IsDirectory());
    } finally {
      deleteIfExists(dir);
    }
  }

  async stat_NonExistent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-async.txt");
      const error = await assertThrowsAsync(() => fs.stat(filePath));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<statTests>().method((t) => t.stat_File_ShouldReturnFileStats).add(FactAttribute);
A<statTests>().method((t) => t.stat_Directory_ShouldReturnDirectoryStats).add(FactAttribute);
A<statTests>().method((t) => t.stat_NonExistent_ShouldThrow).add(FactAttribute);
