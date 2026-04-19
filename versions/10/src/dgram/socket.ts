/**
 * DgramSocket — UDP socket for sending and receiving datagrams.
 *
 *
 * NOTE: All OS-level UDP interop is deferred with TODO markers.
 * The class shape faithfully mirrors the Node.js dgram.Socket API.
 */

import { overloads as O } from "@tsonic/core/lang.js";
import { EventEmitter } from "../events-module.ts";
import type { int, JsValue } from "@tsonic/core/types.js";
import { stringToBytes } from "../buffer/buffer-encoding.ts";
import { RemoteInfo } from "./remote-info.ts";
import { SocketOptions, BindOptions } from "./socket-options.ts";

/** Address information returned by socket.address() and socket.remoteAddress(). */
export class AddressInfo {
  public address: string = "";
  public family: string = "IPv4";
  public port: int = 0;
}

export class DgramSocket extends EventEmitter {
  private readonly _type: string;
  private readonly _options: SocketOptions;
  private _isBound: boolean = false;
  private _isClosed: boolean = false;
  private _isConnected: boolean = false;
  private _localAddress: AddressInfo | undefined = undefined;
  private _remoteAddress: AddressInfo | undefined = undefined;
  private _recvBufferSize: int = 65536 as int;
  private _sendBufferSize: int = 65536 as int;
  private readonly _sourceSpecificMemberships: string[] = [];
  private _boundFileDescriptor: int | undefined = undefined;

  constructor(
    typeOrOptions: string | SocketOptions,
    callback?: (msg: Uint8Array, rinfo: RemoteInfo) => void,
  ) {
    super();

    if (typeof typeOrOptions === "string") {
      this._type = typeOrOptions;
      this._options = new SocketOptions();
      this._options.type = typeOrOptions;
    } else {
      this._type = typeOrOptions.type;
      this._options = typeOrOptions;
    }

    if (callback !== undefined) {
      this.on("message", (...args: JsValue[]) => {
        callback(args[0] as Uint8Array, args[1] as RemoteInfo);
      });
    }
  }

  /**
   * Returns an object containing the address information for a socket.
   */
  address(): AddressInfo {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    // TODO: OS interop — read actual local endpoint from native UDP socket
    return this._localAddress!;
  }

  /**
   * Causes the socket to listen for datagram messages on a named port and optional address.
   */
  bind(): DgramSocket;
  bind(port: int, address?: string, callback?: () => void): DgramSocket;
  bind(port: int, callback: () => void): DgramSocket;
  bind(callback: () => void): DgramSocket;
  bind(options: BindOptions, callback?: () => void): DgramSocket;
  bind(portOrCallbackOrOptions?: any, addressOrCallback?: any, callback?: any): any {
    if (portOrCallbackOrOptions === undefined) {
      return this.bind_empty();
    }

    if (typeof portOrCallbackOrOptions === "function") {
      return this.bind_callback(portOrCallbackOrOptions);
    }

    if (typeof portOrCallbackOrOptions === "object") {
      return this.bind_options(portOrCallbackOrOptions, addressOrCallback);
    }

    if (typeof addressOrCallback === "function") {
      return this.bind_port_callback(portOrCallbackOrOptions, addressOrCallback);
    }

    return this.bind_port_address(portOrCallbackOrOptions, addressOrCallback, callback);
  }

  bind_empty(): DgramSocket {
    return this.bindImpl();
  }

  bind_port_address(
    port: int,
    address?: string,
    callback?: () => void,
  ): DgramSocket {
    return this.bindImpl(port, address, callback);
  }

  bind_port_callback(port: int, callback: () => void): DgramSocket {
    return this.bindImpl(port, callback);
  }

  bind_callback(callback: () => void): DgramSocket {
    return this.bindImpl(callback);
  }

  bind_options(options: BindOptions, callback?: () => void): DgramSocket {
    return this.bindImpl(options, callback);
  }

