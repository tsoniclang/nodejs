/**
 * os.version — returns a human-readable OS version string.
 *
 * Baseline: nodejs-clr/src/nodejs/os/version.cs
 */
import {
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

export const version = (): string => RuntimeInformation.OSDescription;
