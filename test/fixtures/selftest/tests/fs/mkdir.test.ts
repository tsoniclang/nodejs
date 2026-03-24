import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Directory, DirectoryNotFoundException } from "@tsonic/dotnet/System.IO.js";

import { fs, MkdirOptions } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class mkdirTests {
  public async mkdir_ShouldCreateDirectory(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "new-dir-async");
      await fs.mkdir(dirPath);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async mkdir_Recursive_ShouldCreateNestedDirectories(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "parent-async/child/grandchild");
      await fs.mkdir(dirPath, true);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async mkdir_NonRecursive_MissingParent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "missing-parent-async/child");
      const error = await assertThrowsAsync(() => fs.mkdir(dirPath, false));
      Assert.True(error instanceof DirectoryNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async mkdir_MkdirOptions_Recursive_ShouldCreateNestedDirectories(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "opts-parent-async/child/grandchild");
      const options = new MkdirOptions();
      options.recursive = true;
      await fs.mkdir(dirPath, options);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async mkdir_MkdirOptions_NonRecursive_MissingParent_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "opts-missing-parent-async/child");
      const options = new MkdirOptions();
      options.recursive = false;
      const error = await assertThrowsAsync(() => fs.mkdir(dirPath, options));
      Assert.True(error instanceof DirectoryNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async mkdir_ObjectOptions_Recursive_ShouldCreateNestedDirectories(): Promise<void> {
    const dir = createTempDir();
    try {
      const dirPath = getTestPath(dir, "obj-parent-async/child/grandchild");
      const options = new MkdirOptions();
      options.recursive = true;
      await fs.mkdir(dirPath, options);
      Assert.True(Directory.Exists(dirPath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(mkdirTests).method((t) => t.mkdir_ShouldCreateDirectory).add(FactAttribute);
A.on(mkdirTests).method((t) => t.mkdir_Recursive_ShouldCreateNestedDirectories).add(FactAttribute);
A.on(mkdirTests)
  .method((t) => t.mkdir_NonRecursive_MissingParent_ShouldThrow)
  .add(FactAttribute);
A.on(mkdirTests)
  .method((t) => t.mkdir_MkdirOptions_Recursive_ShouldCreateNestedDirectories)
  .add(FactAttribute);
A.on(mkdirTests)
  .method((t) => t.mkdir_MkdirOptions_NonRecursive_MissingParent_ShouldThrow)
  .add(FactAttribute);
A.on(mkdirTests)
  .method((t) => t.mkdir_ObjectOptions_Recursive_ShouldCreateNestedDirectories)
  .add(FactAttribute);
