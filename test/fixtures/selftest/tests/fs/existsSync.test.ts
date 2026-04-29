import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class existsSyncTests {
  existsSync_ExistingFile_ShouldReturnTrue(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "exists-test.txt");
      File.WriteAllText(filePath, "content");
      Assert.True(fs.existsSync(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  existsSync_ExistingDirectory_ShouldReturnTrue(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "exists-dir");
      Directory.CreateDirectory(dirPath);
      Assert.True(fs.existsSync(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  existsSync_NonExistent_ShouldReturnFalse(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      Assert.False(fs.existsSync(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<existsSyncTests>().method((t) => t.existsSync_ExistingFile_ShouldReturnTrue).add(FactAttribute);
A<existsSyncTests>()
  .method((t) => t.existsSync_ExistingDirectory_ShouldReturnTrue)
  .add(FactAttribute);
A<existsSyncTests>().method((t) => t.existsSync_NonExistent_ShouldReturnFalse).add(FactAttribute);
