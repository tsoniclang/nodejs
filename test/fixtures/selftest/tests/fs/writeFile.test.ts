import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class writeFileTests {
  public async writeFile_ShouldCreateAndWriteFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "write-test-async.txt");
      const content = "Test content async";
      await fs.writeFile(filePath, content, "utf-8");
      Assert.True(File.Exists(filePath));
      Assert.Equal(content, File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async writeFile_ShouldOverwriteExistingFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "overwrite-test-async.txt");
      File.WriteAllText(filePath, "Original content");
      await fs.writeFile(filePath, "New content", "utf-8");
      Assert.Equal("New content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(writeFileTests).method((t) => t.writeFile_ShouldCreateAndWriteFile).add(FactAttribute);
A.on(writeFileTests).method((t) => t.writeFile_ShouldOverwriteExistingFile).add(FactAttribute);