  /**
   * Close the underlying socket and stop listening for data on it.
   */
  close(callback?: () => void): DgramSocket {
    if (this._isClosed) {
      return this;
    }

    this._isClosed = true;
    this._boundFileDescriptor = undefined;

    // TODO: OS interop — close and dispose native UDP socket

    this.emit("close");

    if (callback !== undefined) {
      callback();
    }

    return this;
  }

  /**
   * Associates the socket to a remote address and port.
   */
  connect(port: int, address?: string, callback?: () => void): void;
  connect(port: int, callback: () => void): void;
  connect(port: any, addressOrCallback?: any, callback?: any): any {
    if (typeof addressOrCallback === "function") {
      return this.connect_port_callback(port, addressOrCallback);
    }

    return this.connect_port_address(port, addressOrCallback, callback);
  }

  connect_port_address(
    port: int,
    address?: string,
    callback?: () => void,
  ): void {
    this.connectImpl(port, address, callback);
  }

  connect_port_callback(port: int, callback: () => void): void {
    this.connectImpl(port, callback);
  }

  /**
   * Disassociates a connected socket from its remote address.
   */
  disconnect(): void {
    if (!this._isConnected) {
      throw new Error("Socket is not connected");
    }

    this._remoteAddress = undefined;
    this._isConnected = false;
  }

  /**
   * Broadcasts a datagram on the socket.
   */
  send(msg: Uint8Array | string, callback: (error: Error | null, bytes: number) => void): void;
  send(msg: Uint8Array | string, port: int, callback: (error: Error | null, bytes: number) => void): void;
  send(
    msg: Uint8Array | string,
    port: int,
    address: string,
    callback?: (error: Error | null, bytes: number) => void,
  ): void;
  send(msg: Uint8Array, offset: int, length: int, callback?: (error: Error | null, bytes: number) => void): void;
  send(
    msg: Uint8Array,
    offset: int,
    length: int,
    port: int,
    callback?: (error: Error | null, bytes: number) => void,
  ): void;
  send(
    msg: Uint8Array,
    offset: int,
    length: int,
    port: int,
    address: string,
    callback?: (error: Error | null, bytes: number) => void,
  ): void;
  send(
    msg: any,
    arg1?: any,
    arg2?: any,
    arg3?: any,
    arg4?: any,
    arg5?: any,
  ): any {
    if (typeof arg1 === "function") {
      return this.send_message_callback(msg, arg1);
    }

    if (typeof msg === "string") {
      if (typeof arg2 === "function") {
        return this.send_message_port_callback(msg, arg1, arg2);
      }

      return this.send_message_port_address(msg, arg1, arg2, arg3);
    }

    if (typeof arg1 === "number" && typeof arg2 === "number") {
      if (typeof arg3 === "number") {
        if (typeof arg4 === "string") {
          return this.send_buffer_offset_length_port_address(msg, arg1, arg2, arg3, arg4, arg5);
        }

        return this.send_buffer_offset_length_port(msg, arg1, arg2, arg3, arg4);
      }

      return this.send_buffer_offset_length(msg, arg1, arg2, arg3);
    }

    if (typeof arg2 === "function") {
      return this.send_message_port_callback(msg, arg1, arg2);
    }

    return this.send_message_port_address(msg, arg1, arg2, arg3);
  }

  send_message_callback(
    msg: Uint8Array | string,
    callback: (error: Error | null, bytes: number) => void,
  ): void {
    this.sendImpl(msg, [callback]);
  }

  send_message_port_callback(
    msg: Uint8Array | string,
    port: int,
    callback: (error: Error | null, bytes: number) => void,
  ): void {
    this.sendImpl(msg, [port, callback]);
  }

  send_message_port_address(
    msg: Uint8Array | string,
    port: int,
    address: string,
    callback?: (error: Error | null, bytes: number) => void,
  ): void {
    const args: JsValue[] = [port, address];
    if (callback !== undefined) {
      args.push(callback);
    }
    this.sendImpl(msg, args);
  }

  send_buffer_offset_length(
    msg: Uint8Array,
    offset: int,
    length: int,
    callback?: (error: Error | null, bytes: number) => void,
  ): void {
    const args: JsValue[] = [offset, length];
    if (callback !== undefined) {
      args.push(callback);
    }
    this.sendImpl(msg, args);
  }

