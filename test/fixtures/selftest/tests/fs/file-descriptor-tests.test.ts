import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class fileDescriptorTests {
  public OpenSync_ReadMode_ReturnsValidFd(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test content");
      const fd = fs.openSync(filePath, "r");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public OpenSync_WriteMode_CreatesFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "new.txt");
      const fd = fs.openSync(filePath, "w");
      Assert.True(fd >= 3);
      fs.closeSync(fd);
      Assert.True(File.Exists(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public ReadSync_ReadsDataIntoBuffer(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "read.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(100);
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, 0);
      Assert.Equal(13, bytesRead);
      Assert.Equal("Hello, World!", buffer.toString("utf8", 0, bytesRead));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public WriteSync_WritesDataFromBuffer(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "write.txt");
      const buffer = Buffer.from("Test write", "utf8");
      const fd = fs.openSync(filePath, "w");
      const bytesWritten = fs.writeSync(fd, buffer, 0, buffer.length, null);
      Assert.Equal(buffer.length, bytesWritten);
      fs.closeSync(fd);
      Assert.Equal("Test write", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public WriteSync_String_WritesText(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "write-str.txt");
      const fd = fs.openSync(filePath, "w");
      const bytesWritten = fs.writeSync(fd, "String write test", null, "utf8");
      Assert.True(bytesWritten > 0);
      fs.closeSync(fd);
      Assert.Equal("String write test", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public FstatSync_ReturnsStats(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "stat.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      const stats = fs.fstatSync(fd);
      Assert.True(stats.size > 0);
      Assert.True(stats.isFile);
      Assert.False(stats.isDirectory);
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public CloseSync_InvalidFd_Throws(): void {
    assertThrows(() => fs.closeSync(999));
  }

  public async Open_Async_Works(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "async.txt");
      File.WriteAllText(filePath, "async test");
      const fd = await fs.open(filePath, "r");
      Assert.True(fd >= 3);
      await fs.close(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public async Read_Async_Works(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "async-read.txt");
      File.WriteAllText(filePath, "Async read test");
      const fd = await fs.open(filePath, "r");
      const buffer = Buffer.alloc(100);
      const bytesRead = await fs.read(fd, buffer, 0, buffer.length, 0);
      Assert.Equal(15, bytesRead);
      await fs.close(fd);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(fileDescriptorTests).method((t) => t.OpenSync_ReadMode_ReturnsValidFd).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.OpenSync_WriteMode_CreatesFile).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.ReadSync_ReadsDataIntoBuffer).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.WriteSync_WritesDataFromBuffer).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.WriteSync_String_WritesText).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.FstatSync_ReturnsStats).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.CloseSync_InvalidFd_Throws).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.Open_Async_Works).add(FactAttribute);
A.on(fileDescriptorTests).method((t) => t.Read_Async_Works).add(FactAttribute);
