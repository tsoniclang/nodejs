/**
 * Node.js buffer module.
 *
 * Baseline: nodejs-clr/src/nodejs/buffer/
 */

import type {} from "../type-bootstrap.ts";

export { Buffer } from "./buffer.ts";
export type { BufferEncoding } from "./buffer-encoding.ts";
export {
  atob,
  btoa,
  BufferConstants,
  constants,
  INSPECT_MAX_BYTES,
  isAscii,
  isUtf8,
  kMaxLength,
  kStringMaxLength,
  resolveObjectURL,
  SlowBuffer,
  transcode,
} from "./buffer-module.ts";