  send_buffer_offset_length_port(
    msg: Uint8Array,
    offset: int,
    length: int,
    port: int,
    callback?: (error: Error | null, bytes: number) => void,
  ): void {
    const args: JsValue[] = [offset, length, port];
    if (callback !== undefined) {
      args.push(callback);
    }
    this.sendImpl(msg, args);
  }

  send_buffer_offset_length_port_address(
    msg: Uint8Array,
    offset: int,
    length: int,
    port: int,
    address: string,
    callback?: (error: Error | null, bytes: number) => void,
  ): void {
    const args: JsValue[] = [offset, length, port, address];
    if (callback !== undefined) {
      args.push(callback);
    }
    this.sendImpl(msg, args);
  }

  private bindImpl(
    portOrCallbackOrOptions?: int | (() => void) | BindOptions,
    addressOrCallback?: string | (() => void),
    callback?: () => void,
  ): DgramSocket {
    if (this._isBound) {
      throw new Error("Socket is already bound");
    }

    let port: int = 0;
    let address: string | undefined = undefined;
    let cb: (() => void) | undefined = undefined;

    if (portOrCallbackOrOptions === undefined) {
      cb = typeof addressOrCallback === "function" ? addressOrCallback : callback;
    } else if (typeof portOrCallbackOrOptions === "function") {
      // bind(callback)
      cb = portOrCallbackOrOptions;
    } else if (
      typeof portOrCallbackOrOptions === "object" &&
      portOrCallbackOrOptions !== null &&
      portOrCallbackOrOptions !== undefined
    ) {
      // bind(options, callback?)
      const options = portOrCallbackOrOptions as BindOptions;

      if (options.fd !== undefined) {
        this._boundFileDescriptor = options.fd;
      }

      port = options.port ?? 0;
      address = options.address;
      cb = typeof addressOrCallback === "function" ? addressOrCallback : callback;
    } else {
      // bind(port?, address?, callback?)
      if (typeof portOrCallbackOrOptions === "number") {
        const numericPort: int = portOrCallbackOrOptions;
        port = numericPort;
      } else {
        port = 0;
      }

      if (typeof addressOrCallback === "function") {
        cb = addressOrCallback;
      } else {
        address = addressOrCallback;
        cb = callback;
      }
    }

    try {
      // TODO: OS interop — create native UDP socket and bind to port/address
      // Apply socket options: _options.reuseAddr, _options.recvBufferSize, _options.sendBufferSize
      // Determine address family from _type ("udp4" → IPv4, "udp6" → IPv6)

      const bindAddress =
        address !== undefined && address !== null
          ? address
          : this._type === "udp6"
            ? "::"
            : "0.0.0.0";

      this._localAddress = new AddressInfo();
      this._localAddress.address = bindAddress;
      this._localAddress.family = this._type === "udp6" ? "IPv6" : "IPv4";
      this._localAddress.port = port;
      this._isBound = true;

      // TODO: OS interop — start receiving messages on background thread

      this.emit("listening");

      if (cb !== undefined) {
        cb();
      }
    } catch (ex) {
      const error: Error = ex instanceof Error ? ex : new Error(String(ex));
      this.emit("error", error);
    }

    return this;
  }

  private connectImpl(
    port: int,
    addressOrCallback?: string | (() => void),
    callback?: () => void,
  ): void {
    if (this._isConnected) {
      throw new Error("Socket is already connected");
    }

    let address: string | undefined = undefined;
    let cb: (() => void) | undefined = undefined;

    if (typeof addressOrCallback === "function") {
      cb = addressOrCallback;
    } else {
      address = addressOrCallback;
      cb = callback;
    }

    try {
      if (address === undefined || address === null) {
        address = this._type === "udp6" ? "::1" : "127.0.0.1";
      }

      // Auto-bind if not already bound
      if (!this._isBound) {
        this.bindImpl();
      }

      // TODO: OS interop — connect native UDP socket to remote endpoint

      this._remoteAddress = new AddressInfo();
      this._remoteAddress.address = address;
      this._remoteAddress.family = this._type === "udp6" ? "IPv6" : "IPv4";
      this._remoteAddress.port = port;
      this._isConnected = true;

      this.emit("connect");

      if (cb !== undefined) {
        cb();
      }
    } catch (ex) {
      const error: Error = ex instanceof Error ? ex : new Error(String(ex));
      this.emit("error", error);

      if (cb !== undefined) {
        cb();
      }
    }
  }
  
