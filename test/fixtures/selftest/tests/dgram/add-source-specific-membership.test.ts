import { attributes as A } from "@tsonic/core/lang.js";
import { FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class AddSourceSpecificMembershipTests {
  addSourceSpecificMembership_DoesNotThrow(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "0.0.0.0");
    socket.addSourceSpecificMembership("192.168.1.1", "224.0.0.1");
    socket.close();
  }
}

A<AddSourceSpecificMembershipTests>()
  .method((t) => t.addSourceSpecificMembership_DoesNotThrow)
  .add(FactAttribute);
