import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class AddSourceSpecificMembershipTests {
  public addSourceSpecificMembership_ThrowsNotSupported(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "0.0.0.0");

    assertThrows(() => socket.addSourceSpecificMembership("192.168.1.1", "224.0.0.1"));

    socket.close();
  }
}

A.on(AddSourceSpecificMembershipTests)
  .method((t) => t.addSourceSpecificMembership_ThrowsNotSupported)
  .add(FactAttribute);