  private sendImpl(msg: Uint8Array | string, args: readonly JsValue[]): void {
    // Parse the complex overloaded signature
    const parsed = parseSendArgs(msg, args);

    try {
      if (!this._isBound) {
        // Auto-bind if not bound
        this.bindImpl();
      }

      const bytes = parsed.data;
      const bytesSent: number = bytes.length;

      if (this._isConnected) {
        // TODO: OS interop — send data via connected native UDP socket
      } else {
        if (parsed.port === undefined) {
          throw new Error("Port must be specified for unconnected socket");
        }

        // TODO: OS interop — send data to specified endpoint via native UDP socket
      }

      if (parsed.callback !== undefined) {
        parsed.callback(null, bytesSent);
      }
    } catch (ex) {
      const error: Error = ex instanceof Error ? ex : new Error(String(ex));
      this.emit("error", error);

      if (parsed.callback !== undefined) {
        parsed.callback(error, 0);
      }
    }
  }

  /**
   * Sets or clears the SO_BROADCAST socket option.
   */
  setBroadcast(flag: boolean): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    // TODO: OS interop — set SO_BROADCAST on native socket
    void flag;
  }

  /**
   * Sets the IP_MULTICAST_TTL socket option.
   */
  setMulticastTTL(ttl: int): int {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    if (ttl < 0 || ttl > 255) {
      throw new Error("TTL must be between 0 and 255");
    }

    // TODO: OS interop — set IP_MULTICAST_TTL on native socket
    return ttl;
  }

  /**
   * Sets or clears the IP_MULTICAST_LOOP socket option.
   */
  setMulticastLoopback(flag: boolean): boolean {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    // TODO: OS interop — set IP_MULTICAST_LOOP on native socket
    return flag;
  }

  /**
   * Tells the kernel to join a multicast group.
   */
  addMembership(multicastAddress: string, multicastInterface?: string): void {
    if (!this._isBound) {
      // Auto-bind if not bound
      this.bindImpl();
    }

    // TODO: OS interop — join multicast group on native socket
    void multicastAddress;
    void multicastInterface;
  }

  /**
   * Instructs the kernel to leave a multicast group.
   */
  dropMembership(multicastAddress: string): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    // TODO: OS interop — leave multicast group on native socket
    void multicastAddress;
  }

  /**
   * Sets the default outgoing multicast interface of the socket.
   */
  setMulticastInterface(multicastInterface: string): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    // TODO: OS interop — set multicast interface on native socket
    void multicastInterface;
  }

  /**
   * Sets the IP_TTL socket option.
   */
  setTTL(ttl: int): int {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    if (ttl < 1 || ttl > 255) {
      throw new Error("TTL must be between 1 and 255");
    }

    // TODO: OS interop — set IP_TTL on native socket
    return ttl;
  }

  /**
   * Gets the number of bytes queued for sending.
   * Note: Returns 0 as a stub — not available without native socket.
   */
  getSendQueueSize(): int {
    return 0;
  }

  /**
   * Gets the number of send requests currently in the queue.
   * Note: Returns 0 as a stub — not available without native socket.
   */
  getSendQueueCount(): int {
    return 0;
  }

  /**
   * Adds the socket back to reference counting.
   * Note: No-op for API compatibility.
   */
  ref(): DgramSocket {
    return this;
  }

  /**
   * Excludes the socket from reference counting.
   * Note: No-op for API compatibility.
   */
  unref(): DgramSocket {
    return this;
  }

  /**
   * Tells the kernel to join a source-specific multicast channel.
   */
  addSourceSpecificMembership(
    sourceAddress: string,
    groupAddress: string,
    multicastInterface?: string,
  ): void {
    if (!this._isBound) {
      this.bindImpl();
    }

    const key = buildSourceMembershipKey(
      sourceAddress,
      groupAddress,
      multicastInterface,
    );

    if (this._sourceSpecificMemberships.indexOf(key) < 0) {
      this._sourceSpecificMemberships.push(key);
    }
  }

  /**
   * Instructs the kernel to leave a source-specific multicast channel.
   */
  dropSourceSpecificMembership(
    sourceAddress: string,
    groupAddress: string,
    multicastInterface?: string,
  ): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    const key = buildSourceMembershipKey(
      sourceAddress,
      groupAddress,
      multicastInterface,
    );
    const index = this._sourceSpecificMemberships.indexOf(key);
    if (index >= 0) {
      this._sourceSpecificMemberships.splice(index, 1);
    }
  }

  /**
   * Sets the SO_RCVBUF socket receive buffer size.
   */
  setRecvBufferSize(size: int): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    this._recvBufferSize = size;
  }

  /**
   * Sets the SO_SNDBUF socket send buffer size.
   */
  setSendBufferSize(size: int): void {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    this._sendBufferSize = size;
  }

  /**
   * Gets the SO_RCVBUF socket receive buffer size.
   */
  getRecvBufferSize(): int {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    return this._recvBufferSize;
  }

  /**
   * Gets the SO_SNDBUF socket send buffer size.
   */
  getSendBufferSize(): int {
    if (!this._isBound) {
      throw new Error("Socket is not bound");
    }

    return this._sendBufferSize;
  }

  /**
   * Returns the remote endpoint information.
   */
  remoteAddress(): AddressInfo {
    if (!this._isConnected || this._remoteAddress === undefined) {
      throw new Error("Socket is not connected");
    }

    return this._remoteAddress;
  }
}

