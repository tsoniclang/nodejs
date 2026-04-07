import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as timers from "@tsonic/nodejs/timers.js";

export class TimersPromisesTests {
  public async setTimeout_should_resolve_value(): Promise<void> {
    const value = await timers.promises.setTimeout(10 as int, "ok");
    Assert.Equal("ok", value);
  }

  public async setImmediate_should_resolve_value(): Promise<void> {
    const value = await timers.promises.setImmediate(123);
    Assert.Equal(123, value);
  }

  public async setInterval_should_yield_values(): Promise<void> {
    const iterator = timers.promises.setInterval(1 as int, "tick");
    try {
      const first = await iterator.next();
      Assert.False(first.done === true);
      Assert.Equal("tick", first.value);
    } finally {
      await iterator.return();
    }
  }

  public async scheduler_wait_should_complete(): Promise<void> {
    await timers.promises.scheduler.wait(1 as int);
  }
}

A<TimersPromisesTests>()
  .method((t) => t.setTimeout_should_resolve_value)
  .add(FactAttribute);
A<TimersPromisesTests>()
  .method((t) => t.setImmediate_should_resolve_value)
  .add(FactAttribute);
A<TimersPromisesTests>()
  .method((t) => t.setInterval_should_yield_values)
  .add(FactAttribute);
A<TimersPromisesTests>()
  .method((t) => t.scheduler_wait_should_complete)
  .add(FactAttribute);
