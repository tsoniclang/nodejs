import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class chmodTests {
  public async chmod_ShouldChangeFilePermissions(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "chmod-test-async.txt");
      File.WriteAllText(filePath, "content");
      await fs.chmod(filePath, 0x124 as int);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async chmod_NonExistentFile_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-chmod-async.txt");
      await assertThrowsAsync(() => fs.chmod(filePath, 0x1ff as int));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async chmod_Directory_ShouldWork(): Promise<void> {
    const dir = createTempDir();
    try {
      const directoryPath = getTestPath(dir, "chmod-dir-async");
      Directory.CreateDirectory(directoryPath);
      await fs.chmod(directoryPath, 0x1ff as int);
      Assert.True(Directory.Exists(directoryPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<chmodTests>().method((t) => t.chmod_ShouldChangeFilePermissions).add(FactAttribute);
A<chmodTests>()
  .method((t) => t.chmod_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
A<chmodTests>().method((t) => t.chmod_Directory_ShouldWork).add(FactAttribute);
