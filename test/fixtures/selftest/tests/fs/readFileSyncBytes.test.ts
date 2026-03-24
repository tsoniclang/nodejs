import { attributes as A } from "@tsonic/core/lang.js";
import type { byte } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class readFileSyncBytesTests {
  public readFileSyncBytes_ShouldReadBinaryData(): void {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "binary-test.bin");
      const data: byte[] = [0x48, 0x65, 0x6c, 0x6c, 0x6f];
      File.WriteAllBytes(filePath, data);
      const result = fs.readFileSyncBytes(filePath);
      Assert.Equal(data.length, result.length);
      for (let index = 0; index < data.length; index += 1) {
        Assert.Equal(data[index], result[index]);
      }
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(readFileSyncBytesTests).method((t) => t.readFileSyncBytes_ShouldReadBinaryData).add(FactAttribute);
