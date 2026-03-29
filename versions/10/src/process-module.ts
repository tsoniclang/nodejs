
import type {} from "./type-bootstrap.js";

import type { int } from "@tsonic/core/types.js";
import { Convert, Environment } from "@tsonic/dotnet/System.js";
import { Process } from "@tsonic/dotnet/System.Diagnostics.js";
import { Directory, File, Path } from "@tsonic/dotnet/System.IO.js";
import {
  OSPlatform,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

const archToNodeName = (value: string): string => {
  const normalized = value.toLowerCase();
  if (
    normalized === "x64" ||
    normalized === "arm64" ||
    normalized === "arm" ||
    normalized === "wasm" ||
    normalized === "s390x"
  ) {
    return normalized;
  }
  if (normalized === "x86") {
    return "ia32";
  }
  return normalized;
};

const platformToNodeName = (): string => {
  if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) {
    return "win32";
  }
  if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) {
    return "darwin";
  }
  if (RuntimeInformation.IsOSPlatform(OSPlatform.FreeBSD)) {
    return "freebsd";
  }
  return "linux";
};

const toInt32 = (value: number): int | undefined => {
  if (
    Number.isInteger(value) &&
    value >= -2147483648 &&
    value <= 2147483647
  ) {
    return value as int;
  }

  return undefined;
};

const isWindows = (): boolean =>
  RuntimeInformation.IsOSPlatform(OSPlatform.Windows);

const stringsEqual = (left: string, right: string): boolean =>
  isWindows()
    ? left.toLowerCase() === right.toLowerCase()
    : left === right;

const unsetEnvironmentVariable = (key: string): void => {
  Environment.SetEnvironmentVariable(key, null as unknown as string);
};

let currentExitCode: int | undefined = undefined;

let currentArgv = Environment.GetCommandLineArgs();
let currentArgv0 = currentArgv.length > 0 ? currentArgv[0] : "";

export const pid = Environment.ProcessId;
export const execPath =
  Environment.ProcessPath ??
  (currentArgv.length > 0 ? Path.GetFullPath(currentArgv[0]) : "");
export const arch = archToNodeName(
  Convert.ToString(RuntimeInformation.ProcessArchitecture) ?? ""
);
export const platform = platformToNodeName();
export const version = "v24.0.0-tsonic";

export class ProcessVersions {
  public node: string = "24.0.0";
  public v8: string = "0.0.0";
  public dotnet: string = Environment.Version.ToString();
  public tsonic: string = "0.0.74";
}

const currentVersions = new ProcessVersions();

export class ProcessEnv {
  private readonly values: Record<string, string | undefined> = {};

  public constructor() {
    const variables = Environment.GetEnvironmentVariables();
    const iterator = variables.GetEnumerator();
    while (iterator.MoveNext()) {
      const entry = iterator.Entry;
      const rawKey = entry.Key;
      if (rawKey === undefined || rawKey === null) {
        continue;
      }

      const key = String(rawKey);
      const rawValue = entry.Value;
      this.values[key] =
        rawValue === undefined || rawValue === null ? undefined : String(rawValue);
    }
  }

  public containsKey(key: string): boolean {
    return this.resolveKey(key) !== undefined;
  }

  public get(key: string): string | undefined {
    const resolvedKey = this.resolveKey(key);
    return resolvedKey === undefined ? undefined : this.values[resolvedKey];
  }

  public set(key: string, value: string | undefined): void {
    const resolvedKey = this.resolveKey(key) ?? key;
    if (value === undefined) {
      if (this.hasOwnKey(resolvedKey)) {
        delete this.values[resolvedKey];
      }
      unsetEnvironmentVariable(resolvedKey);
      return;
    }

    this.values[resolvedKey] = value;
    Environment.SetEnvironmentVariable(resolvedKey, value);
  }

  public remove(key: string): boolean {
    const resolvedKey = this.resolveKey(key);
    if (resolvedKey === undefined) {
      return false;
    }

    delete this.values[resolvedKey];
    unsetEnvironmentVariable(resolvedKey);
    return true;
  }

