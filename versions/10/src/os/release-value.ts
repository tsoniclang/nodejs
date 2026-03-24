/**
 * os.release — returns the OS release version string.
 *
 * Baseline: nodejs-clr/src/nodejs/os/release.cs
 */
import { Environment } from "@tsonic/dotnet/System.js";

export const release = (): string =>
  Environment.OSVersion.Version.ToString();
