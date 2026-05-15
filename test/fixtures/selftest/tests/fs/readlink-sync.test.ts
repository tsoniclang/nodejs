import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readlinkSyncTests {
  readlinkSync_ShouldReturnTargetPath(): void {
    const dir = createTempDir();
    try {
      const targetPath = getTestPath(dir, "readlink-target.txt");
      const linkPath = getTestPath(dir, "readlink-link.txt");
      File.WriteAllText(targetPath, "content");
      fs.symlinkSync(targetPath, linkPath);
      const target = fs.readlinkSync(linkPath);
      Assert.True(target.length > 0);
    } finally {
      deleteIfExists(dir);
    }
  }

  readlinkSync_NonSymlink_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "regular-file.txt");
      File.WriteAllText(filePath, "content");
      assertThrows(() => fs.readlinkSync(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  readlinkSync_NonExistent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const linkPath = getTestPath(dir, "nonexistent-link.txt");
      assertThrows(() => fs.readlinkSync(linkPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<readlinkSyncTests>()
  .method((t) => t.readlinkSync_ShouldReturnTargetPath)
  .add(FactAttribute);
A<readlinkSyncTests>()
  .method((t) => t.readlinkSync_NonSymlink_ShouldThrow)
  .add(FactAttribute);
A<readlinkSyncTests>()
  .method((t) => t.readlinkSync_NonExistent_ShouldThrow)
  .add(FactAttribute);
