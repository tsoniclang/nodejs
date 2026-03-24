/**
 * os.machine — returns the machine type (e.g. x86_64, arm64).
 *
 * Baseline: nodejs-clr/src/nodejs/os/machine.cs
 */
import {
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

export const machine = (): string => {
  const raw = RuntimeInformation.OSArchitecture.toString().toLowerCase();
  if (raw === "x64") {
    return "x86_64";
  }
  if (raw === "x86") {
    return "i686";
  }
  if (raw === "arm64") {
    return "arm64";
  }
  if (raw === "arm") {
    return "arm";
  }
  return raw;
};
