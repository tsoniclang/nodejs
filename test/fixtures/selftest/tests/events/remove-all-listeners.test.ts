import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class RemoveAllListenersTests {
  public removeAllListeners_without_an_event_name_clears_everything(): void {
    const emitter = new EventEmitter();
    let count1 = 0;
    let count2 = 0;

    emitter.on("event1", () => {
      count1 += 1;
    });
    emitter.on("event2", () => {
      count2 += 1;
    });
    emitter.removeAllListeners();
    emitter.emit("event1");
    emitter.emit("event2");

    Assert.Equal(0, count1);
    Assert.Equal(0, count2);
  }

  public removeAllListeners_with_an_event_name_clears_only_that_event(): void {
    const emitter = new EventEmitter();
    let count1 = 0;
    let count2 = 0;

    emitter.on("event1", () => {
      count1 += 1;
    });
    emitter.on("event2", () => {
      count2 += 1;
    });
    emitter.removeAllListeners("event1");
    emitter.emit("event1");
    emitter.emit("event2");

    Assert.Equal(0, count1);
    Assert.Equal(1, count2);
  }
}

A.on(RemoveAllListenersTests)
  .method((t) => t.removeAllListeners_without_an_event_name_clears_everything)
  .add(FactAttribute);
A.on(RemoveAllListenersTests)
  .method((t) => t.removeAllListeners_with_an_event_name_clears_only_that_event)
  .add(FactAttribute);
