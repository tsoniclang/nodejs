import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File, FileInfo } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class truncateTests {
  async truncate_ShouldTruncateFileToLength(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-test-async.txt");
      File.WriteAllText(filePath, "Hello, World!");
      await fs.truncate(filePath, 5);
      Assert.Equal("Hello", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async truncate_ZeroLength_ShouldEmptyFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-zero-async.txt");
      File.WriteAllText(filePath, "Content to remove");
      await fs.truncate(filePath, 0);
      Assert.Equal("", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async truncate_LongerLength_ShouldPadWithZeros(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-extend-async.txt");
      File.WriteAllText(filePath, "Short");
      await fs.truncate(filePath, 10);
      Assert.True(Number(new FileInfo(filePath).Length) === 10);
    } finally {
      deleteIfExists(dir);
    }
  }

  async truncate_NonExistentFile_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-truncate-async.txt");
      await assertThrowsAsync(() => fs.truncate(filePath, 0));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<truncateTests>().method((t) => t.truncate_ShouldTruncateFileToLength).add(FactAttribute);
A<truncateTests>()
  .method((t) => t.truncate_ZeroLength_ShouldEmptyFile)
  .add(FactAttribute);
A<truncateTests>()
  .method((t) => t.truncate_LongerLength_ShouldPadWithZeros)
  .add(FactAttribute);
A<truncateTests>()
  .method((t) => t.truncate_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
