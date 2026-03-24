import { attributes as A } from "@tsonic/core/lang.js";
import type { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class chmodSyncTests {
  public chmodSync_ShouldChangeFilePermissions(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "chmod-test.txt");
      File.WriteAllText(filePath, "content");
      fs.chmodSync(filePath, 0x124 as int);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public chmodSync_NonExistentFile_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-chmod.txt");
      assertThrows(() => fs.chmodSync(filePath, 0x1ff as int));
    } finally {
      deleteIfExists(dir);
    }
  }

  public chmodSync_Directory_ShouldWork(): void {
    const dir = createTempDir();
    try {
      const directoryPath = getTestPath(dir, "chmod-dir");
      Directory.CreateDirectory(directoryPath);
      fs.chmodSync(directoryPath, 0x1ff as int);
      Assert.True(Directory.Exists(directoryPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(chmodSyncTests)
  .method((t) => t.chmodSync_ShouldChangeFilePermissions)
  .add(FactAttribute);
A.on(chmodSyncTests)
  .method((t) => t.chmodSync_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
A.on(chmodSyncTests).method((t) => t.chmodSync_Directory_ShouldWork).add(FactAttribute);
