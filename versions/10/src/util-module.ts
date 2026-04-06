
import type {} from "./type-bootstrap.ts";

import type { JsValue } from "@tsonic/core/types.js";
import { Console as DotnetConsole, Environment } from "@tsonic/dotnet/System.js";

export type DebugLogFunction = (message: string, ...args: JsValue[]) => void;

const toDisplayString = (value: JsValue): string => {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return value;
  }
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return String(value);
  }

  try {
    const json = JSON.stringify(value);
    return json ?? String(value);
  } catch {
    return String(value);
  }
};

export const format = (formatValue: JsValue, ...args: JsValue[]): string => {
  if (formatValue === null || formatValue === undefined) {
    return "";
  }

  const formatString = String(formatValue);
  let result = "";
  let argIndex = 0;

  for (let index = 0; index < formatString.length; index += 1) {
    const ch = formatString[index];
    const next = formatString[index + 1];
    if (ch !== "%" || next === undefined) {
      result += ch;
      continue;
    }

    if (next === "%") {
      result += "%";
      index += 1;
      continue;
    }

    if (argIndex >= args.length) {
      result += ch;
      continue;
    }

    const value = args[argIndex];
    switch (next) {
      case "s":
      case "d":
      case "i":
      case "f":
        result += value === undefined || value === null ? "" : String(value);
        argIndex += 1;
        index += 1;
        break;
      case "j":
        try {
          const serialized =
            value === undefined ? undefined : JSON.stringify(value);
          result += serialized ?? "undefined";
        } catch {
          result += value === undefined || value === null ? "" : String(value);
        }
        argIndex += 1;
        index += 1;
        break;
      case "o":
      case "O":
        result += inspect(value);
        argIndex += 1;
        index += 1;
        break;
      default:
        result += ch;
        break;
    }
  }

  for (; argIndex < args.length; argIndex += 1) {
    result += ` ${toDisplayString(args[argIndex]!)}`;
  }

  return result;
};

export const inspect = (value?: JsValue): string => {
  if (value === undefined) {
    return "undefined";
  }
  if (value === null) {
    return "null";
  }
  if (typeof value === "string") {
    return `'${value}'`;
  }
  if (typeof value === "symbol") {
    return "Symbol()";
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }

  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};

export const isArray = (value: JsValue): boolean => Array.isArray(value);

export const isDeepStrictEqual = (left: JsValue, right: JsValue): boolean => {
  if (left === right) {
    return true;
  }
  if (left === null || right === null || left === undefined || right === undefined) {
    return left === right;
  }
  if (typeof left !== typeof right) {
    return false;
  }
  if (
    typeof left === "string" ||
    typeof left === "number" ||
    typeof left === "boolean" ||
    typeof left === "bigint"
  ) {
    return left === right;
  }

  try {
    return JSON.stringify(left) === JSON.stringify(right);
  } catch {
    return left === right;
  }
};

export const inherits = (
  _constructor: JsValue,
  _superConstructor: JsValue
): void => {
  return;
};

const deprecationWarnings = new Set<string>();

export function deprecate(
  fn: (...args: JsValue[]) => JsValue,
  message: string,
  code?: string,
): (...args: JsValue[]) => JsValue {
  return (...args: JsValue[]): JsValue => {
    const warning =
      code === undefined
        ? `DeprecationWarning: ${message}`
        : `[${code}] DeprecationWarning: ${message}`;
    if (!deprecationWarnings.has(warning)) {
      deprecationWarnings.add(warning);
      DotnetConsole.Error.WriteLine(warning);
    }
    return fn(...args);
  };
}

export const debuglog = (section: string): DebugLogFunction => {
  const nodeDebug = Environment.GetEnvironmentVariable("NODE_DEBUG") ?? "";
  const enabledSections = new Set(
    nodeDebug
      .split(",")
      .map((value) => value.trim().toUpperCase())
      .filter((value) => value.length > 0)
  );
  const enabled =
    enabledSections.has(section.toUpperCase()) || enabledSections.has("*");

  if (!enabled) {
    return () => undefined;
  }

  const pid = Environment.ProcessId;
  return (message: string, ...args: JsValue[]): void => {
    const rendered = args.length > 0 ? format(message, ...args) : message;
    DotnetConsole.Error.WriteLine(
      `${section.toUpperCase()} ${String(pid)}: ${rendered}`
    );
  };
};

export const formatWithOptions = (
  _inspectOptions: JsValue,
  formatValue: JsValue,
  ...args: JsValue[]
): string => format(formatValue, ...args);

export const stripVTControlCharacters = (input: string): string => {
  if (input.length === 0) {
    return "";
  }

  let result = "";
  let index = 0;

  while (index < input.length) {
    if (
      input[index] === "\x1B" &&
      index + 1 < input.length &&
      input[index + 1] === "["
    ) {
      index += 2;
      while (index < input.length) {
        const codeUnit = input.charCodeAt(index);
        const isFinalByte = codeUnit >= 0x40 && codeUnit <= 0x7e;
        index += 1;
        if (isFinalByte) {
          break;
        }
      }
      continue;
    }

    result += input[index];
    index += 1;
  }

  return result;
};

export const toUSVString = (input: string): string => {
  if (input.length === 0) {
    return "";
  }

  let result = "";
  for (let index = 0; index < input.length; index += 1) {
    const codeUnit = input.charCodeAt(index);
    if (codeUnit < 0xd800 || codeUnit > 0xdfff) {
      result += input[index];
      continue;
    }

    const isHigh = codeUnit >= 0xd800 && codeUnit <= 0xdbff;
    const nextCodeUnit =
      index + 1 < input.length ? input.charCodeAt(index + 1) : -1;
    const hasValidPair =
      isHigh && nextCodeUnit >= 0xdc00 && nextCodeUnit <= 0xdfff;

    if (hasValidPair) {
      result += input[index];
      result += input[index + 1];
      index += 1;
      continue;
    }

    result += "\uFFFD";
  }

  return result;
};
