import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class GetSendQueueCountTests {
  public getSendQueueCount_ReturnsZero(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const count = socket.getSendQueueCount();
    Assert.Equal(0, count);

    socket.close();
  }
}

A.on(GetSendQueueCountTests)
  .method((t) => t.getSendQueueCount_ReturnsZero)
  .add(FactAttribute);
