import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class UnrefTests {
  public unref_ReturnsSocket(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const result = socket.unref();
    Assert.True(result === socket);

    socket.close();
  }
}

A<UnrefTests>()
  .method((t) => t.unref_ReturnsSocket)
  .add(FactAttribute);
