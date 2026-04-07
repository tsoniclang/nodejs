import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class copyFileTests {
  public async copyFile_ShouldCopyFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "copy-src-async.txt");
      const destinationPath = getTestPath(dir, "copy-dest-async.txt");
      File.WriteAllText(sourcePath, "Copy this content");
      await fs.copyFile(sourcePath, destinationPath);
      Assert.True(File.Exists(destinationPath));
      Assert.Equal("Copy this content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async copyFile_ShouldOverwriteDestination(): Promise<void> {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "copy-src2-async.txt");
      const destinationPath = getTestPath(dir, "copy-dest2-async.txt");
      File.WriteAllText(sourcePath, "New content");
      File.WriteAllText(destinationPath, "Old content");
      await fs.copyFile(sourcePath, destinationPath);
      Assert.Equal("New content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<copyFileTests>().method((t) => t.copyFile_ShouldCopyFile).add(FactAttribute);
A<copyFileTests>()
  .method((t) => t.copyFile_ShouldOverwriteDestination)
  .add(FactAttribute);
