import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class accessSyncTests {
  accessSync_ExistingFile_ShouldNotThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "access-test.txt");
      File.WriteAllText(filePath, "content");
      fs.accessSync(filePath, 0 as int);
    } finally {
      deleteIfExists(dir);
    }
  }

  accessSync_ExistingDirectory_ShouldNotThrow(): void {
    const dir = createTempDir();
    try {
      const childDir = getTestPath(dir, "access-dir");
      Directory.CreateDirectory(childDir);
      fs.accessSync(childDir, 0 as int);
    } finally {
      deleteIfExists(dir);
    }
  }

  accessSync_NonExistent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-access.txt");
      assertThrows(() => fs.accessSync(filePath, 0 as int));
    } finally {
      deleteIfExists(dir);
    }
  }

  accessSync_ReadableFile_ShouldNotThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "readable-test.txt");
      File.WriteAllText(filePath, "content");
      fs.accessSync(filePath, 4 as int);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<accessSyncTests>()
  .method((t) => t.accessSync_ExistingFile_ShouldNotThrow)
  .add(FactAttribute);
A<accessSyncTests>()
  .method((t) => t.accessSync_ExistingDirectory_ShouldNotThrow)
  .add(FactAttribute);
A<accessSyncTests>()
  .method((t) => t.accessSync_NonExistent_ShouldThrow)
  .add(FactAttribute);
A<accessSyncTests>()
  .method((t) => t.accessSync_ReadableFile_ShouldNotThrow)
  .add(FactAttribute);
