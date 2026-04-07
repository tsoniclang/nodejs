import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readlinkTests {
  public async readlink_ShouldReturnTargetPath(): Promise<void> {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "readlink-target-async.txt");
      const linkPath = getTestPath(dir, "readlink-link-async.txt");
      File.WriteAllText(targetPath, "content");
      await fs.symlink(targetPath, linkPath);
      const target = await fs.readlink(linkPath);
      Assert.True(target.length > 0);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async readlink_NonSymlink_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "regular-file-async.txt");
      File.WriteAllText(filePath, "content");
      await assertThrowsAsync(() => fs.readlink(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async readlink_NonExistent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const linkPath = getTestPath(dir, "nonexistent-link-async.txt");
      await assertThrowsAsync(() => fs.readlink(linkPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<readlinkTests>().method((t) => t.readlink_ShouldReturnTargetPath).add(FactAttribute);
A<readlinkTests>()
  .method((t) => t.readlink_NonSymlink_ShouldThrow)
  .add(FactAttribute);
A<readlinkTests>()
  .method((t) => t.readlink_NonExistent_ShouldThrow)
  .add(FactAttribute);
