/**
 * os.uptime — returns system uptime in seconds.
 *
 * Baseline: nodejs-clr/src/nodejs/os/uptime.cs
 */
import { Environment } from "@tsonic/dotnet/System.js";

// TODO: Implement accurate uptime via native interop.
// Placeholder uses Environment.TickCount64 (milliseconds since boot).
export const uptime = (): number =>
  Math.floor(Environment.TickCount64 / 1000);