O<DgramSocket>().method(x => x.bind_empty).family(x => x.bind);
O<DgramSocket>().method(x => x.bind_port_address).family(x => x.bind);
O<DgramSocket>().method(x => x.bind_port_callback).family(x => x.bind);
O<DgramSocket>().method(x => x.bind_callback).family(x => x.bind);
O<DgramSocket>().method(x => x.bind_options).family(x => x.bind);
O<DgramSocket>().method(x => x.connect_port_address).family(x => x.connect);
O<DgramSocket>().method(x => x.connect_port_callback).family(x => x.connect);
O<DgramSocket>().method(x => x.send_message_callback).family(x => x.send);
O<DgramSocket>().method(x => x.send_message_port_callback).family(x => x.send);
O<DgramSocket>().method(x => x.send_message_port_address).family(x => x.send);
O<DgramSocket>().method(x => x.send_buffer_offset_length).family(x => x.send);
O<DgramSocket>().method(x => x.send_buffer_offset_length_port).family(x => x.send);
O<DgramSocket>().method(x => x.send_buffer_offset_length_port_address).family(x => x.send);

/** Parsed arguments for the send() method. */
type ParsedSendArgs = {
  readonly data: Uint8Array;
  readonly port: number | undefined;
  readonly address: string | undefined;
  readonly callback: ((error: Error | null, bytes: number) => void) | undefined;
};

const toInt32 = (value: number): int => {
  if (
    Number.isInteger(value) &&
    value >= -2147483648 &&
    value <= 2147483647
  ) {
    return value as int;
  }

  throw new RangeError("Expected Int32-compatible numeric value");
};

const toNumberArg = (value: JsValue): number => {
  const numeric = Number(value);
  if (Number.isNaN(numeric)) {
    throw new RangeError("Expected numeric argument");
  }
  return numeric;
};

const copyRange = (data: Uint8Array, start: int, end: int): Uint8Array => {
  const result = new Uint8Array(end - start);
  for (let index = 0; index < result.length; index += 1) {
    result[index] = data[start + index]!;
  }
  return result;
};

const toBytes = (msg: Uint8Array | string): Uint8Array => {
  if (typeof msg === "string") {
    return stringToBytes(msg, "utf8");
  }
  return msg;
};

/**
 * Parses the complex overloaded send() arguments into a normalized structure.
 */
