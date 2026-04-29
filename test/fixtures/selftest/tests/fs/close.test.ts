import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Buffer } from "@tsonic/nodejs/buffer.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { assertThrows, assertThrowsAsync, createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class closeTests {
  async close_ShouldCloseValidDescriptor(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      File.WriteAllText(filePath, "test");
      const fd = fs.openSync(filePath, "r");
      await fs.close(fd);
      assertThrows(() => fs.fstatSync(fd));
    } finally {
      deleteIfExists(dir);
    }
  }

  async close_WithInvalidDescriptor_ShouldThrow(): Promise<void> {
    await assertThrowsAsync(() => fs.close(999));
  }

  async close_AfterWrite_ShouldFlushAndClose(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "test.txt");
      const fd = fs.openSync(filePath, "w");
      const data = Buffer.from("test content", "utf8");
      fs.writeSync(fd, data, 0, data.length, null);
      await fs.close(fd);
      Assert.Equal("test content", File.ReadAllText(filePath));
    } finally {
      deleteIfExists(dir);
    }
  }
}

A<closeTests>().method((t) => t.close_ShouldCloseValidDescriptor).add(FactAttribute);
A<closeTests>()
  .method((t) => t.close_WithInvalidDescriptor_ShouldThrow)
  .add(FactAttribute);
A<closeTests>().method((t) => t.close_AfterWrite_ShouldFlushAndClose).add(FactAttribute);
