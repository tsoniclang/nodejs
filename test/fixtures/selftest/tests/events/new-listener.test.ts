import { attributes as A } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class NewListenerTests {
  newListener_event_fires_for_new_registrations(): void {
    const emitter = new EventEmitter();
    let seen: RuntimeValue | undefined = undefined;

    emitter.on("newListener", (name: RuntimeValue) => {
      seen = name;
    });
    emitter.on("test", () => undefined);

    Assert.Equal("test", seen);
  }
}

A<NewListenerTests>()
  .method((t) => t.newListener_event_fires_for_new_registrations)
  .add(FactAttribute);
