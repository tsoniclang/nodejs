import { overloads as O } from "@tsonic/core/lang.js";
import type { RuntimeValue } from "@tsonic/nodejs/index.js";
import { Assert } from "xunit-types/Xunit.js";

export function assertThrows(action: () => void): RuntimeValue;
export function assertThrows(action: () => RuntimeValue): RuntimeValue;
export function assertThrows(_action: any): any {
  throw new Error("stub");
}

function assertThrows_void(action: () => void): RuntimeValue {
  try {
    action();
  } catch (error) {
      return error;
  }

  Assert.True(false);
  return undefined;
}

function assertThrows_value(action: () => RuntimeValue): RuntimeValue {
  try {
    action();
  } catch (error) {
      return error;
  }

  Assert.True(false);
  return undefined;
}

export function assertThrowsAsync(action: () => Promise<void>): Promise<RuntimeValue>;
export function assertThrowsAsync(
  action: () => Promise<RuntimeValue>,
): Promise<RuntimeValue>;
export async function assertThrowsAsync(_action: any): Promise<any> {
  throw new Error("stub");
}

async function assertThrowsAsync_void(
  action: () => Promise<void>,
): Promise<RuntimeValue> {
  try {
    await action();
  } catch (error) {
    return error;
  }

  Assert.True(false);
  return undefined;
}

async function assertThrowsAsync_value(
  action: () => Promise<RuntimeValue>,
): Promise<RuntimeValue> {
  try {
    await action();
  } catch (error) {
    return error;
  }

  Assert.True(false);
  return undefined;
}

O(assertThrows_void).family(assertThrows);
O(assertThrows_value).family(assertThrows);
O(assertThrowsAsync_void).family(assertThrowsAsync);
O(assertThrowsAsync_value).family(assertThrowsAsync);
