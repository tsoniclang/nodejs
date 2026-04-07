import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class ListenerCountTests {
  public listenerCount_returns_the_number_of_registered_listeners(): void {
    const emitter = new EventEmitter();

    emitter.on("test", () => undefined);
    emitter.on("test", () => undefined);
    emitter.on("test", () => undefined);

    Assert.Equal(3, emitter.listenerCount("test"));
  }

  public listenerCount_returns_zero_without_listeners(): void {
    const emitter = new EventEmitter();
    Assert.Equal(0, emitter.listenerCount("test"));
  }
}

A<ListenerCountTests>()
  .method((t) => t.listenerCount_returns_the_number_of_registered_listeners)
  .add(FactAttribute);
A<ListenerCountTests>()
  .method((t) => t.listenerCount_returns_zero_without_listeners)
  .add(FactAttribute);
