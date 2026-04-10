/**
 * net.Server — TCP/IPC server.
 *
 *
 * This is substrate-heavy: actual TCP listening requires OS interop via .NET TcpListener.
 * Method signatures are correct; implementations that require OS interop use
 * TODO placeholders.
 */
import { overloads as O } from "@tsonic/core/lang.js";
import { EventEmitter, toEventListener } from "../events-module.ts";
import type { int, JsValue } from "@tsonic/core/types.js";
import { AddressInfo } from "./options.ts";
import type { ListenOptions, ServerOpts } from "./options.ts";
import type { Socket } from "./socket.ts";

/**
 * This class is used to create a TCP or IPC server.
 */
export class Server extends EventEmitter {
  private _listening: boolean = false;
  private _maxConnections: int = 0;
  private _connections: int = 0;
  private readonly _allowHalfOpen: boolean;
  private readonly _pauseOnConnect: boolean;
  private _boundPath: string | null = null;

  /**
   * Set to true when the server is listening for connections.
   */
  public get listening(): boolean {
    return this._listening;
  }

  /**
   * The maximum number of connections.
   */
  public get maxConnections(): int {
    return this._maxConnections;
  }

  public set maxConnections(value: int) {
    this._maxConnections = value;
  }

  constructor(
    optionsOrListener?: ServerOpts | ((socket: Socket) => void),
    connectionListener?: ((socket: Socket) => void)
  ) {
    super();

    if (typeof optionsOrListener === "function") {
      // Server(connectionListener)
      this._allowHalfOpen = false;
      this._pauseOnConnect = false;
      this.on("connection", (...args: JsValue[]) => {
        optionsOrListener(args[0] as Socket);
      });
    } else {
      // Server(options?, connectionListener?)
      this._allowHalfOpen = optionsOrListener?.allowHalfOpen ?? false;
      this._pauseOnConnect = optionsOrListener?.pauseOnConnect ?? false;
      if (connectionListener !== undefined) {
        this.on("connection", (...args: JsValue[]) => {
          connectionListener(args[0] as Socket);
        });
      }
    }
  }

  /**
   * Start a server listening for connections.
   */
  public listen(
    port: int,
    hostname: string,
    backlog: int,
    listeningListener?: () => void
  ): Server;
  public listen(
    port: int,
    hostname: string,
    listeningListener?: () => void
  ): Server;
  public listen(
    port: int,
    backlog: int,
    listeningListener?: () => void
  ): Server;
  public listen(port: int, listeningListener?: () => void): Server;
  public listen(
    options: ListenOptions,
    listeningListener?: () => void
  ): Server;
  public listen(
    portOrOptions: any,
    hostnameOrBacklogOrListener?: any,
    backlogOrListener?: any,
    listeningListener?: any
  ): any {
    if (typeof portOrOptions === "object") {
      return this.listen_options(portOrOptions, hostnameOrBacklogOrListener);
    }

    if (typeof hostnameOrBacklogOrListener === "string") {
      return typeof backlogOrListener === "number"
        ? this.listen_port_hostname_backlog(
            portOrOptions,
            hostnameOrBacklogOrListener,
            backlogOrListener,
            listeningListener
          )
        : this.listen_port_hostname(
            portOrOptions,
            hostnameOrBacklogOrListener,
            backlogOrListener
          );
    }

    if (typeof hostnameOrBacklogOrListener === "number") {
      return this.listen_port_backlog(
        portOrOptions,
        hostnameOrBacklogOrListener,
        backlogOrListener
      );
    }

    return this.listen_port(portOrOptions, hostnameOrBacklogOrListener);
  }

  public listen_port_hostname_backlog(
    port: int,
    hostname: string,
    backlog: int,
    listeningListener?: () => void
  ): Server {
    return this.listenInternal(port, hostname, backlog, listeningListener);
  }

