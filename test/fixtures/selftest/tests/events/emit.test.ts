import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class EmitTests {
  public emit_without_listeners_returns_false(): void {
    const emitter = new EventEmitter();
    Assert.False(emitter.emit("test"));
  }

  public emit_with_listeners_returns_true(): void {
    const emitter = new EventEmitter();
    emitter.on("test", () => undefined);
    Assert.True(emitter.emit("test"));
  }

  public emit_error_without_listeners_throws(): void {
    const emitter = new EventEmitter();
    let threw = false;

    try {
      emitter.emit("error", new Error("boom"));
    } catch {
      threw = true;
    }

    Assert.True(threw);
  }

  public emit_error_with_listener_routes_the_error(): void {
    const emitter = new EventEmitter();
    let message = "";

    emitter.on("error", (error: unknown) => {
      if (error instanceof Error) {
        message = error.message;
      }
    });
    emitter.emit("error", new Error("boom"));

    Assert.Equal("boom", message);
  }

  public emit_passes_all_arguments_to_the_listener(): void {
    const emitter = new EventEmitter();
    let first: unknown = undefined;
    let second: unknown = undefined;
    let third: unknown = undefined;

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

A.on(EmitTests)
  .method((t) => t.emit_without_listeners_returns_false)
  .add(FactAttribute);
A.on(EmitTests)
  .method((t) => t.emit_with_listeners_returns_true)
  .add(FactAttribute);
A.on(EmitTests)
  .method((t) => t.emit_error_without_listeners_throws)
  .add(FactAttribute);
A.on(EmitTests)
  .method((t) => t.emit_error_with_listener_routes_the_error)
  .add(FactAttribute);
A.on(EmitTests)
  .method((t) => t.emit_passes_all_arguments_to_the_listener)
  .add(FactAttribute);
