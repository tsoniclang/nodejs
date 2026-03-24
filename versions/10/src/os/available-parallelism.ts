/**
 * os.availableParallelism — returns the default parallelism estimate.
 *
 * Baseline: nodejs-clr/src/nodejs/os/availableParallelism.cs
 */
import { Environment } from "@tsonic/dotnet/System.js";

export const availableParallelism = (): number =>
  Environment.ProcessorCount;
