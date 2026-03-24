import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class ConnectTests {
  public connect_ToRemote_ConnectsSuccessfully(): void {
    const server = createSocket("udp4");
    server.bind(0, "127.0.0.1");

    const addr = server.address();
    const client = createSocket("udp4");

    let connected = false;
    client.on("connect", () => {
      connected = true;
    });

    client.connect(addr.port, "127.0.0.1");

    Assert.True(connected);

    const remoteAddr = client.remoteAddress();
    Assert.Equal("127.0.0.1", remoteAddr.address);
    Assert.Equal(addr.port, remoteAddr.port);

    client.close();
    server.close();
  }
}

A.on(ConnectTests)
  .method((t) => t.connect_ToRemote_ConnectsSuccessfully)
  .add(FactAttribute);
