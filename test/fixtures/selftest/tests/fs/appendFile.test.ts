import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class appendFileTests {
  async appendFile_ShouldAppendToFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "append-test-async.txt");
      File.WriteAllText(filePath, "Line 1\n");
      await fs.appendFile(filePath, "Line 2\n", "utf-8");
      const content = File.ReadAllText(filePath);
      Assert.Contains("Line 1", content);
      Assert.Contains("Line 2", content);
    } finally {
      deleteIfExists(dir);
    }
  }

  async appendFile_NonExistentFile_ShouldCreateFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "append-new-async.txt");
      await fs.appendFile(filePath, "New content", "utf-8");
      Assert.True(File.Exists(filePath));
      Assert.Equal("New content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<appendFileTests>().method((t) => t.appendFile_ShouldAppendToFile).add(FactAttribute);
A<appendFileTests>()
  .method((t) => t.appendFile_NonExistentFile_ShouldCreateFile)
  .add(FactAttribute);
