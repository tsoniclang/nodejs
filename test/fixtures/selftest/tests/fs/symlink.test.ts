import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, DirectoryInfo, File, FileInfo } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class symlinkTests {
  public async symlink_File_ShouldCreateSymbolicLink(): Promise<void> {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "symlink-target-async.txt");
      const linkPath = getTestPath(dir, "symlink-link-async.txt");
      File.WriteAllText(targetPath, "content");
      await fs.symlink(targetPath, linkPath);
      Assert.True(File.Exists(linkPath));
      Assert.True(new FileInfo(linkPath).LinkTarget !== undefined);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async symlink_Directory_ShouldCreateSymbolicLink(): Promise<void> {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "symlink-target-dir-async");
      const linkPath = getTestPath(dir, "symlink-link-dir-async");
      Directory.CreateDirectory(targetPath);
      await fs.symlink(targetPath, linkPath, "dir");
      Assert.True(Directory.Exists(linkPath));
      Assert.True(new DirectoryInfo(linkPath).LinkTarget !== undefined);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<symlinkTests>().method((t) => t.symlink_File_ShouldCreateSymbolicLink).add(FactAttribute);
A<symlinkTests>()
  .method((t) => t.symlink_Directory_ShouldCreateSymbolicLink)
  .add(FactAttribute);
