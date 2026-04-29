import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class openTests {
  async open_WithReadFlag_ShouldOpenExistingFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test content");
      const fd = await fs.open(filePath, "r");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  async open_WithReadFlag_NonExistentFile_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      await assertThrowsAsync(() => fs.open(filePath, "r"));
    } finally {
      deleteIfExists(dir);
    }
  }

  async open_WithWriteFlag_ShouldCreateFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = await fs.open(filePath, "w");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async open_WithAppendFlag_ShouldCreateFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = await fs.open(filePath, "a");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async open_WithReadPlusFlag_ShouldOpenForReadWrite(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = await fs.open(filePath, "r+");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  async open_WithExclusiveWriteFlag_ExistingFile_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      await assertThrowsAsync(() => fs.open(filePath, "wx"));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<openTests>().method((t) => t.open_WithReadFlag_ShouldOpenExistingFile).add(FactAttribute);
A<openTests>()
  .method((t) => t.open_WithReadFlag_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
A<openTests>().method((t) => t.open_WithWriteFlag_ShouldCreateFile).add(FactAttribute);
A<openTests>().method((t) => t.open_WithAppendFlag_ShouldCreateFile).add(FactAttribute);
A<openTests>()
  .method((t) => t.open_WithReadPlusFlag_ShouldOpenForReadWrite)
  .add(FactAttribute);
A<openTests>()
  .method((t) => t.open_WithExclusiveWriteFlag_ExistingFile_ShouldThrow)
  .add(FactAttribute);
