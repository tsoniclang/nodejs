/**
 * os.hostname — returns the host name of the operating system.
 *
 * Baseline: nodejs-clr/src/nodejs/os/hostname.cs
 */
import { Dns } from "@tsonic/dotnet/System.Net.js";

// TODO: Verify Dns.GetHostName() availability in NativeAOT target.
export const hostname = (): string => Dns.GetHostName();
