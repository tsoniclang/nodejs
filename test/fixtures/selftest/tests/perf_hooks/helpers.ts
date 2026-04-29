import { overloads as O } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";

export function assertThrows(action: () => void): RuntimeValue;
export function assertThrows(_action: any): any {
  throw new Error("stub");
}

function assertThrows_void(action: () => void): RuntimeValue {
  try {
    action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}

O(assertThrows_void).family(assertThrows);
