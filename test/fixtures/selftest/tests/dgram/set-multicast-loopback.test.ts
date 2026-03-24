import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetMulticastLoopbackTests {
  public setMulticastLoopback_SetsLoopback(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const result = socket.setMulticastLoopback(true);
    Assert.True(result);

    socket.close();
  }
}

A.on(SetMulticastLoopbackTests)
  .method((t) => t.setMulticastLoopback_SetsLoopback)
  .add(FactAttribute);
