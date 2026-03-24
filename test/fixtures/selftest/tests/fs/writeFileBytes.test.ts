import { attributes as A } from "@tsonic/core/lang.js";
import type { byte } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { File } from "@tsonic/dotnet/System.IO.js";

import { fs } from "@tsonic/nodejs/fs.js";
import { createTempDir, deleteIfExists, getTestPath } from "./helpers.ts";

export class writeFileBytesTests {
  public async writeFileBytes_ShouldWriteBinaryData(): Promise<void> {
    const dir = createTempDir();
    try {
      const filePath = getTestPath(dir, "binary-write-async.bin");
      const data: byte[] = [0x01, 0x02, 0x03, 0x04, 0x05];
      await fs.writeFileBytes(filePath, data);
      Assert.True(File.Exists(filePath));
      const result = File.ReadAllBytes(filePath);
      Assert.Equal(data.length, result.length);
      for (let index = 0; index < data.length; index += 1) {
        Assert.Equal(data[index], result[index]);
      }
    } finally {
      deleteIfExists(dir);
    }
  }
}

A.on(writeFileBytesTests).method((t) => t.writeFileBytes_ShouldWriteBinaryData).add(FactAttribute);
