import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class SetMulticastTTLTests {
  public setMulticastTTL_SetsTTL(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const result = socket.setMulticastTTL(128);
    Assert.Equal(128, result);

    socket.close();
  }
}

A<SetMulticastTTLTests>()
  .method((t) => t.setMulticastTTL_SetsTTL)
  .add(FactAttribute);
