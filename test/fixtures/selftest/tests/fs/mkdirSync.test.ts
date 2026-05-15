import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, DirectoryNotFoundException } from "@tsonic/dotnet/System.IO.js";

import { fs, MkdirOptions } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class mkdirSyncTests {
  mkdirSync_ShouldCreateDirectory(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "new-dir");
      fs.mkdirSync(dirPath);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  mkdirSync_Recursive_ShouldCreateNestedDirectories(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "parent/child/grandchild");
      fs.mkdirSync(dirPath, true);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  mkdirSync_NonRecursive_MissingParent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "missing-parent/child");
      const error = assertThrows(() => fs.mkdirSync(dirPath, false));
      Assert.True(error instanceof DirectoryNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  mkdirSync_MkdirOptions_Recursive_ShouldCreateNestedDirectories(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "opts-parent/child/grandchild");
      const options = new MkdirOptions();
      options.recursive = true;
      fs.mkdirSync(dirPath, options);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  mkdirSync_MkdirOptions_NonRecursive_MissingParent_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "opts-missing-parent/child");
      const options = new MkdirOptions();
      options.recursive = false;
      const error = assertThrows(() => fs.mkdirSync(dirPath, options));
      Assert.True(error instanceof DirectoryNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  mkdirSync_ObjectOptions_Recursive_ShouldCreateNestedDirectories(): void {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "obj-parent/child/grandchild");
      const options = new MkdirOptions();
      options.recursive = true;
      fs.mkdirSync(dirPath, options);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<mkdirSyncTests>().method((t) => t.mkdirSync_ShouldCreateDirectory).add(FactAttribute);
A<mkdirSyncTests>().method((t) => t.mkdirSync_Recursive_ShouldCreateNestedDirectories).add(FactAttribute);
A<mkdirSyncTests>()
  .method((t) => t.mkdirSync_NonRecursive_MissingParent_ShouldThrow)
  .add(FactAttribute);
A<mkdirSyncTests>()
  .method((t) => t.mkdirSync_MkdirOptions_Recursive_ShouldCreateNestedDirectories)
  .add(FactAttribute);
A<mkdirSyncTests>()
  .method((t) => t.mkdirSync_MkdirOptions_NonRecursive_MissingParent_ShouldThrow)
  .add(FactAttribute);
A<mkdirSyncTests>()
  .method((t) => t.mkdirSync_ObjectOptions_Recursive_ShouldCreateNestedDirectories)
  .add(FactAttribute);
