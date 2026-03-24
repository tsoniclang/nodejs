import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class EventNamesTests {
  public eventNames_returns_registered_events(): void {
    const emitter = new EventEmitter();

    emitter.on("event1", () => undefined);
    emitter.on("event2", () => undefined);
    emitter.on("event3", () => undefined);

    const names = emitter.eventNames();
    Assert.Equal(3, names.length);
    Assert.True(names.includes("event1"));
    Assert.True(names.includes("event2"));
    Assert.True(names.includes("event3"));
  }

  public eventNames_returns_empty_for_an_idle_emitter(): void {
    const emitter = new EventEmitter();
    Assert.Equal(0, emitter.eventNames().length);
  }
}

A.on(EventNamesTests)
  .method((t) => t.eventNames_returns_registered_events)
  .add(FactAttribute);
A.on(EventNamesTests)
  .method((t) => t.eventNames_returns_empty_for_an_idle_emitter)
  .add(FactAttribute);