  public listen_port_hostname(
    port: int,
    hostname: string,
    listeningListener?: () => void
  ): Server {
    return this.listenInternal(port, hostname, 511, listeningListener);
  }

  public listen_port_backlog(
    port: int,
    backlog: int,
    listeningListener?: () => void
  ): Server {
    return this.listenInternal(port, undefined, backlog, listeningListener);
  }

  public listen_port(
    port: int,
    listeningListener?: () => void
  ): Server {
    return this.listenInternal(port, undefined, 511, listeningListener);
  }

  public listen_options(
    options: ListenOptions,
    listeningListener?: () => void
  ): Server {
    if (options.port !== undefined) {
      return this.listenInternal(
        options.port,
        options.host,
        options.backlog ?? 511,
        listeningListener
      );
    }
    if (options.path !== undefined) {
      return this.listenPath(options.path, listeningListener);
    }
    throw new Error("Either port or path must be specified");
  }

  private listenPath(
    path: string,
    listeningListener: (() => void) | undefined
  ): Server {
    if (this._listening) {
      throw new Error("Server is already listening");
    }

    if (path.length === 0) {
      throw new Error("Path must not be empty");
    }

    if (listeningListener !== undefined) {
      this.once("listening", toEventListener(listeningListener)!);
    }

    this._boundPath = path;
    this._listening = true;
    this.emit("listening");
    return this;
  }

  private listenInternal(
    _port: int,
    _hostname: string | undefined,
    _backlog: int,
    listeningListener: (() => void) | undefined
  ): Server {
    if (this._listening) {
      throw new Error("Server is already listening");
    }

    if (listeningListener !== undefined) {
      this.once("listening", toEventListener(listeningListener)!);
    }

    // TODO: Create TcpListener and start accepting connections via OS interop.
    // In the CLR version this uses:
    //   var ipAddress = IPAddress.Parse(hostname ?? "0.0.0.0");
    //   _listener = new TcpListener(ipAddress, port);
    //   _listener.Start(backlog);
    //   _listening = true;
    //   emit("listening");
    //   Then starts a background loop calling AcceptTcpClient() to emit "connection" events.

    this._listening = true;
    this.emit("listening");

    return this;
  }

  /**
   * Stops the server from accepting new connections.
   */
  public close(callback?: (err?: Error) => void): Server {
    if (!this._listening) {
      const error = new Error("Server is not listening");
      if (callback !== undefined) {
        callback(error);
      }
      return this;
    }

    this._listening = false;
    this._boundPath = null;

    // TODO: Stop the TcpListener via OS interop

    if (callback !== undefined) {
      this.once(
        "close",
        toEventListener(() => callback(undefined))!
      );
    }

    this.emit("close");

    return this;
  }

  /**
   * Returns the bound address, the address family name, and port of the server.
   */
  public address(): AddressInfo | null {
    if (this._boundPath !== null) {
      return null;
    }

    // TODO: Read address info from the underlying TcpListener via OS interop.
    // In the CLR version this reads _listener.LocalEndpoint as IPEndPoint.
    return null;
  }

  /**
   * Asynchronously get the number of concurrent connections on the server.
   */
  public getConnections(
    callback: (err: Error | undefined, count: int) => void
  ): void {
    callback(undefined, this._connections);
  }

  /**
   * Calling unref() on a server will allow the program to exit if this is the only active server.
   */
  public unref(): Server {
    // Not applicable in managed context
    return this;
  }

  /**
   * Opposite of unref().
   */
  public ref(): Server {
    // Not applicable in managed context
    return this;
  }
}

O<Server>().method(x => x.listen_port_hostname_backlog).family(x => x.listen);
O<Server>().method(x => x.listen_port_hostname).family(x => x.listen);
O<Server>().method(x => x.listen_port_backlog).family(x => x.listen);
O<Server>().method(x => x.listen_port).family(x => x.listen);
O<Server>().method(x => x.listen_options).family(x => x.listen);
