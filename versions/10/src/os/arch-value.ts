/**
 * os.arch — returns the CPU architecture.
 *
 * Baseline: nodejs-clr/src/nodejs/os/arch.cs
 */
import {
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

export const arch = (): string => {
  const raw = RuntimeInformation.ProcessArchitecture.toString().toLowerCase();
  if (raw === "x64") {
    return "x64";
  }
  if (raw === "x86") {
    return "ia32";
  }
  if (raw === "arm") {
    return "arm";
  }
  if (raw === "arm64") {
    return "arm64";
  }
  if (raw === "wasm") {
    return "wasm";
  }
  if (raw === "s390x") {
    return "s390x";
  }
  return raw;
};
