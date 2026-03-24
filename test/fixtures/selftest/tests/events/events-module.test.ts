import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  EventEmitter,
  events,
  type EventListener,
} from "@tsonic/nodejs/events.js";

export class EventsModuleTests {
  public async events_once_resolves_on_the_next_event(): Promise<void> {
    const emitter = new EventEmitter();
    const task = events.once(emitter, "ready");

    emitter.emit("ready", 123);

    const args = await task;
    Assert.Equal(1, args.length);
    Assert.Equal(123, args[0]);
  }

  public listener_helpers_reflect_emitter_state(): void {
    const emitter = new EventEmitter();
    const listener: EventListener = () => undefined;

    emitter.on("tick", listener);

    Assert.Equal(1, events.listenerCount(emitter, "tick"));
    Assert.Equal(1, events.getEventListeners(emitter, "tick").length);

    events.setMaxListeners(5, emitter);
    Assert.Equal(5, events.getMaxListeners(emitter));
  }
}

A.on(EventsModuleTests)
  .method((t) => t.events_once_resolves_on_the_next_event)
  .add(FactAttribute);
A.on(EventsModuleTests)
  .method((t) => t.listener_helpers_reflect_emitter_state)
  .add(FactAttribute);
