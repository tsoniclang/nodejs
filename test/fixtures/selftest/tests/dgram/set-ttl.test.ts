import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class SetTTLTests {
  public setTTL_SetsTTL(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const result = socket.setTTL(128);
    Assert.Equal(128, result);

    socket.close();
  }

  public setTTL_InvalidValue_ThrowsException(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    assertThrows(() => socket.setTTL(0));
    assertThrows(() => socket.setTTL(256));

    socket.close();
  }
}

A<SetTTLTests>()
  .method((t) => t.setTTL_SetsTTL)
  .add(FactAttribute);
A<SetTTLTests>()
  .method((t) => t.setTTL_InvalidValue_ThrowsException)
  .add(FactAttribute);
