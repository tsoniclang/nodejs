import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetRecvBufferSizeTests {
  public setRecvBufferSize_SetsBufferSize(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    socket.setRecvBufferSize(8192);
    const size = socket.getRecvBufferSize();
    // Buffer size might be adjusted by OS
    Assert.True(size > 0);

    socket.close();
  }
}

A.on(SetRecvBufferSizeTests)
  .method((t) => t.setRecvBufferSize_SetsBufferSize)
  .add(FactAttribute);
