import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetMulticastInterfaceTests {
  setMulticastInterface_SetsInterface(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "0.0.0.0");

    // Should not throw when setting a valid local interface IP
    socket.setMulticastInterface("127.0.0.1");

    socket.close();
  }
}

A<SetMulticastInterfaceTests>()
  .method((t) => t.setMulticastInterface_SetsInterface)
  .add(FactAttribute);
