import { attributes as A } from "@tsonic/core/lang.js";
import type { byte } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File, FileNotFoundException } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readFileSyncTests {
  readFileSync_ShouldReadTextFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const content = "Hello, World!";
      File.WriteAllText(filePath, content);
      const result = fs.readFileSync(filePath, "utf-8");
      Assert.Equal(content, result);
    } finally {
      deleteIfExists(dir);
    }
  }

  readFileSync_NonExistentFile_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "nonexistent.txt");
      const error = assertThrows(() => fs.readFileSync(filePath, "utf-8"));
      Assert.True(error instanceof FileNotFoundException);
    } finally {
      deleteIfExists(dir);
    }
  }

  readFileSync_WithoutEncoding_ShouldReturnBuffer(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "buffer.bin");
      const content: byte[] = [0x01, 0x02, 0x41, 0x42, 0x43];
      File.WriteAllBytes(filePath, content);
      const result = fs.readFileSync(filePath);
      Assert.Equal(content.length, result.length);
      for (let index = 0; index < content.length; index += 1) {
        Assert.Equal(content[index], result[index]);
      }
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<readFileSyncTests>()
  .method((t) => t.readFileSync_ShouldReadTextFile)
  .add(FactAttribute);
A<readFileSyncTests>()
  .method((t) => t.readFileSync_NonExistentFile_ShouldThrow)
  .add(FactAttribute);
A<readFileSyncTests>()
  .method((t) => t.readFileSync_WithoutEncoding_ShouldReturnBuffer)
  .add(FactAttribute);
