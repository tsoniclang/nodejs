import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class GetSendQueueSizeTests {
  public getSendQueueSize_ReturnsZero(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const size = socket.getSendQueueSize();
    Assert.Equal(0, size);

    socket.close();
  }
}

A<GetSendQueueSizeTests>()
  .method((t) => t.getSendQueueSize_ReturnsZero)
  .add(FactAttribute);
