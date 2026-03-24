import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class OnceTests {
  public once_invokes_the_listener_only_once(): void {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.once("test", () => {
      count += 1;
    });
    emitter.emit("test");
    emitter.emit("test");
    emitter.emit("test");

    Assert.Equal(1, count);
  }
}

A.on(OnceTests)
  .method((t) => t.once_invokes_the_listener_only_once)
  .add(FactAttribute);
