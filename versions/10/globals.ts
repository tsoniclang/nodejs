import type { int } from "@tsonic/core/types.js";
import type { Immediate, Timeout } from "./src/timers-module.js";

declare global {
  interface Console {
    trace(...data: unknown[]): void;
    assert(
      condition: boolean,
      message?: string,
      ...optionalParams: unknown[]
    ): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    dir(obj?: unknown, ...options: unknown[]): void;
    dirxml(...data: unknown[]): void;
    group(...data: unknown[]): void;
    groupCollapsed(...data: unknown[]): void;
    groupEnd(): void;
    table(data?: unknown, properties?: string[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: unknown[]): void;
  }

  function setTimeout(
    handler: (...args: unknown[]) => void,
    timeout?: int,
    ...args: unknown[]
  ): Timeout;

  function clearTimeout(timeout?: Timeout): void;

  function setInterval(
    handler: (...args: unknown[]) => void,
    timeout?: int,
    ...args: unknown[]
  ): Timeout;

  function clearInterval(timeout?: Timeout): void;

  function setImmediate(
    callback: (...args: unknown[]) => void,
    ...args: unknown[]
  ): Immediate;

  function clearImmediate(immediate?: Immediate): void;

  function queueMicrotask(callback: () => void): void;
}

export {};
