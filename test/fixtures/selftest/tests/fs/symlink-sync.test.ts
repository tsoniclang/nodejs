import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, DirectoryInfo, File, FileInfo } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class symlinkSyncTests {
  symlinkSync_File_ShouldCreateSymbolicLink(): void {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "symlink-target.txt");
      const linkPath = getTestPath(dir, "symlink-link.txt");
      File.WriteAllText(targetPath, "content");
      fs.symlinkSync(targetPath, linkPath);
      Assert.True(File.Exists(linkPath));
      Assert.True(new FileInfo(linkPath).LinkTarget !== undefined);
    } finally {
      deleteIfExists(dir);
    }
  }

  symlinkSync_Directory_ShouldCreateSymbolicLink(): void {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "symlink-target-dir");
      const linkPath = getTestPath(dir, "symlink-link-dir");
      Directory.CreateDirectory(targetPath);
      fs.symlinkSync(targetPath, linkPath, "dir");
      Assert.True(Directory.Exists(linkPath));
      Assert.True(new DirectoryInfo(linkPath).LinkTarget !== undefined);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<symlinkSyncTests>()
  .method((t) => t.symlinkSync_File_ShouldCreateSymbolicLink)
  .add(FactAttribute);
A<symlinkSyncTests>()
  .method((t) => t.symlinkSync_Directory_ShouldCreateSymbolicLink)
  .add(FactAttribute);
