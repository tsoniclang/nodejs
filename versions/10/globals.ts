import type { int, JsValue } from "@tsonic/core/types.js";
import type { Immediate, Timeout } from "./src/timers-module.js";

declare global {
  interface Console {
    trace(...data: JsValue[]): void;
    assert(
      condition: boolean,
      message?: string,
      ...optionalParams: JsValue[]
    ): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    dir(obj?: JsValue, ...options: JsValue[]): void;
    dirxml(...data: JsValue[]): void;
    group(...data: JsValue[]): void;
    groupCollapsed(...data: JsValue[]): void;
    groupEnd(): void;
    table(data?: JsValue, properties?: string[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: JsValue[]): void;
  }

  function setTimeout(
    handler: (...args: JsValue[]) => void,
    timeout?: int,
    ...args: JsValue[]
  ): Timeout;

  function clearTimeout(timeout?: Timeout): void;

  function setInterval(
    handler: (...args: JsValue[]) => void,
    timeout?: int,
    ...args: JsValue[]
  ): Timeout;

  function clearInterval(timeout?: Timeout): void;

  function setImmediate(
    callback: (...args: JsValue[]) => void,
    ...args: JsValue[]
  ): Immediate;

  function clearImmediate(immediate?: Immediate): void;

  function queueMicrotask(callback: () => void): void;
}

export {};
