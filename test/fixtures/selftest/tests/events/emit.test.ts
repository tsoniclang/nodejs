import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class EmitTests {
  emit_without_listeners_returns_false(): void {
    const emitter = new EventEmitter();
    Assert.False(emitter.emit("test"));
  }

  emit_with_listeners_returns_true(): void {
    const emitter = new EventEmitter();
    emitter.on("test", () => undefined);
    Assert.True(emitter.emit("test"));
  }

  emit_error_without_listeners_throws(): void {
    const emitter = new EventEmitter();
    let threw = false;

    try {
      emitter.emit("error", new Error("boom"));
    } catch {
      threw = true;
    }

    Assert.True(threw);
  }

  emit_error_with_listener_routes_the_error(): void {
    const emitter = new EventEmitter();
    let message = "";

    emitter.on("error", (error: RuntimeValue) => {
      if (error instanceof Error) {
        message = error.message;
      }
    });
    emitter.emit("error", new Error("boom"));

    Assert.Equal("boom", message);
  }

  emit_passes_all_arguments_to_the_listener(): void {
    const emitter = new EventEmitter();
    let first: RuntimeValue | undefined = undefined;
    let second: RuntimeValue | undefined = undefined;
    let third: RuntimeValue | undefined = undefined;

    emitter.on("test", (arg1, arg2, arg3) => {
      first = arg1;
      second = arg2;
      third = arg3;
    });
    emitter.emit("test", "arg1", 42, true);

    Assert.Equal("arg1", first);
    Assert.Equal(42, second);
    Assert.Equal(true, third);
  }
}

A<EmitTests>()
  .method((t) => t.emit_without_listeners_returns_false)
  .add(FactAttribute);
A<EmitTests>()
  .method((t) => t.emit_with_listeners_returns_true)
  .add(FactAttribute);
A<EmitTests>()
  .method((t) => t.emit_error_without_listeners_throws)
  .add(FactAttribute);
A<EmitTests>()
  .method((t) => t.emit_error_with_listener_routes_the_error)
  .add(FactAttribute);
A<EmitTests>()
  .method((t) => t.emit_passes_all_arguments_to_the_listener)
  .add(FactAttribute);
