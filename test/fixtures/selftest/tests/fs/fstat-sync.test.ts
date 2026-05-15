import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class fstatSyncTests {
  fstatSync_ShouldReturnStats(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test content");
      const fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      fs.closeSync(fd);
      Assert.True(stats.size > 0);
      Assert.True(stats.isFile);
      Assert.False(stats.isDirectory);
    } finally {
      deleteIfExists(dir);
    }
  }

  fstatSync_ShouldReturnCorrectSize(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      fs.closeSync(fd);
      Assert.Equal(13, stats.size);
    } finally {
      deleteIfExists(dir);
    }
  }

  fstatSync_ShouldHaveValidTimestamps(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      fs.closeSync(fd);
      Assert.True(stats.atime.getTime() > 0);
      Assert.True(stats.mtime.getTime() > 0);
      Assert.True(stats.ctime.getTime() > 0);
      Assert.True(stats.birthtime.getTime() > 0);
      Assert.True(stats.atimeMs > 0);
      Assert.True(stats.mtimeMs > 0);
      Assert.True(stats.ctimeMs > 0);
      Assert.True(stats.birthtimeMs > 0);
      Assert.True(Number(stats.atime.getTime()) === stats.atimeMs);
      Assert.True(Number(stats.mtime.getTime()) === stats.mtimeMs);
    } finally {
      deleteIfExists(dir);
    }
  }

  fstatSync_WithInvalidDescriptor_ShouldThrow(): void {
    assertThrows(() => fs.fstatSync(999));
  }

  fstatSync_AfterWrite_ShouldReflectNewSize(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      let fd = fs.openSync(filePath, "w");
      fs.writeSync(fd, "Hello", null);
      fs.closeSync(fd);
      fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      fs.closeSync(fd);
      Assert.Equal(5, stats.size);
    } finally {
      deleteIfExists(dir);
    }
  }

  fstatSync_EmptyFile_ShouldHaveZeroSize(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "");
      const fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      fs.closeSync(fd);
      Assert.Equal(0, stats.size);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<fstatSyncTests>().method((t) => t.fstatSync_ShouldReturnStats).add(FactAttribute);
A<fstatSyncTests>()
  .method((t) => t.fstatSync_ShouldReturnCorrectSize)
  .add(FactAttribute);
A<fstatSyncTests>()
  .method((t) => t.fstatSync_ShouldHaveValidTimestamps)
  .add(FactAttribute);
A<fstatSyncTests>()
  .method((t) => t.fstatSync_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A<fstatSyncTests>()
  .method((t) => t.fstatSync_AfterWrite_ShouldReflectNewSize)
  .add(FactAttribute);
A<fstatSyncTests>()
  .method((t) => t.fstatSync_EmptyFile_ShouldHaveZeroSize)
  .add(FactAttribute);
