import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { ManualResetEventSlim, Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Immediate,
  Timeout,
} from "@tsonic/nodejs/index.js";
import * as timers from "@tsonic/nodejs/timers.js";

export class TimersTests {
  public setTimeout_should_execute_callback(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executed = false;
    const timeout = timers.setTimeout(() => {
      executed = true;
      resetEvent.Set();
    }, 50 as int);

    const signaled = resetEvent.Wait(1000 as int);
    timers.clearTimeout(timeout);
    Assert.True(signaled);
    Assert.True(executed);
  }

  public setTimeout_should_return_timeout(): void {
    const timeout = timers.setTimeout(() => undefined, 10 as int);
    Assert.True(timeout !== undefined);
    Assert.True(timeout instanceof Timeout);
    timers.clearTimeout(timeout);
  }

  public setTimeout_with_zero_delay_should_execute(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executed = false;
    const timeout = timers.setTimeout(() => {
      executed = true;
      resetEvent.Set();
    }, 0 as int);

    const signaled = resetEvent.Wait(1000 as int);
    timers.clearTimeout(timeout);
    Assert.True(signaled);
    Assert.True(executed);
  }

  public clearTimeout_should_cancel_timeout(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executed = false;
    const timeout = timers.setTimeout(() => {
      executed = true;
      resetEvent.Set();
    }, 50 as int);

    timers.clearTimeout(timeout);
    const signaled = resetEvent.Wait(200 as int);
    Assert.False(signaled);
    Assert.False(executed);
  }

  public clearTimeout_with_undefined_should_not_throw(): void {
    timers.clearTimeout(undefined);
  }

  public setInterval_should_execute_repeatedly_async(): void {
    let count = 0;
    const resetEvent = new ManualResetEventSlim(false);
    const timeout = timers.setInterval(() => {
      count += 1;
      if (count >= 3) {
        resetEvent.Set();
      }
    }, 50 as int);

    const signaled = resetEvent.Wait(2000 as int);
    timers.clearInterval(timeout);
    Assert.True(signaled);
    Assert.True(count >= 3);
  }

  public clearInterval_should_not_throw(): void {
    let count = 0;
    const resetEvent = new ManualResetEventSlim(false);
    const timeout = timers.setInterval(() => {
      count += 1;
      resetEvent.Set();
    }, 50 as int);

    const signaled = resetEvent.Wait(5000 as int);
    timers.clearInterval(timeout);
    Assert.True(signaled);
    Assert.True(count > 0);
  }

  public setImmediate_should_execute_callback(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executed = false;
    const immediate = timers.setImmediate(() => {
      executed = true;
      resetEvent.Set();
    });

    const signaled = resetEvent.Wait(1000 as int);
    timers.clearImmediate(immediate);
    Assert.True(signaled);
    Assert.True(executed);
  }

  public setImmediate_should_execute_callback_reliably(): void {
    for (let index = 0 as int; index < (10 as int); index += 1 as int) {
      const resetEvent = new ManualResetEventSlim(false);
      let executed = false;
      const immediate = timers.setImmediate(() => {
        executed = true;
        resetEvent.Set();
      });

      try {
        const signaled = resetEvent.Wait(1000 as int);
        Assert.True(signaled);
        Assert.True(executed);
      } finally {
        timers.clearImmediate(immediate);
      }
    }
  }

  public setImmediate_should_return_immediate(): void {
    const immediate = timers.setImmediate(() => undefined);
    Assert.True(immediate !== undefined);
    Assert.True(immediate instanceof Immediate);
    timers.clearImmediate(immediate);
  }

  public clearImmediate_should_cancel_immediate(): void {
    let executed = false;
    const immediate = timers.setImmediate(() => {
      executed = true;
    });

    timers.clearImmediate(immediate);
    Thread.Sleep(100 as int);
    Assert.False(executed);
  }

  public clearImmediate_should_cancel_immediate_reliably(): void {
    for (let index = 0 as int; index < (10 as int); index += 1 as int) {
      let executed = false;
      const immediate = timers.setImmediate(() => {
        executed = true;
      });

      timers.clearImmediate(immediate);
      Thread.Sleep(20 as int);
      Assert.False(executed);
    }
  }

  public clearImmediate_should_cancel_immediate_at_scale(): void {
    for (let index = 0 as int; index < (100 as int); index += 1 as int) {
      const resetEvent = new ManualResetEventSlim(false);
      let executed = false;
      const immediate = timers.setImmediate(() => {
        executed = true;
        resetEvent.Set();
      });

      timers.clearImmediate(immediate);
      const signaled = resetEvent.Wait(20 as int);
      Assert.False(signaled);
      Assert.False(executed);
    }
  }

