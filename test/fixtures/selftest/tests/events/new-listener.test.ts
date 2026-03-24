import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class NewListenerTests {
  public newListener_event_fires_for_new_registrations(): void {
    const emitter = new EventEmitter();
    let seen: unknown = undefined;

    emitter.on("newListener", (name: unknown) => {
      seen = name;
    });
    emitter.on("test", () => undefined);

    Assert.Equal("test", seen);
  }
}

A.on(NewListenerTests)
  .method((t) => t.newListener_event_fires_for_new_registrations)
  .add(FactAttribute);
