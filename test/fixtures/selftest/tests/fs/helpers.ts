import { overloads as O } from "@tsonic/core/lang.js";
import type { byte, JsValue } from "@tsonic/core/types.js";
import { Guid } from "@tsonic/dotnet/System.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";
import { Encoding } from "@tsonic/dotnet/System.Text.js";

export const createTempDir = (): string => {
  const root = Path.Combine(Path.GetTempPath(), "nodejs-next-fs-tests");
  Directory.CreateDirectory(root);
  const dir = Path.Combine(root, Guid.NewGuid().ToString("n"));
  Directory.CreateDirectory(dir);
  return dir;
};

export const deleteIfExists = (value: string): void => {
  if (Directory.Exists(value)) {
    Directory.Delete(value, true);
    return;
  }

  if (File.Exists(value)) {
    File.Delete(value);
  }
};

export const getTestPath = (dir: string, name: string): string =>
  Path.Combine(dir, name);

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

  throw new Error("Expected action to throw");
}

function assertThrows_value(action: () => JsValue): JsValue {
  try {
    action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
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

  throw new Error("Expected action to throw");
}

async function assertThrowsAsync_value(
  action: () => Promise<JsValue>,
): Promise<JsValue> {
  try {
    await action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}

export const bytesToUtf8 = (value: byte[]): string =>
  Encoding.UTF8.GetString(value);

O(assertThrows_void).family(assertThrows);
O(assertThrows_value).family(assertThrows);
O(assertThrowsAsync_void).family(assertThrowsAsync);
O(assertThrowsAsync_value).family(assertThrowsAsync);