const parseSendArgs = (
  msg: Uint8Array | string,
  args: readonly JsValue[],
): ParsedSendArgs => {
  const arg0 = args.length > 0 ? args[0] : undefined;
  const arg1 = args.length > 1 ? args[1] : undefined;
  const arg2 = args.length > 2 ? args[2] : undefined;
  const arg3 = args.length > 3 ? args[3] : undefined;
  const arg4 = args.length > 4 ? args[4] : undefined;

  // send(msg) — no extra args
  if (args.length === 0) {
    return { data: toBytes(msg), port: undefined, address: undefined, callback: undefined };
  }

  // send(msg, callback)
  if (args.length === 1 && typeof arg0 === "function") {
    return {
      data: toBytes(msg),
      port: undefined,
      address: undefined,
      callback: arg0 as (error: Error | null, bytes: number) => void,
    };
  }

  // Check if this is the offset/length form: send(msg, offset, length, ...)
  // This form is only valid when msg is Uint8Array and args[0] and args[1] are numbers
  if (
    msg instanceof Uint8Array &&
    args.length >= 2 &&
    typeof arg0 === "number" &&
    typeof arg1 === "number"
  ) {
    const buffer = msg as Uint8Array;
    const offset = toInt32(toNumberArg(arg0));
    const length = toInt32(toNumberArg(arg1));

    if (offset < 0 || offset >= buffer.length) {
      throw new RangeError("Offset must be within buffer bounds");
    }
    if (length < 0 || offset + length > buffer.length) {
      throw new RangeError("Length must be within buffer bounds");
    }

    const slice = copyRange(buffer, offset, toInt32(offset + length));

    // send(msg, offset, length)
    if (args.length === 2) {
      return { data: slice, port: undefined, address: undefined, callback: undefined };
    }

    // send(msg, offset, length, callback)
    if (args.length === 3 && typeof arg2 === "function") {
      return {
        data: slice,
        port: undefined,
        address: undefined,
        callback: arg2 as (error: Error | null, bytes: number) => void,
      };
    }

    // send(msg, offset, length, port, ...)
    if (typeof arg2 === "number") {
      const port = toNumberArg(arg2);

      // send(msg, offset, length, port)
      if (args.length === 3) {
        return { data: slice, port, address: undefined, callback: undefined };
      }

      // send(msg, offset, length, port, callback)
      if (args.length === 4 && typeof arg3 === "function") {
        return {
          data: slice,
          port,
          address: undefined,
          callback: arg3 as (error: Error | null, bytes: number) => void,
        };
      }

      // send(msg, offset, length, port, address, callback?)
      const address = typeof arg3 === "string" ? arg3 : undefined;
      const cb =
        typeof arg4 === "function"
          ? (arg4 as (error: Error | null, bytes: number) => void)
          : undefined;
      return { data: slice, port, address, callback: cb };
    }

    return { data: slice, port: undefined, address: undefined, callback: undefined };
  }

  // Non-offset form: send(msg, port?, address?, callback?)
  const data = toBytes(msg);

  // send(msg, port, ...)
  if (typeof arg0 === "number") {
    const port = toNumberArg(arg0);

    // send(msg, port)
    if (args.length === 1) {
      return { data, port, address: undefined, callback: undefined };
    }

    // send(msg, port, callback)
    if (args.length === 2 && typeof arg1 === "function") {
      return {
        data,
        port,
        address: undefined,
        callback: arg1 as (error: Error | null, bytes: number) => void,
      };
    }

    // send(msg, port, address, callback?)
    const address = typeof arg1 === "string" ? arg1 : undefined;
    const cb =
      typeof arg2 === "function"
        ? (arg2 as (error: Error | null, bytes: number) => void)
        : undefined;
    return { data, port, address, callback: cb };
  }

  return { data, port: undefined, address: undefined, callback: undefined };
};

const buildSourceMembershipKey = (
  sourceAddress: string,
  groupAddress: string,
  multicastInterface?: string,
): string =>
  `${sourceAddress}|${groupAddress}|${multicastInterface ?? ""}`;
