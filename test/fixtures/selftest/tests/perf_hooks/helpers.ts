import { overloads as O } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";

export function assertThrows(action: () => void): JsValue;
export function assertThrows(_action: any): any {
  throw new Error("stub");
}

function assertThrows_void(action: () => void): JsValue {
  try {
    action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}

O(assertThrows_void).family(assertThrows);
