import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File, FileInfo } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class truncateSyncTests {
  public truncateSync_ShouldTruncateFileToLength(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      fs.truncateSync(filePath, 5);
      Assert.Equal("Hello", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public truncateSync_ZeroLength_ShouldEmptyFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-zero.txt");
      File.WriteAllText(filePath, "Content to remove");
      fs.truncateSync(filePath, 0);
      Assert.Equal("", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public truncateSync_LongerLength_ShouldPadWithZeros(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "truncate-extend.txt");
      File.WriteAllText(filePath, "Short");
      fs.truncateSync(filePath, 10);
      Assert.True(Number(new FileInfo(filePath).Length) === 10);
    } finally {
      deleteIfExists(dir);
    }
  }

  public truncateSync_NonExistentFile_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-truncate.txt");
      assertThrows(() => fs.truncateSync(filePath, 0));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(truncateSyncTests)
  .method((t) => t.truncateSync_ShouldTruncateFileToLength)
  .add(FactAttribute);
A.on(truncateSyncTests)
  .method((t) => t.truncateSync_ZeroLength_ShouldEmptyFile)
  .add(FactAttribute);
A.on(truncateSyncTests)
  .method((t) => t.truncateSync_LongerLength_ShouldPadWithZeros)
  .add(FactAttribute);
A.on(truncateSyncTests)
  .method((t) => t.truncateSync_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
