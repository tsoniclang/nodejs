import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class OnTests {
  on_registers_a_listener(): void {
    const emitter = new EventEmitter();
    let called = false;

    emitter.on("test", () => {
      called = true;
    });
    emitter.emit("test");

    Assert.True(called);
  }

  on_calls_all_registered_listeners(): void {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.on("test", () => {
      count += 1;
    });
    emitter.on("test", () => {
      count += 1;
    });
    emitter.on("test", () => {
      count += 1;
    });
    emitter.emit("test");

    Assert.Equal(3, count);
  }

  on_passes_through_arguments(): void {
    const emitter = new EventEmitter();
    let received: RuntimeValue | undefined = undefined;

    emitter.on("test", (arg: RuntimeValue) => {
      received = arg;
    });
    emitter.emit("test", 42);

    Assert.Equal(42, received);
  }

  on_returns_the_emitter(): void {
    const emitter = new EventEmitter();
    const result = emitter.on("test", () => undefined);
    Assert.True(result === emitter);
  }

  on_supports_method_chaining(): void {
    const emitter = new EventEmitter();
    let count = 0;

    emitter
      .on("test", () => {
        count += 1;
      })
      .on("test", () => {
        count += 1;
      })
      .setMaxListeners(5);

    emitter.emit("test");

    Assert.Equal(2, count);
    Assert.Equal(5, emitter.getMaxListeners());
  }
}

A<OnTests>().method((t) => t.on_registers_a_listener).add(FactAttribute);
A<OnTests>()
  .method((t) => t.on_calls_all_registered_listeners)
  .add(FactAttribute);
A<OnTests>()
  .method((t) => t.on_passes_through_arguments)
  .add(FactAttribute);
A<OnTests>().method((t) => t.on_returns_the_emitter).add(FactAttribute);
A<OnTests>()
  .method((t) => t.on_supports_method_chaining)
  .add(FactAttribute);
