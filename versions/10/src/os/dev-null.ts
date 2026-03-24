/**
 * os.devNull — platform-specific path to the null device.
 *
 * Baseline: nodejs-clr/src/nodejs/os/devNull.cs
 */
import {
  OSPlatform,
  RuntimeInformation,
} from "@tsonic/dotnet/System.Runtime.InteropServices.js";

export const devNull: string = RuntimeInformation.IsOSPlatform(
  OSPlatform.Windows,
)
  ? "\\\\.\\nul"
  : "/dev/null";
