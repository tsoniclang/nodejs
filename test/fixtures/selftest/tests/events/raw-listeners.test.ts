import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class RawListenersTests {
  public rawListeners_returns_a_copy_of_the_listener_array(): void {
    const emitter = new EventEmitter();
    emitter.on("test", () => undefined);
    emitter.on("test", () => undefined);

    Assert.Equal(2, emitter.rawListeners("test").length);
  }

  public rawListeners_returns_empty_for_missing_events(): void {
    const emitter = new EventEmitter();
    Assert.Equal(0, emitter.rawListeners("missing").length);
  }

  public rawListeners_returns_a_fresh_array_each_time(): void {
    const emitter = new EventEmitter();
    emitter.on("test", () => undefined);

    const first = emitter.rawListeners("test");
    const second = emitter.rawListeners("test");

    Assert.False(first === second);
  }

  public rawListeners_includes_once_wrappers(): void {
    const emitter = new EventEmitter();
    emitter.once("test", () => undefined);

    Assert.Equal(1, emitter.rawListeners("test").length);
  }
}

A.on(RawListenersTests)
  .method((t) => t.rawListeners_returns_a_copy_of_the_listener_array)
  .add(FactAttribute);
A.on(RawListenersTests)
  .method((t) => t.rawListeners_returns_empty_for_missing_events)
  .add(FactAttribute);
A.on(RawListenersTests)
  .method((t) => t.rawListeners_returns_a_fresh_array_each_time)
  .add(FactAttribute);
A.on(RawListenersTests)
  .method((t) => t.rawListeners_includes_once_wrappers)
  .add(FactAttribute);
