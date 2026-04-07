/**
 * Node.js url module — URL parsing, formatting, and resolution utilities.
 *
 * Baseline: nodejs-clr/src/nodejs/url/module.cs
 */

import type {} from "../type-bootstrap.ts";
import type { JsValue } from "@tsonic/core/types.js";

export { URL } from "./url.ts";
export { URLSearchParams } from "./urlsearch-params.ts";
export { URLPattern } from "./urlpattern.ts";

import { URL } from "./url.ts";

/**
 * Parses URL input and returns URL instance.
 */
export const parse = (input: string): URL | null => {
  return URL.parse(input);
};

/**
 * Formats URL input to string.
 */
export const format = (input: JsValue): string => {
  if (input === null || input === undefined) {
    return "";
  }
  if (input instanceof URL) {
    return input.href;
  }
  if (typeof input === "string") {
    const parsed = URL.parse(input);
    return parsed !== null ? parsed.href : input;
  }
  return String(input);
};

/**
 * Resolves relative URL against a base URL.
 */
export const resolve = (from: string, to: string): string => {
  const resolved = new URL(to, from);
  return resolved.href;
};

// TODO: domainToASCII, domainToUnicode — require punycode/IDN support
// TODO: pathToFileURL, fileURLToPath — require filesystem path integration
// TODO: urlToHttpOptions — deferred until http module is ported
