/**
 * Node.js net module — asynchronous network API for creating stream-based
 * TCP or IPC servers and clients.
 *
 * Baseline: nodejs-clr/src/nodejs/net/net.cs
 */

import type {} from "../type-bootstrap.js";

import type { int } from "@tsonic/core/types.js";

export { BlockList } from "./block-list.ts";
export { SocketAddress } from "./block-list.ts";
export { Socket } from "./socket.ts";
export { Server } from "./server.ts";
export {
  AddressInfo,
  IpcSocketConnectOpts,
  ListenOptions,
  ServerOpts,
  SocketAddressInitOptions,
  SocketConstructorOpts,
  TcpSocketConnectOpts,
} from "./options.ts";

import { Server } from "./server.ts";
import { Socket } from "./socket.ts";
import type { ServerOpts, TcpSocketConnectOpts } from "./options.ts";

// ==================== Module-level state ====================

let defaultAutoSelectFamily: boolean = false;
let defaultAutoSelectFamilyAttemptTimeout: int = 250;

// ==================== createServer ====================

/**
 * Creates a new TCP or IPC server.
 */
export function createServer(
  connectionListener?: (socket: Socket) => void
): Server;
export function createServer(
  options: ServerOpts,
  connectionListener?: (socket: Socket) => void
): Server;
export function createServer(
  optionsOrListener?: ServerOpts | ((socket: Socket) => void),
  connectionListener?: (socket: Socket) => void
): Server {
  if (typeof optionsOrListener === "function") {
    return new Server(optionsOrListener);
  }
  if (optionsOrListener !== undefined) {
    return new Server(optionsOrListener, connectionListener);
  }
  if (connectionListener !== undefined) {
    return new Server(connectionListener);
  }
  return new Server();
}

// ==================== connect / createConnection ====================

/**
 * Creates a new socket connection.
 */
export function connect(
  port: int,
  host?: string,
  connectionListener?: () => void
): Socket;
export function connect(
  options: TcpSocketConnectOpts,
  connectionListener?: () => void
): Socket;
export function connect(
  path: string,
  connectionListener?: () => void
): Socket;
export function connect(
  portOrOptionsOrPath: int | TcpSocketConnectOpts | string,
  hostOrListener?: string | (() => void),
  connectionListener?: () => void
): Socket {
  const socket = new Socket();

  if (typeof portOrOptionsOrPath === "string") {
    const listener =
      typeof hostOrListener === "function" ? hostOrListener : undefined;
    socket.connect(portOrOptionsOrPath, listener);
    return socket;
  }

  if (typeof portOrOptionsOrPath === "number") {
    const host =
      typeof hostOrListener === "string" ? hostOrListener : undefined;
    const listener =
      typeof hostOrListener === "function"
        ? hostOrListener
        : connectionListener;
    socket.connect(portOrOptionsOrPath, host, listener);
    return socket;
  }

  const listener =
    typeof hostOrListener === "function" ? hostOrListener : undefined;
  socket.connect(portOrOptionsOrPath, listener);
  return socket;
}

/**
 * Alias for connect().
 */
export function createConnection(
  port: int,
  host?: string,
  connectionListener?: () => void
): Socket;
export function createConnection(
  options: TcpSocketConnectOpts,
  connectionListener?: () => void
): Socket;
export function createConnection(
  path: string,
  connectionListener?: () => void
): Socket;
export function createConnection(
  portOrOptionsOrPath: int | TcpSocketConnectOpts | string,
  hostOrListener?: string | (() => void),
  connectionListener?: () => void
): Socket {
  if (typeof portOrOptionsOrPath === "string") {
    const listener =
      typeof hostOrListener === "function" ? hostOrListener : connectionListener;
    return connect(portOrOptionsOrPath, listener);
  }

  if (typeof portOrOptionsOrPath === "number") {
    const host =
      typeof hostOrListener === "string" ? hostOrListener : undefined;
    const listener =
      typeof hostOrListener === "function" ? hostOrListener : connectionListener;
    return connect(portOrOptionsOrPath, host, listener);
  }

  const listener =
    typeof hostOrListener === "function" ? hostOrListener : connectionListener;
  return connect(portOrOptionsOrPath, listener);
}

// ==================== IP Utilities ====================

const IPV4_REGEX =
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

const IPV6_REGEX =
  /^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]+|::(ffff(:0{1,4})?:)?((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1?[0-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1?[0-9])?[0-9]))$/;

/**
 * Tests if input is an IP address. Returns 0 for invalid strings,
 * returns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses.
 */
export const isIP = (input: string): int => {
  if (input === undefined || input === null || input.length === 0) {
    return 0;
  }

  if (IPV4_REGEX.test(input)) {
    return 4;
  }

  if (IPV6_REGEX.test(input)) {
    return 6;
  }

  return 0;
};

/**
 * Returns true if input is a version 4 IP address, otherwise returns false.
 */
export const isIPv4 = (input: string): boolean => {
  return isIP(input) === 4;
};

/**
 * Returns true if input is a version 6 IP address, otherwise returns false.
 */
export const isIPv6 = (input: string): boolean => {
  return isIP(input) === 6;
};

// ==================== Auto-Select Family Configuration ====================

/**
 * Gets the default value of autoSelectFamily option of socket.connect(options).
 */
export const getDefaultAutoSelectFamily = (): boolean => {
  return defaultAutoSelectFamily;
};

/**
 * Sets the default value of autoSelectFamily option of socket.connect(options).
 */
export const setDefaultAutoSelectFamily = (value: boolean): void => {
  defaultAutoSelectFamily = value;
};

/**
 * Gets the default value of autoSelectFamilyAttemptTimeout option of socket.connect(options).
 */
export const getDefaultAutoSelectFamilyAttemptTimeout = (): int => {
  return defaultAutoSelectFamilyAttemptTimeout;
};

/**
 * Sets the default value of autoSelectFamilyAttemptTimeout option of socket.connect(options).
 */
export const setDefaultAutoSelectFamilyAttemptTimeout = (
  value: int
): void => {
  defaultAutoSelectFamilyAttemptTimeout = value;
};
