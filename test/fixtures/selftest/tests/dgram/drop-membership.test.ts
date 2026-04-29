import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class DropMembershipTests {
  dropMembership_LeavesMulticastGroup(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "0.0.0.0");

    // Add membership first
    socket.addMembership("224.0.0.1");

    // Then drop it - should not throw
    socket.dropMembership("224.0.0.1");

    socket.close();
  }
}

A<DropMembershipTests>()
  .method((t) => t.dropMembership_LeavesMulticastGroup)
  .add(FactAttribute);
