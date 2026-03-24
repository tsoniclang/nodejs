import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

import { assertThrows } from "./helpers.ts";

export class SetMaxListenersTests {
  public setMaxListeners_sets_the_limit(): void {
    const emitter = new EventEmitter();
    emitter.setMaxListeners(5);
    Assert.Equal(5, emitter.getMaxListeners());
  }

  public setMaxListeners_rejects_negative_values(): void {
    const emitter = new EventEmitter();
    assertThrows(() => emitter.setMaxListeners(-1));
  }

  public getMaxListeners_defaults_to_ten(): void {
    const emitter = new EventEmitter();
    Assert.Equal(10, emitter.getMaxListeners());
  }

  public defaultMaxListeners_defaults_to_ten(): void {
    Assert.Equal(10, EventEmitter.defaultMaxListeners);
  }

  public defaultMaxListeners_can_be_modified(): void {
    const original = EventEmitter.defaultMaxListeners;

    try {
      EventEmitter.defaultMaxListeners = 20;
      Assert.Equal(20, EventEmitter.defaultMaxListeners);
    } finally {
      EventEmitter.defaultMaxListeners = original;
    }
  }
}

A.on(SetMaxListenersTests)
  .method((t) => t.setMaxListeners_sets_the_limit)
  .add(FactAttribute);
A.on(SetMaxListenersTests)
  .method((t) => t.setMaxListeners_rejects_negative_values)
  .add(FactAttribute);
A.on(SetMaxListenersTests)
  .method((t) => t.getMaxListeners_defaults_to_ten)
  .add(FactAttribute);
A.on(SetMaxListenersTests)
  .method((t) => t.defaultMaxListeners_defaults_to_ten)
  .add(FactAttribute);
A.on(SetMaxListenersTests)
  .method((t) => t.defaultMaxListeners_can_be_modified)
  .add(FactAttribute);