  private resolveKey(key: string): string | undefined {
    if (this.hasOwnKey(key)) {
      return key;
    }

    for (const existingKey in this.values) {
      if (stringsEqual(existingKey, key)) {
        return existingKey;
      }
    }

    return undefined;
  }

  private hasOwnKey(key: string): boolean {
    for (const existingKey in this.values) {
      if (existingKey === key) {
        return true;
      }
    }

    return false;
  }
}

const currentEnv = new ProcessEnv();

export const cwd = (): string => Directory.GetCurrentDirectory();

export const chdir = (directory: string): void => {
  if (directory.length === 0) {
    throw new Error("Directory path cannot be null or empty.");
  }

  if (!Directory.Exists(directory)) {
    throw new Error(`Directory not found: ${directory}`);
  }

  Directory.SetCurrentDirectory(directory);
};

export const exit = (code?: int): void => {
  const resolved = code ?? currentExitCode ?? (0 as int);
  Environment.Exit(resolved);
};

const normalizeSignal = (signal?: int | string): string => {
  if (signal === undefined) {
    return "SIGTERM";
  }

  if (typeof signal === "string") {
    return signal.toUpperCase();
  }

  if (signal === (0 as int)) {
    return "0";
  }
  if (signal === (1 as int)) {
    return "SIGHUP";
  }
  if (signal === (2 as int)) {
    return "SIGINT";
  }
  if (signal === (9 as int)) {
    return "SIGKILL";
  }
  if (signal === (15 as int)) {
    return "SIGTERM";
  }

  return "SIGTERM";
};

export const kill = (targetPid: int, signal?: int | string): boolean => {
  try {
    const target = Process.GetProcessById(targetPid);
    const normalizedSignal = normalizeSignal(signal);

    switch (normalizedSignal) {
      case "0":
      case "SIGNULL":
        return !target.HasExited;
      case "SIGINT":
      case "SIGHUP":
        if (target.CloseMainWindow()) {
          return true;
        }
        target.Kill();
        return true;
      case "SIGKILL":
      case "SIGTERM":
      default:
        target.Kill();
        return true;
    }
  } catch (error) {
    if (error instanceof Error && error.name === "ArgumentException") {
      throw new Error(`kill ESRCH: No such process ${String(targetPid)}`);
    }

    if (error instanceof Error) {
      throw new Error(`kill failed: ${error.message}`);
    }

    throw new Error(`kill failed: ${String(error)}`);
  }
};

const getParentProcessId = (): int => {
  if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) {
    return 0 as int;
  }

  const statPath = `/proc/${String(pid)}/stat`;
  if (!File.Exists(statPath)) {
    return 0 as int;
  }

  const stat = File.ReadAllText(statPath);
  const parts = stat.split(" ");
  if (parts.length <= 3) {
    return 0 as int;
  }

  const parsed = Number.parseInt(parts[3] ?? "", 10);
  if (parsed === undefined || Number.isNaN(parsed)) {
    return 0 as int;
  }

  return toInt32(parsed) ?? (0 as int);
};

export class ProcessModule {
  public get env(): ProcessEnv {
    return currentEnv;
  }

  public get argv(): string[] {
    return currentArgv;
  }

  public set argv(value: string[] | undefined) {
    currentArgv = value ?? [];
  }

  public get argv0(): string {
    return currentArgv0;
  }

  public set argv0(value: string | undefined) {
    currentArgv0 = value ?? "";
  }

  public get pid(): int {
    return pid;
  }

  public get execPath(): string {
    return execPath;
  }

  public get arch(): string {
    return arch;
  }

  public get platform(): string {
    return platform;
  }

  public get ppid(): int {
    return getParentProcessId();
  }

  public get version(): string {
    return version;
  }

  public get versions(): ProcessVersions {
    return currentVersions;
  }

  public get exitCode(): int | undefined {
    return currentExitCode;
  }

  public set exitCode(value: int | undefined) {
    currentExitCode = value;
  }

  public cwd(): string {
    return cwd();
  }

  public chdir(directory: string): void {
    chdir(directory);
  }

  public exit(code?: int): void {
    exit(code);
  }

  public kill(pid: int, signal?: int | string): boolean {
    return kill(pid, signal);
  }
}

export const process = new ProcessModule();
