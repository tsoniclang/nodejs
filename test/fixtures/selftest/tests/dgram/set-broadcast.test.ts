import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetBroadcastTests {
  setBroadcast_EnablesBroadcast(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    // Should not throw
    socket.setBroadcast(true);
    socket.setBroadcast(false);

    socket.close();
  }
}

A<SetBroadcastTests>()
  .method((t) => t.setBroadcast_EnablesBroadcast)
  .add(FactAttribute);
