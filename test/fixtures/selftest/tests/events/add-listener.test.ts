import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class AddListenerTests {
  public addListener_is_an_alias_for_on(): void {
    const emitter = new EventEmitter();
    let called = false;

    emitter.addListener("test", () => {
      called = true;
    });
    emitter.emit("test");

    Assert.True(called);
  }

  public addListener_returns_the_emitter_for_chaining(): void {
    const emitter = new EventEmitter();
    const result = emitter.addListener("test", () => undefined);
    Assert.True(result === emitter);
  }

  public addListener_appends_to_the_end_of_the_listener_list(): void {
    const emitter = new EventEmitter();
    const order: number[] = [];

    emitter.addListener("test", () => order.push(1));
    emitter.addListener("test", () => order.push(2));
    emitter.addListener("test", () => order.push(3));
    emitter.emit("test");

    Assert.Equal(3, order.length);
    Assert.Equal(1, order[0]);
    Assert.Equal(2, order[1]);
    Assert.Equal(3, order[2]);
  }
}

A.on(AddListenerTests)
  .method((t) => t.addListener_is_an_alias_for_on)
  .add(FactAttribute);
A.on(AddListenerTests)
  .method((t) => t.addListener_returns_the_emitter_for_chaining)
  .add(FactAttribute);
A.on(AddListenerTests)
  .method((t) => t.addListener_appends_to_the_end_of_the_listener_list)
  .add(FactAttribute);
