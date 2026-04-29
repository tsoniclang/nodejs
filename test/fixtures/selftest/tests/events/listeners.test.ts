import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter, type EventListener } from "@tsonic/nodejs/events.js";

export class ListenersTests {
  listeners_returns_the_listener_array(): void {
    const emitter = new EventEmitter();
    const listener1: EventListener = () => undefined;
    const listener2: EventListener = () => undefined;

    emitter.on("test", listener1);
    emitter.on("test", listener2);

    Assert.Equal(2, emitter.listeners("test").length);
  }

  listeners_returns_empty_for_unknown_events(): void {
    const emitter = new EventEmitter();
    Assert.Equal(0, emitter.listeners("test").length);
  }

  rawListeners_returns_registered_listeners(): void {
    const emitter = new EventEmitter();
    emitter.on("test", (): undefined => undefined);
    Assert.Equal(1, emitter.rawListeners("test").length);
  }
}

A<ListenersTests>()
  .method((t) => t.listeners_returns_the_listener_array)
  .add(FactAttribute);
A<ListenersTests>()
  .method((t) => t.listeners_returns_empty_for_unknown_events)
  .add(FactAttribute);
A<ListenersTests>()
  .method((t) => t.rawListeners_returns_registered_listeners)
  .add(FactAttribute);
