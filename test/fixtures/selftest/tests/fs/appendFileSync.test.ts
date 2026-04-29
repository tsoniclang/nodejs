import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class appendFileSyncTests {
  appendFileSync_ShouldAppendToFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "append-test.txt");
      File.WriteAllText(filePath, "Line 1\n");
      fs.appendFileSync(filePath, "Line 2\n", "utf-8");
      const content = File.ReadAllText(filePath);
      Assert.Contains("Line 1", content);
      Assert.Contains("Line 2", content);
    } finally {
      deleteIfExists(dir);
    }
  }

  appendFileSync_NonExistentFile_ShouldCreateFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "append-new.txt");
      fs.appendFileSync(filePath, "New content", "utf-8");
      Assert.True(File.Exists(filePath));
      Assert.Equal("New content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<appendFileSyncTests>().method((t) => t.appendFileSync_ShouldAppendToFile).add(FactAttribute);
A<appendFileSyncTests>()
  .method((t) => t.appendFileSync_NonExistentFile_ShouldCreateFile)
  .add(FactAttribute);
