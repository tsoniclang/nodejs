import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class fsPromisesTests {
  public async writeFile_And_readFile_ShouldRoundTrip(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "promises.txt");
      await fs.promises.writeFile(filePath, "hello");
      const content = await fs.promises.readFile(filePath, "utf-8");
      Assert.Equal("hello", content);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async stat_ShouldReturnFileInfo(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stats.txt");
      await fs.promises.writeFile(filePath, "abc");
      const stats = await fs.promises.stat(filePath);
      Assert.True(stats.isFile);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(fsPromisesTests)
  .method((t) => t.writeFile_And_readFile_ShouldRoundTrip)
  .add(FactAttribute);
A.on(fsPromisesTests)
  .method((t) => t.stat_ShouldReturnFileInfo)
  .add(FactAttribute);
