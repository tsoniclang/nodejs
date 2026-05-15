import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class unlinkSyncTests {
  unlinkSync_ShouldDeleteFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "delete-test.txt");
      File.WriteAllText(filePath, "content");
      fs.unlinkSync(filePath);
      Assert.False(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  unlinkSync_NonExistentFile_ShouldNotThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      fs.unlinkSync(filePath);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<unlinkSyncTests>().method((t) => t.unlinkSync_ShouldDeleteFile).add(FactAttribute);
A<unlinkSyncTests>().method((t) => t.unlinkSync_NonExistentFile_ShouldNotThrow).add(FactAttribute);
