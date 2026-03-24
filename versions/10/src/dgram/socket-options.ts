/**
 * Options for creating and binding dgram sockets.
 *
 * Baseline: nodejs-clr/src/nodejs/dgram/SocketOptions.cs
 */
import type { int } from "@tsonic/core/types.js";

/** Options for creating a dgram socket. */
export class SocketOptions {
  /** The type of socket - 'udp4' or 'udp6'. */
  public type: string = "udp4";

  /** If true, the socket will reuse the address. */
  public reuseAddr: boolean = false;

  /** If true, the socket will reuse the port (SO_REUSEPORT). */
  public reusePort: boolean = false;

  /** For IPv6 sockets, if true the socket will only receive IPv6 traffic. */
  public ipv6Only: boolean = false;

  /** Sets the SO_RCVBUF socket receive buffer size in bytes. */
  public recvBufferSize: int | undefined = undefined;

  /** Sets the SO_SNDBUF socket send buffer size in bytes. */
  public sendBufferSize: int | undefined = undefined;
}

/** Options for binding a dgram socket. */
export class BindOptions {
  /** The port to bind to. */
  public port: int | undefined = undefined;

  /** The address to bind to. */
  public address: string | undefined = undefined;

  /** If true, the socket will be bound exclusively. */
  public exclusive: boolean = false;

  /** File descriptor (not supported in native). */
  public fd: int | undefined = undefined;
}
