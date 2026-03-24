import type { byte } from "@tsonic/core/types.js";
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

export function assertThrows(action: () => void): unknown;
export function assertThrows<T>(action: () => T): unknown;
export function assertThrows(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}

export function assertThrowsAsync(action: () => Promise<void>): Promise<unknown>;
export function assertThrowsAsync<T>(
  action: () => Promise<T>,
): Promise<unknown>;
export async function assertThrowsAsync(
  action: () => Promise<unknown>,
): Promise<unknown> {
  try {
    await action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}

export const bytesToUtf8 = (value: byte[]): string =>
  Encoding.UTF8.GetString(value);
