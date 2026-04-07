import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class CreateSocketTests {
  public createSocket_UDP4_CreatesSocket(): void {
    const socket = createSocket("udp4");
    Assert.NotNull(socket);
    socket.close();
  }

  public createSocket_UDP6_CreatesSocket(): void {
    const socket = createSocket("udp6");
    Assert.NotNull(socket);
    socket.close();
  }

  public createSocket_WithCallback_AttachesMessageListener(): void {
    let callbackAttached = false;

    const socket = createSocket("udp4", () => {
      callbackAttached = true;
    });

    // The callback is attached as a "message" listener
    Assert.NotNull(socket);
    socket.close();
  }
}

A<CreateSocketTests>()
  .method((t) => t.createSocket_UDP4_CreatesSocket)
  .add(FactAttribute);
A<CreateSocketTests>()
  .method((t) => t.createSocket_UDP6_CreatesSocket)
  .add(FactAttribute);
A<CreateSocketTests>()
  .method((t) => t.createSocket_WithCallback_AttachesMessageListener)
  .add(FactAttribute);
