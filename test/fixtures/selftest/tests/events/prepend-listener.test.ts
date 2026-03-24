import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class PrependListenerTests {
  public prependListener_adds_to_the_front(): void {
    const emitter = new EventEmitter();
    const order: number[] = [];

    emitter.on("test", () => order.push(1));
    emitter.on("test", () => order.push(2));
    emitter.prependListener("test", () => order.push(3));
    emitter.emit("test");

    Assert.Equal(3, order.length);
    Assert.Equal(3, order[0]);
    Assert.Equal(1, order[1]);
    Assert.Equal(2, order[2]);
  }

  public prependOnceListener_adds_to_the_front_and_runs_once(): void {
    const emitter = new EventEmitter();
    const order: number[] = [];

    emitter.on("test", () => order.push(1));
    emitter.prependOnceListener("test", () => order.push(2));
    emitter.emit("test");
    emitter.emit("test");

    Assert.Equal(3, order.length);
    Assert.Equal(2, order[0]);
    Assert.Equal(1, order[1]);
    Assert.Equal(1, order[2]);
  }

  public addListener_remains_an_alias_for_on(): void {
    const emitter = new EventEmitter();
    let count = 0;

    emitter.addListener("test", () => {
      count += 1;
    });
    emitter.emit("test");

    Assert.Equal(1, count);
  }
}

A.on(PrependListenerTests)
  .method((t) => t.prependListener_adds_to_the_front)
  .add(FactAttribute);
A.on(PrependListenerTests)
  .method((t) => t.prependOnceListener_adds_to_the_front_and_runs_once)
  .add(FactAttribute);
A.on(PrependListenerTests)
  .method((t) => t.addListener_remains_an_alias_for_on)
  .add(FactAttribute);
