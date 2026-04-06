
import type {} from "./type-bootstrap.ts";

import type { int, long, out, JsValue } from "@tsonic/core/types.js";
import { Environment } from "@tsonic/dotnet/System.js";
import { ConcurrentQueue } from "@tsonic/dotnet/System.Collections.Concurrent.js";
import { Queue } from "@tsonic/dotnet/System.Collections.Generic.js";
import {
  CancellationTokenSource,
  ManualResetEventSlim,
  Thread,
} from "@tsonic/dotnet/System.Threading.js";
import { Task } from "@tsonic/dotnet/System.Threading.Tasks.js";
import { Error } from "@tsonic/js/Error.js";

const normalizeDelay = (value?: int): int => {
  if (value === undefined || value < (0 as int)) {
    return 0 as int;
  }
  return value;
};

const immediateDispatchDelay = 50 as int;

export class Timeout {
  private readonly callback: () => void;
  private readonly delay: int;
  private readonly period: int | undefined;
  private readonly cancellation: CancellationTokenSource =
    new CancellationTokenSource();
  private generation = 0;
  private disposed = false;
  private referenced = true;

  public constructor(callback: () => void, delay: int, period?: int) {
    this.callback = callback;
    this.delay = normalizeDelay(delay);
    this.period = period;
    this.schedule(this.delay);
  }

  private schedule(initialDelay: int): void {
    this.generation += 1;
    const currentGeneration = this.generation;

    Task.Run(async () => {
      try {
        await Task.Delay(initialDelay, this.cancellation.Token);

        while (!this.disposed && currentGeneration === this.generation) {
          this.callback();

          if (this.period === undefined) {
            this.dispose();
            return;
          }

          await Task.Delay(this.period, this.cancellation.Token);
        }
      } catch {
        return;
      }
    });
  }

  public ref(): Timeout {
    this.referenced = true;
    return this;
  }

  public unref(): Timeout {
    this.referenced = false;
    return this;
  }

  public hasRef(): boolean {
    return this.referenced;
  }

  public refresh(): Timeout {
    if (!this.disposed) {
      this.schedule(this.delay);
    }
    return this;
  }

  public close(): void {
    this.dispose();
  }

  public dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.cancellation.Cancel();
    this.cancellation.Dispose();
  }
}

export class Immediate {
  private static readonly pendingHandles: ConcurrentQueue<Immediate> =
    new ConcurrentQueue<Immediate>();
  private static readonly dispatchThread: Thread =
    Immediate.startDispatchThread();

  private static startDispatchThread(): Thread {
    const thread = new Thread(() => {
      let handle!: Immediate;
      while (true) {
        let hadWork = false;

        while (Immediate.pendingHandles.TryDequeue(handle as out<Immediate>)) {
          hadWork = true;
          handle.tryExecute();
        }

        if (!hadWork) {
          Thread.Sleep(1 as int);
        }
      }
    });
    thread.IsBackground = true;
    thread.Name = "nodejs.Immediate.dispatch";
    thread.Start();
    return thread;
  }

  private readonly callback: () => void;
  private readonly cancelSignal: ManualResetEventSlim =
    new ManualResetEventSlim(false);
  private readonly readyAfterTick: long =
    Environment.TickCount64 + immediateDispatchDelay;
  private disposed = false;
  private referenced = true;

  public constructor(callback: () => void) {
    this.callback = callback;
    Immediate.pendingHandles.Enqueue(this);
  }

  private tryExecute(): void {
    if (this.cancelSignal.IsSet || this.disposed) {
      return;
    }

    if (Environment.TickCount64 < this.readyAfterTick) {
      Immediate.pendingHandles.Enqueue(this);
      return;
    }

    try {
      this.callback();
    } finally {
      this.dispose();
    }
  }

  public ref(): Immediate {
    this.referenced = true;
    return this;
  }

  public unref(): Immediate {
    this.referenced = false;
    return this;
  }

  public hasRef(): boolean {
    return this.referenced;
  }

