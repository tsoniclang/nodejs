import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class GetSendBufferSizeTests {
  public getSendBufferSize_ReturnsBufferSize(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const size = socket.getSendBufferSize();
    Assert.True(size > 0);

    socket.close();
  }
}

A.on(GetSendBufferSizeTests)
  .method((t) => t.getSendBufferSize_ReturnsBufferSize)
  .add(FactAttribute);
