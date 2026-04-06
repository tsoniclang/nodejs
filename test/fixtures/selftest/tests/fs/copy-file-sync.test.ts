import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class copyFileSyncTests {
  public copyFileSync_ShouldCopyFile(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "copy-src.txt");
      const destinationPath = getTestPath(dir, "copy-dest.txt");
      File.WriteAllText(sourcePath, "Copy this content");
      fs.copyFileSync(sourcePath, destinationPath);
      Assert.True(File.Exists(destinationPath));
      Assert.Equal("Copy this content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public copyFileSync_ShouldOverwriteDestination(): void {
    const dir = createTempDir();
    try {
      const sourcePath = getTestPath(dir, "copy-src2.txt");
      const destinationPath = getTestPath(dir, "copy-dest2.txt");
      File.WriteAllText(sourcePath, "New content");
      File.WriteAllText(destinationPath, "Old content");
      fs.copyFileSync(sourcePath, destinationPath);
      Assert.Equal("New content", File.ReadAllText(destinationPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<copyFileSyncTests>().method((t) => t.copyFileSync_ShouldCopyFile).add(FactAttribute);
A<copyFileSyncTests>()
  .method((t) => t.copyFileSync_ShouldOverwriteDestination)
  .add(FactAttribute);
