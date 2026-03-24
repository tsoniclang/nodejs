/**
 * os.EOL — the platform-specific end-of-line marker.
 *
 * Baseline: nodejs-clr/src/nodejs/os/eol.cs
 */
import { Environment } from "@tsonic/dotnet/System.js";

export const EOL: string = Environment.NewLine;
