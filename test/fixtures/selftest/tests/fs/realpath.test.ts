import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class realpathTests {
  public async realpath_ShouldResolveAbsolutePath(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "realpath-test-async.txt");
      File.WriteAllText(filePath, "content");
      const resolved = await fs.realpath(filePath);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.True(File.Exists(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async realpath_RelativePath_ShouldResolveToAbsolute(): Promise<void> {
    const dir = createTempDir();
    const originalDir = Directory.GetCurrentDirectory();
    try {
      const fileName = "realpath-relative-async.txt";
      const filePath = getTestPath(dir, fileName);
      File.WriteAllText(filePath, "content");
      Directory.SetCurrentDirectory(dir);
      const resolved = await fs.realpath(fileName);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.Equal(filePath, resolved);
    } finally {
      Directory.SetCurrentDirectory(originalDir);
      deleteIfExists(dir);
    }
  }

  public async realpath_NonExistent_ShouldResolveAnyway(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-realpath-async.txt");
      const resolved = await fs.realpath(filePath);
      Assert.True(Path.IsPathFullyQualified(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async realpath_Directory_ShouldResolve(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "realpath-dir-async");
      Directory.CreateDirectory(dirPath);
      const resolved = await fs.realpath(dirPath);
      Assert.True(Path.IsPathFullyQualified(resolved));
      Assert.True(Directory.Exists(resolved));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(realpathTests).method((t) => t.realpath_ShouldResolveAbsolutePath).add(FactAttribute);
A.on(realpathTests)
  .method((t) => t.realpath_RelativePath_ShouldResolveToAbsolute)
  .add(FactAttribute);
A.on(realpathTests).method((t) => t.realpath_NonExistent_ShouldResolveAnyway).add(FactAttribute);
A.on(realpathTests).method((t) => t.realpath_Directory_ShouldResolve).add(FactAttribute);
