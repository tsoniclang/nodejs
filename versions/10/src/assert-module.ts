
import type {} from "./type-bootstrap.js";

import { AssertionError } from "./assertion-error.ts";

const isNumeric = (value: unknown): boolean => typeof value === "number";

const areLooselyEqual = (left: unknown, right: unknown): boolean => {
  if (left === null && right === null) {
    return true;
  }
  if (left === null || right === null || left === undefined || right === undefined) {
    return left === right;
  }
  if (isNumeric(left) && isNumeric(right)) {
    return left === right;
  }

  return left === right;
};

const areStrictlyEqual = (left: unknown, right: unknown): boolean => {
  if (typeof left !== typeof right) {
    return false;
  }

  return left === right;
};

const areDeepEqual = (
  left: unknown,
  right: unknown,
  strict: boolean
): boolean => {
  if (left === right) {
    return true;
  }
  if (left === null || right === null || left === undefined || right === undefined) {
    return left === right;
  }
  if (strict && typeof left !== typeof right) {
    return false;
  }
  if (
    typeof left === "string" ||
    typeof left === "number" ||
    typeof left === "boolean" ||
    typeof left === "bigint"
  ) {
    return strict ? areStrictlyEqual(left, right) : areLooselyEqual(left, right);
  }

  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return left === right;
  }
};

export const ok = (value: boolean, message?: string): void => {
  if (!value) {
    throw new AssertionError(message, value, true, "==");
  }
};

export const fail = (message?: string): never => {
  throw new AssertionError(message ?? "Failed");
};

export const equal = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (!areLooselyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "==");
  }
};

export const notEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (areLooselyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "!=");
  }
};

export const strictEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (!areStrictlyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "===");
  }
};

export const notStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (areStrictlyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "!==");
  }
};

export const deepEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (!areDeepEqual(actual, expected, false)) {
    throw new AssertionError(message, actual, expected, "deepEqual");
  }
};

export const notDeepEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (areDeepEqual(actual, expected, false)) {
    throw new AssertionError(message, actual, expected, "notDeepEqual");
  }
};

export const deepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (!areDeepEqual(actual, expected, true)) {
    throw new AssertionError(message, actual, expected, "deepEqual");
  }
};

export const notDeepStrictEqual = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => {
  if (areDeepEqual(actual, expected, true)) {
    throw new AssertionError(message, actual, expected, "notDeepEqual");
  }
};

export const throws = (fn: () => void, message?: string): void => {
  try {
    fn();
  } catch (error) {
    if (error instanceof AssertionError) {
      throw error;
    }
    return;
  }

  throw new AssertionError(message ?? "Missing expected exception", null, null, "throws");
};

export const doesNotThrow = (fn: () => void, message?: string): void => {
  try {
    fn();
  } catch (error) {
    if (error instanceof Error) {
      throw new AssertionError(
        message ?? `Got unwanted exception: ${error.message}`,
        null,
        null,
        "doesNotThrow"
      );
    }
    throw new AssertionError(message ?? "Got unwanted exception", null, null, "doesNotThrow");
  }
};

export const match = (
  value: string,
  pattern: RegExp,
  message?: string
): void => {
  if (!pattern.test(value)) {
    throw new AssertionError(message, value, String(pattern), "match");
  }
};

export const doesNotMatch = (
  value: string,
  pattern: RegExp,
  message?: string
): void => {
  if (pattern.test(value)) {
    throw new AssertionError(message, value, String(pattern), "doesNotMatch");
  }
};

export const ifError = (value: unknown): void => {
  if (value === null || value === undefined) {
    return;
  }
  if (value instanceof Error) {
    throw value;
  }
  throw new AssertionError(
    `ifError got unwanted exception: ${String(value)}`,
    value,
    null,
    "ifError"
  );
};

export const strict = (
  actual: unknown,
  expected: unknown,
  message?: string
): void => strictEqual(actual, expected, message);

export const rejects = async (
  fn: () => Promise<unknown>,
  message?: string,
): Promise<void> => {
  try {
    await fn();
  } catch (error) {
    if (error instanceof AssertionError) {
      throw error;
    }
    return;
  }

  throw new AssertionError(message ?? "Missing expected rejection", null, null, "rejects");
};

export const doesNotReject = async (
  fn: () => Promise<unknown>,
  message?: string,
): Promise<void> => {
  try {
    await fn();
  } catch (error) {
    if (error instanceof Error) {
      throw new AssertionError(
        message ?? `Got unwanted rejection: ${error.message}`,
        null,
        null,
        "doesNotReject"
      );
    }
    throw new AssertionError(message ?? "Got unwanted rejection", null, null, "doesNotReject");
  }
};

export { AssertionError };
