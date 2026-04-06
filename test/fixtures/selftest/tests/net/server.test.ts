import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Server,
  ServerOpts,
  Socket,
} from "@tsonic/nodejs/net.js";

export class ServerTests {
  public constructor_creates_instance(): void {
    const server: Server = new Server();
    Assert.NotNull(server);
    Assert.False(server.listening);
  }

  public constructor_with_listener_creates_instance(): void {
    const server: Server = new Server((_socket: Socket) => {
      // handler
    });
    Assert.NotNull(server);
  }

  public constructor_with_options_creates_instance(): void {
    const options: ServerOpts = new ServerOpts();
    options.allowHalfOpen = true;
    const server: Server = new Server(options, undefined);
    Assert.NotNull(server);
  }

  public listening_initially_false(): void {
    const server: Server = new Server();
    Assert.False(server.listening);
  }

  public max_connections_can_be_set(): void {
    const server: Server = new Server();
    server.maxConnections = 100;
    Assert.Equal(100, server.maxConnections);
  }

  public unref_returns_server(): void {
    const server: Server = new Server();
    const result: Server = server.unref();
    Assert.Equal(server, result);
  }

  public ref_returns_server(): void {
    const server: Server = new Server();
    const result: Server = server.ref();
    Assert.Equal(server, result);
  }

  public get_connections_returns_count(): void {
    const server: Server = new Server();
    let connectionCount = -1;

    server.getConnections((_err, count) => {
      connectionCount = count;
    });

    Assert.Equal(0, connectionCount);
  }
}

A<ServerTests>()
  .method((t) => t.constructor_creates_instance)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.constructor_with_listener_creates_instance)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.constructor_with_options_creates_instance)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.listening_initially_false)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.max_connections_can_be_set)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.unref_returns_server)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.ref_returns_server)
  .add(FactAttribute);
A<ServerTests>()
  .method((t) => t.get_connections_returns_count)
  .add(FactAttribute);
