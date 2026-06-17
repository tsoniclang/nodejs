import type { int, JsValue } from "@tsonic/core/types.js";
import type { Buffer as NodeBuffer } from "node:buffer";
import processModule from "node:process";

type RuntimeValue = JsValue | undefined;

declare global {
  interface Console {
    trace(...data: RuntimeValue[]): void;
    assert(condition: boolean, message?: string, ...optionalParams: RuntimeValue[]): void;
  }

  function setTimeout(
    handler: (...args: RuntimeValue[]) => void,
    timeout?: int,
    ...args: RuntimeValue[]
  ): ReturnType<typeof globalThis.setTimeout>;

  function clearTimeout(timeout?: ReturnType<typeof globalThis.setTimeout>): void;

  function setInterval(
    handler: (...args: RuntimeValue[]) => void,
    timeout?: int,
    ...args: RuntimeValue[]
  ): ReturnType<typeof globalThis.setInterval>;

  function clearInterval(timeout?: ReturnType<typeof globalThis.setInterval>): void;

  const Buffer: typeof NodeBuffer;
  const process: typeof processModule;
}

export {};
