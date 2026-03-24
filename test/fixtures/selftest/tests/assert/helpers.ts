import { Assert } from "xunit-types/Xunit.js";

export function assertThrows(action: () => void): unknown;
export function assertThrows<T>(action: () => T): unknown;
export function assertThrows(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
      return error;
  }

  Assert.True(false);
  return undefined;
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

  Assert.True(false);
  return undefined;
}
