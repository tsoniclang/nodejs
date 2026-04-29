import type {} from "./type-bootstrap.ts";

import type { int } from "@tsonic/core/types.js";
import type { RuntimeValue } from "./runtime-value.ts";

export const isArrayValue = (value: RuntimeValue): boolean => {
  if (value === null || value === undefined || typeof value !== "object") {
    return false;
  }

  return Array.isArray(value);
};

const areUint8ArraysEqual = (
  left: Uint8Array,
  right: Uint8Array
): boolean => {
  if (left.length !== right.length) {
    return false;
  }

  for (let index = 0 as int; index < left.length; index = (index + 1) as int) {
    if (left[index] !== right[index]) {
      return false;
    }
  }

  return true;
};

export const areDeepEqual = (
  left: RuntimeValue,
  right: RuntimeValue
): boolean => {
  if (left === right) {
    return true;
  }

  if (
    left === null ||
    right === null ||
    left === undefined ||
    right === undefined
  ) {
    return false;
  }

  if (
    typeof left === "string" ||
    typeof left === "number" ||
    typeof left === "boolean" ||
    typeof right === "string" ||
    typeof right === "number" ||
    typeof right === "boolean"
  ) {
    return false;
  }

  if (typeof left !== "object" || typeof right !== "object") {
    return false;
  }

  if (left instanceof Uint8Array && right instanceof Uint8Array) {
    return areUint8ArraysEqual(left, right);
  }

  if (Array.isArray(left) && Array.isArray(right)) {
    return false;
  }

  return false;
};
