import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import {
  Directory,
  File,
  FileNotFoundException,
} from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class accessTests {
  async access_ExistingFile_ShouldNotThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "access-test-async.txt");
      File.WriteAllText(filePath, "content");
      await fs.access(filePath, 0 as int);
    } finally {
      deleteIfExists(dir);
    }
  }

  async access_ExistingDirectory_ShouldNotThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "access-dir-async");
      Directory.CreateDirectory(dirPath);
      await fs.access(dirPath, 0 as int);
    } finally {
      deleteIfExists(dir);
    }
  }

  async access_NonExistent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-access-async.txt");
      const error = await assertThrowsAsync(() => fs.access(filePath, 0 as int));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  async access_ReadableFile_ShouldNotThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "readable-test-async.txt");
      File.WriteAllText(filePath, "content");
      await fs.access(filePath, 4 as int);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<accessTests>().method((t) => t.access_ExistingFile_ShouldNotThrow).add(FactAttribute);
A<accessTests>().method((t) => t.access_ExistingDirectory_ShouldNotThrow).add(FactAttribute);
A<accessTests>().method((t) => t.access_NonExistent_ShouldThrow).add(FactAttribute);
A<accessTests>().method((t) => t.access_ReadableFile_ShouldNotThrow).add(FactAttribute);
