
import type {} from "./type-bootstrap.js";

import { Console as DotnetConsole } from "@tsonic/dotnet/System.js";
import { Stopwatch } from "@tsonic/dotnet/System.Diagnostics.js";

import * as util from "./util-module.ts";

const counters = new Map<string, number>();
const timers = new Map<string, Stopwatch>();
let groupIndentation = 0;
const groupIndentationSize = 2;

const withIndent = (message: string): string => {
  if (groupIndentation <= 0) {
    return message;
  }

  return `${" ".repeat(groupIndentation * groupIndentationSize)}${message}`;
};

const writeLine = (message: string): void => {
  DotnetConsole.WriteLine(withIndent(message));
};

const writeError = (message: string): void => {
  DotnetConsole.Error.WriteLine(withIndent(message));
};

const formatConsoleMessage = (
  message?: unknown,
  optionalParams: readonly unknown[] = []
): string => {
  if (typeof message === "string") {
    return util.format(message, ...optionalParams);
  }

  const values =
    message === undefined ? [...optionalParams] : [message, ...optionalParams];
  return values.map((value) => util.inspect(value)).join(" ");
};

const formatElapsed = (stopwatch: Stopwatch): string => {
  const elapsed = stopwatch.Elapsed;
  if (elapsed.TotalMilliseconds < 1) {
    return `${String(elapsed.TotalMilliseconds)}ms`;
  }
  if (elapsed.TotalSeconds < 1) {
    return `${String(Math.round(elapsed.TotalMilliseconds))}ms`;
  }
  if (elapsed.TotalMinutes < 1) {
    return `${String(Math.round(elapsed.TotalSeconds * 1000) / 1000)}s`;
  }
  return `${String(Math.round(elapsed.TotalMinutes * 100) / 100)}m`;
};

export class ConsoleConstructor {
  public constructor(
    _stdout?: unknown,
    _stderr?: unknown,
    _ignoreErrors: boolean = true,
    _colorMode?: unknown,
    _inspectOptions?: unknown,
    _groupIndentation: boolean = true
  ) {}

  public assert(value: boolean, message?: string, ...optionalParams: unknown[]): void {
    consoleModuleInstance.assert(value, message, ...optionalParams);
  }
  public clear(): void {
    consoleModuleInstance.clear();
  }
  public count(label?: string): void {
    consoleModuleInstance.count(label);
  }
  public countReset(label?: string): void {
    consoleModuleInstance.countReset(label);
  }
  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.debug(message, ...optionalParams);
  }
  public dir(value?: unknown, ...options: unknown[]): void {
    consoleModuleInstance.dir(value, ...options);
  }
  public dirxml(...data: unknown[]): void {
    consoleModuleInstance.dirxml(...data);
  }
  public error(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.error(message, ...optionalParams);
  }
  public group(...label: unknown[]): void {
    consoleModuleInstance.group(...label);
  }
  public groupCollapsed(...label: unknown[]): void {
    consoleModuleInstance.groupCollapsed(...label);
  }
  public groupEnd(): void {
    consoleModuleInstance.groupEnd();
  }
  public info(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.info(message, ...optionalParams);
  }
  public log(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.log(message, ...optionalParams);
  }
  public profile(label?: string): void {
    consoleModuleInstance.profile(label);
  }
  public profileEnd(label?: string): void {
    consoleModuleInstance.profileEnd(label);
  }
  public table(tabularData?: unknown, properties?: string[]): void {
    consoleModuleInstance.table(tabularData, properties);
  }
  public time(label?: string): void {
    consoleModuleInstance.time(label);
  }
  public timeEnd(label?: string): void {
    consoleModuleInstance.timeEnd(label);
  }
  public timeLog(label?: string, ...data: unknown[]): void {
    consoleModuleInstance.timeLog(label, ...data);
  }
  public timeStamp(label?: string): void {
    consoleModuleInstance.timeStamp(label);
  }
  public trace(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.trace(message, ...optionalParams);
  }
  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    consoleModuleInstance.warn(message, ...optionalParams);
  }
}

class ConsoleModule {
  public readonly Console: ConsoleConstructor = new ConsoleConstructor();

  public assert(
    value: boolean,
    message?: string,
    ...optionalParams: unknown[]
  ): void {
    if (value) {
      return;
    }

    let fullMessage = "Assertion failed";
    if (message !== undefined && message.length > 0) {
      fullMessage += `: ${util.format(message, ...optionalParams)}`;
    }
    writeError(fullMessage);
  }

  public clear(): void {
    try {
      DotnetConsole.Clear();
    } catch {
      return;
    }
  }

  public count(label: string = "default"): void {
    const next = (counters.get(label) ?? 0) + 1;
    counters.set(label, next);
    writeLine(`${label}: ${String(next)}`);
  }

  public countReset(label: string = "default"): void {
    counters.set(label, 0);
  }

  public debug(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(message, ...optionalParams);
  }

  public dir(value?: unknown, ..._options: unknown[]): void {
    writeLine(util.inspect(value));
  }

  public dirxml(...data: unknown[]): void {
    this.log(undefined, ...data);
  }

  public error(message?: unknown, ...optionalParams: unknown[]): void {
    writeError(formatConsoleMessage(message, optionalParams));
  }

  public group(...label: unknown[]): void {
    if (label.length > 0) {
      writeLine(formatConsoleMessage(label[0], label.slice(1)));
    }
    groupIndentation += 1;
  }

  public groupCollapsed(...label: unknown[]): void {
    this.group(...label);
  }

  public groupEnd(): void {
    if (groupIndentation > 0) {
      groupIndentation -= 1;
    }
  }

  public info(message?: unknown, ...optionalParams: unknown[]): void {
    this.log(message, ...optionalParams);
  }

  public log(message?: unknown, ...optionalParams: unknown[]): void {
    writeLine(formatConsoleMessage(message, optionalParams));
  }

  public table(tabularData?: unknown, _properties?: string[]): void {
    writeLine(util.inspect(tabularData));
  }

  public time(label: string = "default"): void {
    if (timers.has(label)) {
      return;
    }

    const stopwatch = new Stopwatch();
    stopwatch.Start();
    timers.set(label, stopwatch);
  }

  public timeEnd(label: string = "default"): void {
    const stopwatch = timers.get(label);
    if (stopwatch === undefined) {
      return;
    }

    stopwatch.Stop();
    writeLine(`${label}: ${formatElapsed(stopwatch)}`);
    timers.delete(label);
  }

  public timeLog(label: string = "default", ...data: unknown[]): void {
    const stopwatch = timers.get(label);
    if (stopwatch === undefined) {
      return;
    }

    const extras =
      data.length === 0 ? "" : ` ${data.map((value) => util.inspect(value)).join(" ")}`;
    writeLine(`${label}: ${formatElapsed(stopwatch)}${extras}`);
  }

  public trace(message?: unknown, ...optionalParams: unknown[]): void {
    const rendered = formatConsoleMessage(message, optionalParams);
    writeError(`Trace: ${rendered}`);
  }

  public warn(message?: unknown, ...optionalParams: unknown[]): void {
    this.error(message, ...optionalParams);
  }

  public profile(_label?: string): void {}

  public profileEnd(_label?: string): void {}

  public timeStamp(_label?: string): void {}
}

const consoleModuleInstance = new ConsoleModule();

export const console = consoleModuleInstance;
export const Console: ConsoleConstructor = consoleModuleInstance.Console;
