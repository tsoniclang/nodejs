import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class PrependOnceListenerTests {
  prependOnceListener_executes_only_once(): void {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.prependOnceListener("test", () => {
      count += 1;
    });
    emitter.emit("test");
    emitter.emit("test");

    Assert.Equal(1, count);
  }

  prependOnceListener_adds_to_the_beginning(): void {
    const emitter = new EventEmitter();
    const order: number[] = [];

    emitter.on("test", () => order.push(1));
    emitter.on("test", () => order.push(2));
    emitter.prependOnceListener("test", () => order.push(3));
    emitter.emit("test");

    Assert.Equal(3, order.length);
    Assert.Equal(3, order[0]);
    Assert.Equal(1, order[1]);
    Assert.Equal(2, order[2]);
  }

  prependOnceListener_returns_the_emitter(): void {
    const emitter = new EventEmitter();
    const result = emitter.prependOnceListener("test", () => undefined);
    Assert.True(result === emitter);
  }

  prependOnceListener_removes_itself_after_execution(): void {
    const emitter = new EventEmitter();
    emitter.prependOnceListener("test", () => undefined);

    emitter.emit("test");
    Assert.Equal(0, emitter.listenerCount("test"));
  }

  prependOnceListener_passes_through_arguments(): void {
    const emitter = new EventEmitter();
    let received = 0;

    emitter.prependOnceListener("test", (value: RuntimeValue) => {
      if (typeof value === "number") {
        received = value;
      }
    });
    emitter.emit("test", 42);

    Assert.Equal(42, received);
  }
}

A<PrependOnceListenerTests>()
  .method((t) => t.prependOnceListener_executes_only_once)
  .add(FactAttribute);
A<PrependOnceListenerTests>()
  .method((t) => t.prependOnceListener_adds_to_the_beginning)
  .add(FactAttribute);
A<PrependOnceListenerTests>()
  .method((t) => t.prependOnceListener_returns_the_emitter)
  .add(FactAttribute);
A<PrependOnceListenerTests>()
  .method((t) => t.prependOnceListener_removes_itself_after_execution)
  .add(FactAttribute);
A<PrependOnceListenerTests>()
  .method((t) => t.prependOnceListener_passes_through_arguments)
  .add(FactAttribute);
