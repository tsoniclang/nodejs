import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readTests {
  public async read_ShouldReadEntireFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(100);
      const bytesRead = await fs.read(fd, buffer, 0, buffer.length, null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", buffer.toString("utf8", 0, bytesRead));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async read_WithPosition_ShouldReadFromSpecificPosition(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(5);
      const bytesRead = await fs.read(fd, buffer, 0, 5, 7);
      fs.closeSync(fd);
      Assert.Equal("World", buffer.toString("utf8", 0, bytesRead));
    } finally {
      deleteIfExists(dir);
    }
  }

  public async read_WithInvalidDescriptor_ShouldThrow(): Promise<void> {
    const buffer = Buffer.alloc(10);
    await assertThrowsAsync(() => fs.read(999, buffer, 0, 10, null));
  }

  public async read_EmptyFile_ShouldReturnZero(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      const bytesRead = await fs.read(fd, buffer, 0, 10, null);
      fs.closeSync(fd);
      Assert.Equal(0, bytesRead);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(readTests).method((t) => t.read_ShouldReadEntireFile).add(FactAttribute);
A.on(readTests)
  .method((t) => t.read_WithPosition_ShouldReadFromSpecificPosition)
  .add(FactAttribute);
A.on(readTests)
  .method((t) => t.read_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A.on(readTests).method((t) => t.read_EmptyFile_ShouldReturnZero).add(FactAttribute);
