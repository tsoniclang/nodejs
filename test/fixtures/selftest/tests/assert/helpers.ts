import { overloads as O } from "@tsonic/core/lang.js";
import type { JsValue } from "@tsonic/core/types.js";
import { Assert } from "xunit-types/Xunit.js";

export function assertThrows(action: () => void): JsValue;
export function assertThrows(action: () => JsValue): JsValue;
export function assertThrows(_action: any): any {
  throw new Error("stub");
}

function assertThrows_void(action: () => void): JsValue {
  try {
    action();
  } catch (error) {
      return error;
  }

  Assert.True(false);
  return undefined;
}

function assertThrows_value(action: () => JsValue): JsValue {
  try {
    action();
  } catch (error) {
      return error;
  }

  Assert.True(false);
  return undefined;
}

export function assertThrowsAsync(action: () => Promise<void>): Promise<JsValue>;
export function assertThrowsAsync(
  action: () => Promise<JsValue>,
): Promise<JsValue>;
export async function assertThrowsAsync(_action: any): Promise<any> {
  throw new Error("stub");
}

async function assertThrowsAsync_void(
  action: () => Promise<void>,
): Promise<JsValue> {
  try {
    await action();
  } catch (error) {
    return error;
  }

  Assert.True(false);
  return undefined;
}

async function assertThrowsAsync_value(
  action: () => Promise<JsValue>,
): Promise<JsValue> {
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
