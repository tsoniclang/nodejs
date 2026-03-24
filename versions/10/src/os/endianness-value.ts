/**
 * os.endianness — returns 'BE' or 'LE'.
 *
 * Baseline: nodejs-clr/src/nodejs/os/endianness.cs
 */
import { BitConverter } from "@tsonic/dotnet/System.js";

export const endianness = (): string =>
  BitConverter.IsLittleEndian ? "LE" : "BE";
