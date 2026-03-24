export function assertThrows(action: () => void): unknown;

export function assertThrows(action: () => unknown): unknown {
  try {
    action();
  } catch (error) {
    return error;
  }

  throw new Error("Expected action to throw");
}
