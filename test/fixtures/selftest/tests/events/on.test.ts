import { attributes as A } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class OnTests {
  public on_registers_a_listener(): void {
    const emitter = new EventEmitter();
    let called = false;

    emitter.on("test", () => {
      called = true;
    });
    emitter.emit("test");

    Assert.True(called);
  }

  public on_calls_all_registered_listeners(): void {
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

  public on_passes_through_arguments(): void {
    const emitter = new EventEmitter();
    let received: JsValue | undefined = undefined;

    emitter.on("test", (arg: JsValue) => {
      received = arg;
    });
    emitter.emit("test", 42);

    Assert.Equal(42, received);
  }

  public on_returns_the_emitter(): void {
    const emitter = new EventEmitter();
    const result = emitter.on("test", () => undefined);
    Assert.True(result === emitter);
  }

  public on_supports_method_chaining(): void {
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
