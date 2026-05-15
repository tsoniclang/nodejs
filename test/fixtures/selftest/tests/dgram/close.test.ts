import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class CloseTests {
  close_BoundSocket_ClosesSuccessfully(): void {
    const socket = createSocket("udp4");
    let closed = false;

    socket.on("close", () => {
      closed = true;
    });

    socket.bind(0, "127.0.0.1");
    socket.close();

    Assert.True(closed);
  }
}

A<CloseTests>()
  .method((t) => t.close_BoundSocket_ClosesSuccessfully)
  .add(FactAttribute);
