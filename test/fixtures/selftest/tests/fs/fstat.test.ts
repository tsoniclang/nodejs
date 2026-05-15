import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class fstatTests {
  async fstat_ShouldReturnStats(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test content");
      const fd = fs.openSync(filePath, "r");
      const stats = await fs.fstat(fd);
      fs.closeSync(fd);
      Assert.True(stats.size > 0);
      Assert.True(stats.isFile);
      Assert.False(stats.isDirectory);
    } finally {
      deleteIfExists(dir);
    }
  }

  async fstat_ShouldReturnCorrectSize(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const stats = await fs.fstat(fd);
      fs.closeSync(fd);
      Assert.Equal(13, stats.size);
    } finally {
      deleteIfExists(dir);
    }
  }

  async fstat_WithInvalidDescriptor_ShouldThrow(): Promise<void> {
    await assertThrowsAsync(() => fs.fstat(999));
  }

  async fstat_EmptyFile_ShouldHaveZeroSize(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "");
      const fd = fs.openSync(filePath, "r");
      const stats = await fs.fstat(fd);
      fs.closeSync(fd);
      Assert.Equal(0, stats.size);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<fstatTests>().method((t) => t.fstat_ShouldReturnStats).add(FactAttribute);
A<fstatTests>().method((t) => t.fstat_ShouldReturnCorrectSize).add(FactAttribute);
A<fstatTests>()
  .method((t) => t.fstat_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A<fstatTests>()
  .method((t) => t.fstat_EmptyFile_ShouldHaveZeroSize)
  .add(FactAttribute);
