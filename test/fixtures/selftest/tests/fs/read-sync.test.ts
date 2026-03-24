import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readSyncTests {
  public readSync_ShouldReadEntireFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(100);
      const bytesRead = fs.readSync(fd, buffer, 0, buffer.length, null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", buffer.toString("utf8", 0, bytesRead));
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_WithOffset_ShouldReadIntoBufferAtOffset(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      buffer.set(0, "X".charCodeAt(0));
      buffer.set(1, "Y".charCodeAt(0));
      const bytesRead = fs.readSync(fd, buffer, 2, 5, null);
      fs.closeSync(fd);
      Assert.Equal("XYHello", buffer.toString("utf8", 0, bytesRead + 2));
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_WithPosition_ShouldReadFromSpecificPosition(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello, World!");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(5);
      const bytesRead = fs.readSync(fd, buffer, 0, 5, 7);
      fs.closeSync(fd);
      Assert.Equal("World", buffer.toString("utf8", 0, bytesRead));
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_MultipleCalls_ShouldAdvanceFilePosition(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "ABCDEFGH");
      const fd = fs.openSync(filePath, "r");
      const buffer1 = Buffer.alloc(3);
      const buffer2 = Buffer.alloc(3);
      const bytesRead1 = fs.readSync(fd, buffer1, 0, 3, null);
      const bytesRead2 = fs.readSync(fd, buffer2, 0, 3, null);
      fs.closeSync(fd);
      Assert.Equal("ABC", buffer1.toString("utf8", 0, bytesRead1));
      Assert.Equal("DEF", buffer2.toString("utf8", 0, bytesRead2));
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_ReadPastEndOfFile_ShouldReturnZero(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hi");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      fs.readSync(fd, buffer, 0, 10, null);
      const bytesRead = fs.readSync(fd, buffer, 0, 10, null);
      fs.closeSync(fd);
      Assert.Equal(0, bytesRead);
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_WithNullBuffer_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      assertThrows(() => fs.readSync(fd, null!, 0, 10, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_WithInvalidDescriptor_ShouldThrow(): void {
    const buffer = Buffer.alloc(10);
    assertThrows(() => fs.readSync(999, buffer, 0, 10, null));
  }

  public readSync_WithInvalidOffset_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      assertThrows(() => fs.readSync(fd, buffer, -1, 5, null));
      assertThrows(() => fs.readSync(fd, buffer, 20, 5, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_WithInvalidLength_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      assertThrows(() => fs.readSync(fd, buffer, 0, -1, null));
      assertThrows(() => fs.readSync(fd, buffer, 5, 10, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public readSync_EmptyFile_ShouldReturnZero(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "");
      const fd = fs.openSync(filePath, "r");
      const buffer = Buffer.alloc(10);
      const bytesRead = fs.readSync(fd, buffer, 0, 10, null);
      fs.closeSync(fd);
      Assert.Equal(0, bytesRead);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(readSyncTests).method((t) => t.readSync_ShouldReadEntireFile).add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithOffset_ShouldReadIntoBufferAtOffset)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithPosition_ShouldReadFromSpecificPosition)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_MultipleCalls_ShouldAdvanceFilePosition)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_ReadPastEndOfFile_ShouldReturnZero)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithInvalidOffset_ShouldThrow)
  .add(FactAttribute);
A.on(readSyncTests)
  .method((t) => t.readSync_WithInvalidLength_ShouldThrow)
  .add(FactAttribute);
A.on(readSyncTests).method((t) => t.readSync_EmptyFile_ShouldReturnZero).add(FactAttribute);
