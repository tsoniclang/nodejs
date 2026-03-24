
import type {} from "./type-bootstrap.js";

import type { int, long, out } from "@tsonic/core/types.js";
import { Environment } from "@tsonic/dotnet/System.js";
import { ConcurrentQueue } from "@tsonic/dotnet/System.Collections.Concurrent.js";
import {
  CancellationTokenSource,
  ManualResetEventSlim,
  Thread,
} from "@tsonic/dotnet/System.Threading.js";
import { Task } from "@tsonic/dotnet/System.Threading.Tasks.js";

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
  private readonly period?: int;
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
      let handle: Immediate = undefined as unknown as Immediate;
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

export class TimersPromises {
  public readonly scheduler: TimersScheduler = new TimersScheduler();

  public async setTimeout(
    delay: int = 1 as int,
    value?: unknown
  ): Promise<unknown> {
    await Task.Delay(normalizeDelay(delay));
    return value;
  }

  public async setImmediate(value?: unknown): Promise<unknown> {
    await Task.Delay(immediateDispatchDelay);
    return value;
  }

  public async *setInterval(
    delay: int = 1 as int,
    value?: unknown
  ): AsyncGenerator<unknown, void, unknown> {
    const actualDelay = normalizeDelay(delay);
    while (true) {
      await Task.Delay(actualDelay);
      yield value;
    }
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
