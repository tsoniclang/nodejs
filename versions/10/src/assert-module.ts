
import type { int, JsValue } from "@tsonic/core/types.js";
import {
  Convert,
  TypeCode,
} from "@tsonic/dotnet/System.js";
import { CultureInfo } from "@tsonic/dotnet/System.Globalization.js";

import type {} from "./type-bootstrap.ts";

import { AssertionError } from "./assertion-error.ts";

const toNumericValue = (value: JsValue): number => {
  return Convert.ToDouble(value, CultureInfo.InvariantCulture);
};

const isNumeric = (value: JsValue): boolean => {
  switch (Convert.GetTypeCode(value)) {
    case TypeCode.SByte:
    case TypeCode.Byte:
    case TypeCode.Int16:
    case TypeCode.UInt16:
    case TypeCode.Int32:
    case TypeCode.UInt32:
    case TypeCode.Int64:
    case TypeCode.UInt64:
    case TypeCode.Single:
    case TypeCode.Double:
    case TypeCode.Decimal:
      return true;
    default:
      return false;
  }
};

const getPrimitiveKind = (value: JsValue): string => {
  if (value === null || value === undefined) {
    return "undefined";
  }
  if (isNumeric(value)) {
    return "number";
  }

  return typeof value;
};

const areLooselyEqual = (left: JsValue, right: JsValue): boolean => {
  if (left === null && right === null) {
    return true;
  }
  if (left === null || right === null || left === undefined || right === undefined) {
    return left === right;
  }
  if (isNumeric(left) && isNumeric(right)) {
    return toNumericValue(left) === toNumericValue(right);
  }

  return left === right;
};

const areStrictlyEqual = (left: JsValue, right: JsValue): boolean => {
  if (getPrimitiveKind(left) !== getPrimitiveKind(right)) {
    return false;
  }
  if (isNumeric(left) && isNumeric(right)) {
    return toNumericValue(left) === toNumericValue(right);
  }

  return left === right;
};

type SeenPair = readonly [JsValue, JsValue];

const hasSeenPair = (
  seenPairs: readonly SeenPair[],
  left: object,
  right: object
): boolean => {
  for (const [seenLeft, seenRight] of seenPairs) {
    if (seenLeft === left && seenRight === right) {
      return true;
    }
  }

  return false;
};

const areObjectsDeepEqual = (
  left: object,
  right: object,
  strict: boolean,
  seenPairs: readonly SeenPair[]
): boolean => {
  if (hasSeenPair(seenPairs, left, right)) {
    return true;
  }

  const nextSeenPair: SeenPair = [left, right];
  const nextSeenPairs = [...seenPairs, nextSeenPair];
  const leftEntries = Object.entries(left);
  const rightEntries = Object.entries(right);

  if (leftEntries.length !== rightEntries.length) {
    return false;
  }

  for (const [leftKey, leftValue] of leftEntries) {
    let matched = false;
    for (const [rightKey, rightValue] of rightEntries) {
      if (leftKey !== rightKey) {
        continue;
      }

      matched = true;
      if (!areDeepEqualInternal(leftValue, rightValue, strict, nextSeenPairs)) {
        return false;
      }
      break;
    }

    if (!matched) {
      return false;
    }
  }

  return true;
};

const areIndexedSequenceDeepEqual = (
  left: object,
  right: object,
  leftLength: int,
  rightLength: int,
  getLeftValue: (index: int) => JsValue,
  getRightValue: (index: int) => JsValue,
  strict: boolean,
  seenPairs: readonly SeenPair[]
): boolean => {
  if (hasSeenPair(seenPairs, left, right)) {
    return true;
  }
  if (leftLength !== rightLength) {
    return false;
  }

  const nextSeenPair: SeenPair = [left, right];
  const nextSeenPairs = [...seenPairs, nextSeenPair];
  for (let index = 0 as int; index < leftLength; index += 1) {
    if (
      !areDeepEqualInternal(
        getLeftValue(index),
        getRightValue(index),
        strict,
        nextSeenPairs
      )
    ) {
      return false;
    }
  }

  return true;
};

const areDeepEqualInternal = (
  left: JsValue,
  right: JsValue,
  strict: boolean,
  seenPairs: readonly SeenPair[]
): boolean => {
  if (left === right) {
    return true;
  }
  if (left === null || right === null || left === undefined || right === undefined) {
    return left === right;
  }
  if (strict && getPrimitiveKind(left) !== getPrimitiveKind(right)) {
    return false;
  }
  if (
    typeof left === "string" ||
    typeof left === "boolean" ||
    typeof left === "bigint" ||
    isNumeric(left)
  ) {
    return strict ? areStrictlyEqual(left, right) : areLooselyEqual(left, right);
  }
  const leftIsUint8Array = left instanceof Uint8Array;
  const rightIsUint8Array = right instanceof Uint8Array;
  if (leftIsUint8Array || rightIsUint8Array) {
    if (!leftIsUint8Array || !rightIsUint8Array) {
      return false;
    }

    const leftBytes = left as Uint8Array;
    const rightBytes = right as Uint8Array;
    return areIndexedSequenceDeepEqual(
      leftBytes,
      rightBytes,
      leftBytes.length,
      rightBytes.length,
      (index) => leftBytes[index]!,
      (index) => rightBytes[index]!,
      strict,
      seenPairs
    );
  }

  const leftIsArray = Array.isArray(left);
  const rightIsArray = Array.isArray(right);
  if (leftIsArray || rightIsArray) {
    if (!leftIsArray || !rightIsArray) {
      return false;
    }

    return areIndexedSequenceDeepEqual(
      left as object,
      right as object,
      (left as JsValue[]).length,
      (right as JsValue[]).length,
      (index) => (left as JsValue[])[index]!,
      (index) => (right as JsValue[])[index]!,
      strict,
      seenPairs
    );
  }
  if (typeof left === "object" && typeof right === "object") {
    return areObjectsDeepEqual(left, right, strict, seenPairs);
  }

  return strict ? areStrictlyEqual(left, right) : areLooselyEqual(left, right);
};

const areDeepEqual = (
  left: JsValue,
  right: JsValue,
  strict: boolean
): boolean => {
  return areDeepEqualInternal(left, right, strict, []);
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
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (!areLooselyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "==");
  }
};

export const notEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (areLooselyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "!=");
  }
};

export const strictEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (!areStrictlyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "===");
  }
};

export const notStrictEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (areStrictlyEqual(actual, expected)) {
    throw new AssertionError(message, actual, expected, "!==");
  }
};

export const deepEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (!areDeepEqual(actual, expected, false)) {
    throw new AssertionError(message, actual, expected, "deepEqual");
  }
};

export const notDeepEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (areDeepEqual(actual, expected, false)) {
    throw new AssertionError(message, actual, expected, "notDeepEqual");
  }
};

export const deepStrictEqual = (
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => {
  if (!areDeepEqual(actual, expected, true)) {
    throw new AssertionError(message, actual, expected, "deepEqual");
  }
};

export const notDeepStrictEqual = (
  actual: JsValue,
  expected: JsValue,
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

export const ifError = (value: JsValue): void => {
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
  actual: JsValue,
  expected: JsValue,
  message?: string
): void => strictEqual(actual, expected, message);

export const rejects = async (
  fn: () => Promise<JsValue | undefined>,
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
  fn: () => Promise<JsValue | undefined>,
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
