import { attributes as A } from "@tsonic/core/lang.js";
import type { byte } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File, FileNotFoundException } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import {
  assertThrowsAsync,
  createTempDir,
  deleteIfExists,
  getTestPath,
} from "./helpers.ts";

export class readFileTests {
  async readFile_ShouldReadTextFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test-async.txt");
      const content = "Hello, Async World!";
      File.WriteAllText(filePath, content);
      const result = await fs.readFile(filePath, "utf-8");
      Assert.Equal(content, result);
    } finally {
      deleteIfExists(dir);
    }
  }

  async readFile_NonExistentFile_ShouldThrow(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent-async.txt");
      const error = await assertThrowsAsync(() => fs.readFile(filePath, "utf-8"));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  async readFile_WithoutEncoding_ShouldReturnBuffer(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "buffer-async.bin");
      const content: byte[] = [0x10, 0x20, 0x30, 0x40];
      File.WriteAllBytes(filePath, content);
      const result = await fs.readFile(filePath);
      Assert.Equal(content.length, result.length);
      for (let index = 0; index < content.length; index += 1) {
        Assert.Equal(content[index], result[index]);
      }
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<readFileTests>().method((t) => t.readFile_ShouldReadTextFile).add(FactAttribute);
A<readFileTests>().method((t) => t.readFile_NonExistentFile_ShouldThrow).add(FactAttribute);
A<readFileTests>()
  .method((t) => t.readFile_WithoutEncoding_ShouldReturnBuffer)
  .add(FactAttribute);
