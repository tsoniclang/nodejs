import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class unlinkTests {
  public async unlink_ShouldDeleteFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "delete-test-async.txt");
      File.WriteAllText(filePath, "content");
      await fs.unlink(filePath);
      Assert.False(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async unlink_NonExistentFile_ShouldNotThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-async-unlink.txt");
      await fs.unlink(filePath);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(unlinkTests).method((t) => t.unlink_ShouldDeleteFile).add(FactAttribute);
A.on(unlinkTests).method((t) => t.unlink_NonExistentFile_ShouldNotThrow).add(FactAttribute);
