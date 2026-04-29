import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class writeTests {
  async write_WithBytes_ShouldWriteToFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.from("Hello, World!", "utf8");
      const bytesWritten = await fs.write(fd, data, 0, data.length, null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
      Assert.Equal(data.length, bytesWritten);
    } finally {
      deleteIfExists(dir);
    }
  }

  async write_WithString_ShouldWriteToFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const bytesWritten = await fs.write(fd, "Hello, World!", null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
      Assert.True(bytesWritten > 0);
    } finally {
      deleteIfExists(dir);
    }
  }

  async write_WithPosition_ShouldWriteAtSpecificPosition(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "XXXXXXXXXX");
      const fd = fs.openSync(filePath, "r+");
      const data = Buffer.from("Hi", "utf8");
      await fs.write(fd, data, 0, data.length, 3);
      fs.closeSync(fd);
      Assert.Equal("XXXHiXXXXX", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  async write_WithInvalidDescriptor_ShouldThrow(): Promise<void> {
    const data = Buffer.from("test", "utf8");
    await assertThrowsAsync(() => fs.write(999, data, 0, data.length, null));
  }

  async write_EmptyString_ShouldCreateEmptyFile(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      await fs.close(fd);
      Assert.Equal("", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<writeTests>().method((t) => t.write_WithBytes_ShouldWriteToFile).add(FactAttribute);
A<writeTests>().method((t) => t.write_WithString_ShouldWriteToFile).add(FactAttribute);
A<writeTests>()
  .method((t) => t.write_WithPosition_ShouldWriteAtSpecificPosition)
  .add(FactAttribute);
A<writeTests>()
  .method((t) => t.write_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A<writeTests>().method((t) => t.write_EmptyString_ShouldCreateEmptyFile).add(FactAttribute);
