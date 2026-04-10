/**
 * Node.js url module — URL parsing, formatting, and resolution utilities.
 *
 */

import type {} from "../type-bootstrap.ts";
import type { JsValue } from "@tsonic/core/types.js";
import { IdnMapping } from "@tsonic/dotnet/System.Globalization.js";
import { Uri } from "@tsonic/dotnet/System.js";
import { Path } from "@tsonic/dotnet/System.IO.js";

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

export const domainToASCII = (domain: string): string => {
  if (domain.length === 0) {
    return "";
  }

  try {
    return new IdnMapping().GetAscii(domain);
  } catch {
    return "";
  }
};

export const domainToUnicode = (domain: string): string => {
  if (domain.length === 0) {
    return "";
  }

  try {
    return new IdnMapping().GetUnicode(domain);
  } catch {
    return "";
  }
};

export const pathToFileURL = (filePath: string): URL => {
  const fullPath = Path.GetFullPath(filePath);
  return new URL(new Uri(fullPath).AbsoluteUri);
};

export const fileURLToPath = (input: string | URL): string => {
  const href = typeof input === "string" ? input : input.href;
  return new Uri(href).LocalPath;
};

export const urlToHttpOptions = (
  input: URL,
): {
  protocol: string;
  hostname: string;
  hash: string;
  search: string;
  pathname: string;
  path: string;
  href: string;
  port?: number;
  auth?: string;
} => {
  const auth =
    input.username.length > 0
      ? `${input.username}:${input.password}`
      : undefined;

  return {
    protocol: input.protocol,
    hostname: input.hostname,
    hash: input.hash,
    search: input.search,
    pathname: input.pathname,
    path: `${input.pathname}${input.search}`,
    href: input.href,
    port: input.port.length > 0 ? parseInt(input.port, 10) : undefined,
    auth,
  };
};
