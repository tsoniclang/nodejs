import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetSendBufferSizeTests {
  setSendBufferSize_SetsBufferSize(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    socket.setSendBufferSize(8192);
    const size = socket.getSendBufferSize();
    // Buffer size might be adjusted by OS
    Assert.True(size > 0);

    socket.close();
  }
}

A<SetSendBufferSizeTests>()
  .method((t) => t.setSendBufferSize_SetsBufferSize)
  .add(FactAttribute);
