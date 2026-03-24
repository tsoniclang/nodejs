import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";

export class AddMembershipTests {
  public addMembership_JoinsMulticastGroup(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "0.0.0.0");

    // Should not throw
    socket.addMembership("224.0.0.1");
    socket.dropMembership("224.0.0.1");

    socket.close();
  }
}

A.on(AddMembershipTests)
  .method((t) => t.addMembership_JoinsMulticastGroup)
  .add(FactAttribute);
