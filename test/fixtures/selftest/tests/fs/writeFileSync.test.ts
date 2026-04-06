import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class writeFileSyncTests {
  public writeFileSync_ShouldCreateAndWriteFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "write-test.txt");
      const content = "Test content";
      fs.writeFileSync(filePath, content, "utf-8");
      Assert.True(File.Exists(filePath));
      Assert.Equal(content, File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeFileSync_ShouldOverwriteExistingFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "overwrite-test.txt");
      File.WriteAllText(filePath, "Original content");
      fs.writeFileSync(filePath, "New content", "utf-8");
      Assert.Equal("New content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<writeFileSyncTests>().method((t) => t.writeFileSync_ShouldCreateAndWriteFile).add(FactAttribute);
A<writeFileSyncTests>()
  .method((t) => t.writeFileSync_ShouldOverwriteExistingFile)
  .add(FactAttribute);
