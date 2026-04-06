import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class writeSyncTests {
  public writeSync_WithBytes_ShouldWriteToFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.from("Hello, World!", "utf8");
      const bytesWritten = fs.writeSync(fd, data, 0, data.length, null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
      Assert.Equal(data.length, bytesWritten);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithString_ShouldWriteToFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const bytesWritten = fs.writeSync(fd, "Hello, World!", null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
      Assert.True(bytesWritten > 0);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithOffset_ShouldWritePartialBuffer(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.from("ABCDEFGH", "utf8");
      const bytesWritten = fs.writeSync(fd, data, 2, 4, null);
      fs.closeSync(fd);
      Assert.Equal("CDEF", File.ReadAllText(filePath));
      Assert.Equal(4, bytesWritten);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithPosition_ShouldWriteAtSpecificPosition(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "XXXXXXXXXX");
      const fd = fs.openSync(filePath, "r+");
      const data = Buffer.from("Hi", "utf8");
      fs.writeSync(fd, data, 0, data.length, 3);
      fs.closeSync(fd);
      Assert.Equal("XXXHiXXXXX", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_MultipleCalls_ShouldAdvanceFilePosition(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      fs.writeSync(fd, "Hello", null);
      fs.writeSync(fd, ", ", null);
      fs.writeSync(fd, "World!", null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithAppendFlag_ShouldAppendToFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "Hello");
      const fd = fs.openSync(filePath, "a");
      fs.writeSync(fd, ", World!", null);
      fs.closeSync(fd);
      Assert.Equal("Hello, World!", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithDifferentEncodings_ShouldWork(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      fs.writeSync(fd, "UTF8", null, "utf8");
      fs.closeSync(fd);
      Assert.Equal("UTF8", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithNullBuffer_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      assertThrows(() => fs.writeSync(fd, null!, 0, 10, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithInvalidDescriptor_ShouldThrow(): void {
    const data = Buffer.from("test", "utf8");
    assertThrows(() => fs.writeSync(999, data, 0, data.length, null));
  }

  public writeSync_WithInvalidOffset_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.alloc(10);
      assertThrows(() => fs.writeSync(fd, data, -1, 5, null));
      assertThrows(() => fs.writeSync(fd, data, 20, 5, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_WithInvalidLength_ShouldThrow(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.alloc(10);
      assertThrows(() => fs.writeSync(fd, data, 0, -1, null));
      assertThrows(() => fs.writeSync(fd, data, 5, 10, null));
      fs.closeSync(fd);
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_EmptyString_ShouldCreateEmptyFile(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      fs.closeSync(fd);
      Assert.Equal("", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }

  public writeSync_LargeData_ShouldWriteCompletely(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const largeData = "A".repeat(10000);
      const bytesWritten = fs.writeSync(fd, largeData, null);
      fs.closeSync(fd);
      Assert.Equal(10000, File.ReadAllText(filePath).length);
      Assert.Equal(10000, bytesWritten);
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<writeSyncTests>().method((t) => t.writeSync_WithBytes_ShouldWriteToFile).add(FactAttribute);
A<writeSyncTests>().method((t) => t.writeSync_WithString_ShouldWriteToFile).add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithOffset_ShouldWritePartialBuffer)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithPosition_ShouldWriteAtSpecificPosition)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_MultipleCalls_ShouldAdvanceFilePosition)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithAppendFlag_ShouldAppendToFile)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithDifferentEncodings_ShouldWork)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithNullBuffer_ShouldThrow)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithInvalidOffset_ShouldThrow)
  .add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_WithInvalidLength_ShouldThrow)
  .add(FactAttribute);
A<writeSyncTests>().method((t) => t.writeSync_EmptyString_ShouldCreateEmptyFile).add(FactAttribute);
A<writeSyncTests>()
  .method((t) => t.writeSync_LargeData_ShouldWriteCompletely)
  .add(FactAttribute);