  public clearImmediate_should_cancel_all_pending_immediates(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executedCount = 0;
    const immediates: Immediate[] = [];

    for (let index = 0 as int; index < (32 as int); index += 1 as int) {
      immediates.push(
        timers.setImmediate(() => {
          executedCount += 1;
          if (executedCount === 1) {
            resetEvent.Set();
          }
        }),
      );
    }

    for (const immediate of immediates) {
      timers.clearImmediate(immediate);
    }

    const signaled = resetEvent.Wait(20 as int);
    Assert.False(signaled);
    Assert.True(executedCount === 0);
  }

  public clearImmediate_with_undefined_should_not_throw(): void {
    timers.clearImmediate(undefined);
  }

  public queueMicrotask_should_execute_callback(): void {
    const resetEvent = new ManualResetEventSlim(false);
    let executed = false;
    timers.queueMicrotask(() => {
      executed = true;
      resetEvent.Set();
    });

    const signaled = resetEvent.Wait(1000 as int);
    Assert.True(signaled);
    Assert.True(executed);
  }

  public Timeout_ref_should_return_this(): void {
    const timeout = timers.setTimeout(() => undefined, 100 as int);
    const result = timeout.ref();
    Assert.True(result === timeout);
    timers.clearTimeout(timeout);
  }

  public Timeout_unref_should_return_this(): void {
    const timeout = timers.setTimeout(() => undefined, 100 as int);
    const result = timeout.unref();
    Assert.True(result === timeout);
    timers.clearTimeout(timeout);
  }

  public Timeout_hasRef_should_return_true(): void {
    const timeout = timers.setTimeout(() => undefined, 100 as int);
    Assert.True(timeout.hasRef());
    timers.clearTimeout(timeout);
  }

  public Timeout_hasRef_after_unref_should_return_false(): void {
    const timeout = timers.setTimeout(() => undefined, 100 as int);
    timeout.unref();
    Assert.False(timeout.hasRef());
    timers.clearTimeout(timeout);
  }

  public Timeout_refresh_should_return_this(): void {
    const timeout = timers.setTimeout(() => undefined, 100 as int);
    const result = timeout.refresh();
    Assert.True(result === timeout);
    timers.clearTimeout(timeout);
  }

  public Timeout_close_should_cancel_timeout(): void {
    let executed = false;
    const timeout = timers.setTimeout(() => {
      executed = true;
    }, 50 as int);

    timeout.close();
    Thread.Sleep(100 as int);
    Assert.False(executed);
  }

  public Immediate_ref_should_return_this(): void {
    const immediate = timers.setImmediate(() => undefined);
    const result = immediate.ref();
    Assert.True(result === immediate);
    timers.clearImmediate(immediate);
  }

  public Immediate_unref_should_return_this(): void {
    const immediate = timers.setImmediate(() => undefined);
    const result = immediate.unref();
    Assert.True(result === immediate);
    timers.clearImmediate(immediate);
  }

  public Immediate_hasRef_should_return_true(): void {
    const immediate = timers.setImmediate(() => undefined);
    Assert.True(immediate.hasRef());
    timers.clearImmediate(immediate);
  }

  public Immediate_hasRef_after_unref_should_return_false(): void {
    const immediate = timers.setImmediate(() => undefined);
    immediate.unref();
    Assert.False(immediate.hasRef());
    timers.clearImmediate(immediate);
  }
}

A.on(TimersTests)
  .method((t) => t.setTimeout_should_execute_callback)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setTimeout_should_return_timeout)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setTimeout_with_zero_delay_should_execute)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearTimeout_should_cancel_timeout)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearTimeout_with_undefined_should_not_throw)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setInterval_should_execute_repeatedly_async)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearInterval_should_not_throw)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setImmediate_should_execute_callback)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setImmediate_should_execute_callback_reliably)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.setImmediate_should_return_immediate)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearImmediate_should_cancel_immediate)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearImmediate_should_cancel_immediate_reliably)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearImmediate_should_cancel_immediate_at_scale)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearImmediate_should_cancel_all_pending_immediates)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.clearImmediate_with_undefined_should_not_throw)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.queueMicrotask_should_execute_callback)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_ref_should_return_this)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_unref_should_return_this)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_hasRef_should_return_true)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_hasRef_after_unref_should_return_false)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_refresh_should_return_this)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Timeout_close_should_cancel_timeout)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Immediate_ref_should_return_this)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Immediate_unref_should_return_this)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Immediate_hasRef_should_return_true)
  .add(FactAttribute);
A.on(TimersTests)
  .method((t) => t.Immediate_hasRef_after_unref_should_return_false)
  .add(FactAttribute);
