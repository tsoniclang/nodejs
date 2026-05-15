import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class AddressTests {
  address_UnboundSocket_ThrowsException(): void {
    const socket = createSocket("udp4");
    assertThrows(() => socket.address());
    socket.close();
  }
}

A<AddressTests>()
  .method((t) => t.address_UnboundSocket_ThrowsException)
  .add(FactAttribute);
