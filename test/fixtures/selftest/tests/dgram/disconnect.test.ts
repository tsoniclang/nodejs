import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class DisconnectTests {
  disconnect_ConnectedSocket_Disconnects(): void {
    const server = createSocket("udp4");
    server.bind(0, "127.0.0.1");

    const addr = server.address();
    const client = createSocket("udp4");
    client.connect(addr.port, "127.0.0.1");

    // Should not throw
    client.disconnect();

    // Should throw after disconnect
    assertThrows(() => client.remoteAddress());

    client.close();
    server.close();
  }
}

A<DisconnectTests>()
  .method((t) => t.disconnect_ConnectedSocket_Disconnects)
  .add(FactAttribute);
