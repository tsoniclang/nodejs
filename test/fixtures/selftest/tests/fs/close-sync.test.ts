import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class closeSyncTests {
  public closeSync_ShouldCloseValidDescriptor(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      fs.closeSync(fd);
      assertThrows(() => fs.fstatSync(fd));
    } finally {
      deleteIfExists(dir);
    }
  }

  public closeSync_WithInvalidDescriptor_ShouldThrow(): void {
    assertThrows(() => fs.closeSync(999));
  }

  public closeSync_CalledTwice_ShouldThrowSecondTime(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      fs.closeSync(fd);
      assertThrows(() => fs.closeSync(fd));
    } finally {
      deleteIfExists(dir);
    }
  }

  public closeSync_AfterWrite_ShouldFlushAndClose(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.from("test content", "utf8");
      fs.writeSync(fd, data, 0, data.length, null);
      fs.closeSync(fd);
      Assert.Equal("test content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(closeSyncTests)
  .method((t) => t.closeSync_ShouldCloseValidDescriptor)
  .add(FactAttribute);
A.on(closeSyncTests)
  .method((t) => t.closeSync_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A.on(closeSyncTests)
  .method((t) => t.closeSync_CalledTwice_ShouldThrowSecondTime)
  .add(FactAttribute);
A.on(closeSyncTests)
  .method((t) => t.closeSync_AfterWrite_ShouldFlushAndClose)
  .add(FactAttribute);
