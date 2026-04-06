/**
 * Node.js http.RequestOptions — options for making HTTP requests.
 *
 * Baseline: nodejs-clr/src/nodejs/http/RequestOptions.cs
 */

import type { int, JsValue } from "@tsonic/core/types.js";

/**
 * Options for making HTTP requests.
 * Matches Node.js http.RequestOptions interface.
 */
export class RequestOptions {
  /**
   * Domain name or IP address of the server. Default: 'localhost'
   */
  public hostname: string | null = null;

  /**
   * Alias for hostname.
   */
  public get host(): string | null {
    return this.hostname;
  }

  public set host(value: string | null) {
    this.hostname = value;
  }

  /**
   * Port of remote server. Default: 80
   */
  public port: int = 80 as int;

  /**
   * Request path. Should include query string if any. Default: '/'
   */
  public path: string | null = "/";

  /**
   * HTTP request method. Default: 'GET'
   */
  public method: string = "GET";

  /**
   * Object containing request headers.
   */
  public headers: Map<string, string> | null = null;

  /**
   * Protocol to use. Default: 'http:'
   */
  public protocol: string = "http:";

  /**
   * Request timeout in milliseconds. Default: no timeout
   */
  public timeout: int | null = null;

  /**
   * Controls Agent behavior. Possible values:
   * - null (default): use global agent
   * - Agent instance: explicitly use passed Agent
   * - false: disable connection pooling
   */
  public agent: JsValue = null;

  /**
   * Authentication in the form 'user:password' for basic auth.
   */
  public auth: string | null = null;
}