  public dispose(): void {
    if (this.disposed) {
      return;
    }

    this.disposed = true;
    this.cancelSignal.Set();
  }
}

export class TimersScheduler {
  public async wait(delay: int = 1 as int): Promise<void> {
    await Task.Delay(normalizeDelay(delay));
  }

  public async yield(): Promise<void> {
    await Task.Delay(0 as int);
  }
}

export class IntervalIterationResult<T> {
  public constructor(
    public readonly done: boolean,
    public readonly value: T | undefined
  ) {}
}

export class IntervalAsyncIterator<T> {
  private readonly queue: Queue<T | undefined> = new Queue<T | undefined>();
  private readonly waiters: Queue<
    (result: IntervalIterationResult<T>) => void
  > = new Queue<(result: IntervalIterationResult<T>) => void>();
  private readonly handle: Timeout;
  private closed = false;

  public constructor(delay: int, value?: T) {
    const actualDelay = normalizeDelay(delay);
    this.handle = new Timeout(() => {
      this.enqueue(value);
    }, actualDelay, actualDelay);
  }

  private enqueue(value?: T): void {
    if (this.closed) {
      return;
    }

    if (this.waiters.Count > 0) {
      const waiter = this.waiters.Dequeue();
      waiter(new IntervalIterationResult(false, value));
      return;
    }

    this.queue.Enqueue(value);
  }

  private close(): void {
    if (this.closed) {
      return;
    }

    this.closed = true;
    this.handle.dispose();

    while (this.waiters.Count > 0) {
      const waiter = this.waiters.Dequeue();
      waiter(new IntervalIterationResult(true, undefined));
    }
  }

  public next(): Promise<IntervalIterationResult<T>> {
    if (this.queue.Count > 0) {
      const value = this.queue.Dequeue();
      return Promise.resolve(new IntervalIterationResult(false, value));
    }

    if (this.closed) {
      return Promise.resolve(new IntervalIterationResult(true, undefined));
    }

    return new Promise<IntervalIterationResult<T>>((resolve) => {
      this.waiters.Enqueue(resolve);
    });
  }

  public return(
    value: T | undefined = undefined
  ): Promise<IntervalIterationResult<T>> {
    this.close();
    return Promise.resolve(new IntervalIterationResult(true, value));
  }

  public async throw(
    error?: JsValue
  ): Promise<IntervalIterationResult<T>> {
    this.close();
    throw error instanceof Error ? error : new Error("Promise rejected");
  }

  public [Symbol.asyncIterator](): IntervalAsyncIterator<T> {
    return this;
  }
}

export class TimersPromises {
  public readonly scheduler: TimersScheduler = new TimersScheduler();

  public async setTimeout(
    delay: int = 1 as int,
    value?: JsValue
  ): Promise<JsValue | undefined> {
    await Task.Delay(normalizeDelay(delay));
    return value;
  }

  public async setImmediate(value?: JsValue): Promise<JsValue | undefined> {
    await Task.Delay(immediateDispatchDelay);
    return value;
  }

  public setInterval(
    delay: int = 1 as int,
    value?: JsValue
  ): IntervalAsyncIterator<JsValue> {
    return new IntervalAsyncIterator(delay, value);
  }
}

export const promises = new TimersPromises();

export const setTimeout = (
  callback: () => void,
  delay: int = 0 as int
): Timeout => {
  return new Timeout(callback, normalizeDelay(delay));
};

export const clearTimeout = (timeout?: Timeout): void => {
  timeout?.dispose();
};

export const setInterval = (
  callback: () => void,
  delay: int = 0 as int
): Timeout => {
  const actualDelay = normalizeDelay(delay);
  return new Timeout(callback, actualDelay, actualDelay);
};

export const clearInterval = (timeout?: Timeout): void => {
  timeout?.dispose();
};

export const setImmediate = (callback: () => void): Immediate => {
  return new Immediate(callback);
};

export const clearImmediate = (immediate?: Immediate): void => {
  immediate?.dispose();
};

export const queueMicrotask = (callback: () => void): void => {
  Task.Run(() => {
    callback();
  });
};
