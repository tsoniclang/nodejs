import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter, type EventListener } from "@tsonic/nodejs/events.js";

export class RemoveListenerTests {
  removeListener_removes_the_target_listener(): void {
    const emitter = new EventEmitter();
    let count = 0;
    const listener: EventListener = () => {
      count += 1;
    };

    emitter.on("test", listener);
    emitter.emit("test");
    Assert.Equal(1, count);

    emitter.removeListener("test", listener);
    emitter.emit("test");
    Assert.Equal(1, count);
  }

  off_remains_an_alias_for_removeListener(): void {
    const emitter = new EventEmitter();
    let count = 0;
    const listener: EventListener = () => {
      count += 1;
    };

    emitter.on("test", listener);
    emitter.emit("test");
    emitter.off("test", listener);
    emitter.emit("test");

    Assert.Equal(1, count);
  }

  removeListener_emits_the_removeListener_event(): void {
    const emitter = new EventEmitter();
    let seen: RuntimeValue | undefined = undefined;
    const listener: EventListener = () => undefined;

    emitter.on("removeListener", (name: RuntimeValue) => {
      seen = name;
    });
    emitter.on("test", listener);
    emitter.removeListener("test", listener);

    Assert.Equal("test", seen);
  }
}

A<RemoveListenerTests>()
  .method((t) => t.removeListener_removes_the_target_listener)
  .add(FactAttribute);
A<RemoveListenerTests>()
  .method((t) => t.off_remains_an_alias_for_removeListener)
  .add(FactAttribute);
A<RemoveListenerTests>()
  .method((t) => t.removeListener_emits_the_removeListener_event)
  .add(FactAttribute);
