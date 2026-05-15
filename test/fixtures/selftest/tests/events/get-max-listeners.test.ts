import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";

export class GetMaxListenersTests {
  getMaxListeners_returns_the_default_value(): void {
    const emitter = new EventEmitter();
    Assert.Equal(10, emitter.getMaxListeners());
  }

  getMaxListeners_returns_the_configured_value(): void {
    const emitter = new EventEmitter();
    emitter.setMaxListeners(20);
    Assert.Equal(20, emitter.getMaxListeners());
  }

  getMaxListeners_allows_zero(): void {
    const emitter = new EventEmitter();
    emitter.setMaxListeners(0);
    Assert.Equal(0, emitter.getMaxListeners());
  }
}

A<GetMaxListenersTests>()
  .method((t) => t.getMaxListeners_returns_the_default_value)
  .add(FactAttribute);
A<GetMaxListenersTests>()
  .method((t) => t.getMaxListeners_returns_the_configured_value)
  .add(FactAttribute);
A<GetMaxListenersTests>()
  .method((t) => t.getMaxListeners_allows_zero)
  .add(FactAttribute);
