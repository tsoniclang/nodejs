import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class openSyncTests {
  public openSync_WithReadFlag_ShouldOpenExistingFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test content");
      const fd = fs.openSync(filePath, "r");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithReadFlag_NonExistentFile_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      assertThrows(() => fs.openSync(filePath, "r"));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithWriteFlag_ShouldCreateFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithWriteFlag_ShouldTruncateExistingFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "original content");
      const fd = fs.openSync(filePath, "w");
      fs.closeSync(fd);
      Assert.Equal("", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithAppendFlag_ShouldCreateFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "a");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithReadPlusFlag_ShouldOpenForReadWrite(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r+");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithWritePlusFlag_ShouldCreateForReadWrite(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w+");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithAppendPlusFlag_ShouldOpenForReadWriteAppend(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "seed");
      const fd = fs.openSync(filePath, "a+");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithExclusiveWriteFlag_ShouldCreateNewFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "wx");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithExclusiveWriteFlag_ExistingFile_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      assertThrows(() => fs.openSync(filePath, "wx"));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_WithEmptyPath_ShouldThrow(): void {
    assertThrows(() => fs.openSync("", "r"));
  }

  public openSync_WithInvalidFlags_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      assertThrows(() => fs.openSync(filePath, "invalid"));
    } finally {
      deleteIfExists(dir);
    }
  }

  public openSync_MultipleFiles_ShouldReturnDifferentDescriptors(): void {
    const dir = createTempDir();
    try {
      const filePath1 = getTestPath(dir, "test.txt");
      const filePath2 = getTestPath(dir, "test2.txt");
      File.WriteAllText(filePath1, "test");
      File.WriteAllText(filePath2, "test2");
      const fd1 = fs.openSync(filePath1, "r");
      const fd2 = fs.openSync(filePath2, "r");
      Assert.NotEqual(fd1, fd2);
      fs.closeSync(fd1);
      fs.closeSync(fd2);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(openSyncTests)
  .method((t) => t.openSync_WithReadFlag_ShouldOpenExistingFile)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithReadFlag_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithWriteFlag_ShouldCreateFile)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithWriteFlag_ShouldTruncateExistingFile)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithAppendFlag_ShouldCreateFile)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithReadPlusFlag_ShouldOpenForReadWrite)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithWritePlusFlag_ShouldCreateForReadWrite)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithAppendPlusFlag_ShouldOpenForReadWriteAppend)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithExclusiveWriteFlag_ShouldCreateNewFile)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithExclusiveWriteFlag_ExistingFile_ShouldThrow)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithEmptyPath_ShouldThrow)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_WithInvalidFlags_ShouldThrow)
  .add(FactAttribute);
A.on(openSyncTests)
  .method((t) => t.openSync_MultipleFiles_ShouldReturnDifferentDescriptors)
  .add(FactAttribute);
