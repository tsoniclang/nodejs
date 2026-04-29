import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

import { assertThrows } from "./helpers.ts";

export class EventEmitterOnceStaticTests {
  async once_static_resolves_when_the_event_is_emitted(): Promise<void> {
    const emitter = new EventEmitter();
    const task = EventEmitter.once(emitter, "test");

    emitter.emit("test", "arg1", "arg2");

    const args = await task;
    Assert.Equal(2, args.length);
    Assert.Equal("arg1", args[0]);
    Assert.Equal("arg2", args[1]);
  }

  async once_static_works_with_no_arguments(): Promise<void> {
    const emitter = new EventEmitter();
    const task = EventEmitter.once(emitter, "noargs");

    emitter.emit("noargs");

    const args = await task;
    Assert.Equal(0, args.length);
  }

  async once_static_only_observes_the_first_emission(): Promise<void> {
    const emitter = new EventEmitter();
    const task = EventEmitter.once(emitter, "once");

    emitter.emit("once", 1);
    emitter.emit("once", 2);

    const args = await task;
    Assert.Equal(1, args.length);
    Assert.Equal(1 as number, args[0] as number);
  }

  once_static_rejects_missing_emitter(): void {
    assertThrows(() => EventEmitter.once(undefined as never, "test"));
  }

  once_static_rejects_missing_event_name(): void {
    const emitter = new EventEmitter();
    assertThrows(() => EventEmitter.once(emitter, undefined as never));
  }
}

A<EventEmitterOnceStaticTests>()
  .method((t) => t.once_static_resolves_when_the_event_is_emitted)
  .add(FactAttribute);
A<EventEmitterOnceStaticTests>()
  .method((t) => t.once_static_works_with_no_arguments)
  .add(FactAttribute);
A<EventEmitterOnceStaticTests>()
  .method((t) => t.once_static_only_observes_the_first_emission)
  .add(FactAttribute);
A<EventEmitterOnceStaticTests>()
  .method((t) => t.once_static_rejects_missing_emitter)
  .add(FactAttribute);
A<EventEmitterOnceStaticTests>()
  .method((t) => t.once_static_rejects_missing_event_name)
  .add(FactAttribute);
