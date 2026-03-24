import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter, type EventListener } from "@tsonic/nodejs/events.js";

export class OffTests {
  public off_is_an_alias_for_removeListener(): void {
    const emitter = new EventEmitter();
    let called = false;
    const listener: EventListener = () => {
      called = true;
    };

    emitter.on("test", listener);
    emitter.off("test", listener);
    emitter.emit("test");

    Assert.False(called);
  }

  public off_returns_the_emitter_for_chaining(): void {
    const emitter = new EventEmitter();
    const listener: EventListener = () => undefined;
    emitter.on("test", listener);

    const result = emitter.off("test", listener);
    Assert.True(result === emitter);
  }

  public off_removes_only_the_target_listener(): void {
    const emitter = new EventEmitter();
    let count = 0;
    const listener1: EventListener = () => {
      count += 1;
    };
    const listener2: EventListener = () => {
      count += 1;
    };

    emitter.on("test", listener1);
    emitter.on("test", listener2);
    emitter.off("test", listener1);
    emitter.emit("test");

    Assert.Equal(1, count);
  }

  public off_tolerates_missing_listeners(): void {
    const emitter = new EventEmitter();
    emitter.off("test", (): undefined => undefined);
  }
}

A.on(OffTests)
  .method((t) => t.off_is_an_alias_for_removeListener)
  .add(FactAttribute);
A.on(OffTests)
  .method((t) => t.off_returns_the_emitter_for_chaining)
  .add(FactAttribute);
A.on(OffTests)
  .method((t) => t.off_removes_only_the_target_listener)
  .add(FactAttribute);
A.on(OffTests)
  .method((t) => t.off_tolerates_missing_listeners)
  .add(FactAttribute);
