import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class RemoteAddressTests {
  public remoteAddress_UnconnectedSocket_ThrowsException(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    assertThrows(() => socket.remoteAddress());
    socket.close();
  }
}

A<RemoteAddressTests>()
  .method((t) => t.remoteAddress_UnconnectedSocket_ThrowsException)
  .add(FactAttribute);
