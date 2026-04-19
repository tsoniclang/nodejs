/**
 * net module — option types and data classes.
 *
 */
import type { int } from "@tsonic/core/types.js";

/**
 * Address information returned by server.address() and socket.address().
 */
export class AddressInfo {
  public address: string = "";
  public family: string = "";
  public port: int = 0;
}

/**
 * Options for Socket constructor.
 */
export class SocketConstructorOpts {
  public fd: int | undefined = undefined;
  public allowHalfOpen: boolean | undefined = undefined;
  public readable: boolean | undefined = undefined;
  public writable: boolean | undefined = undefined;
}

/**
 * TCP socket connection options.
 */
export class TcpSocketConnectOpts {
  public port: int = 0;
  public host: string | undefined = undefined;
  public localAddress: string | undefined = undefined;
  public localPort: int | undefined = undefined;
  public hints: int | undefined = undefined;
  public family: int | undefined = undefined;
  public noDelay: boolean | undefined = undefined;
  public keepAlive: boolean | undefined = undefined;
  public keepAliveInitialDelay: int | undefined = undefined;
}

/**
 * IPC socket connection options.
 */
export class IpcSocketConnectOpts {
  public path: string = "";
}

/**
 * Options for server.listen().
 */
export class ListenOptions {
  public port: int | undefined = undefined;
  public host: string | undefined = undefined;
  public path: string | undefined = undefined;
  public backlog: int | undefined = undefined;
  public ipv6Only: boolean | undefined = undefined;
}

/**
 * Options for Server constructor.
 */
export class ServerOpts {
  public allowHalfOpen: boolean | undefined = undefined;
  public pauseOnConnect: boolean | undefined = undefined;
}

/**
 * Options for SocketAddress constructor.
 */
export class SocketAddressInitOptions {
  public address: string | undefined = undefined;
  public family: string | undefined = undefined;
  public flowlabel: int | undefined = undefined;
  public port: int | undefined = undefined;
}
