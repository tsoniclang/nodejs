import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class realpathSyncTests {
  realpathSync_ShouldResolveAbsolutePath(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "realpath-test.txt");
      File.WriteAllText(filePath, "content");
      const resolved = fs.realpathSync(filePath);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.True(File.Exists(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }

  realpathSync_RelativePath_ShouldResolveToAbsolute(): void {
    const dir = createTempDir();
    const originalDir = Directory.GetCurrentDirectory();
    try {
      const fileName = "realpath-relative.txt";
      const filePath = getTestPath(dir, fileName);
      File.WriteAllText(filePath, "content");
      Directory.SetCurrentDirectory(dir);
      const resolved = fs.realpathSync(fileName);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.Equal(filePath, resolved);
    } finally {
      Directory.SetCurrentDirectory(originalDir);
      deleteIfExists(dir);
    }
  }

  realpathSync_NonExistent_ShouldResolveAnyway(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-realpath.txt");
      const resolved = fs.realpathSync(filePath);
      Assert.True(Path.IsPathFullyQualified(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }

  realpathSync_Directory_ShouldResolve(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "realpath-dir");
      Directory.CreateDirectory(dirPath);
      const resolved = fs.realpathSync(dirPath);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.True(Directory.Exists(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<realpathSyncTests>().method((t) => t.realpathSync_ShouldResolveAbsolutePath).add(FactAttribute);
A<realpathSyncTests>()
  .method((t) => t.realpathSync_RelativePath_ShouldResolveToAbsolute)
  .add(FactAttribute);
A<realpathSyncTests>()
  .method((t) => t.realpathSync_NonExistent_ShouldResolveAnyway)
  .add(FactAttribute);
A<realpathSyncTests>().method((t) => t.realpathSync_Directory_ShouldResolve).add(FactAttribute);
