import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  createServer,
  ListenOptions,
  Server,
  ServerOpts,
  Socket,
} from "@tsonic/nodejs/net.js";

export class CreateServerTests {
  public create_server_no_args_returns_server(): void {
    const server: Server = createServer();
    Assert.NotNull(server);
    Assert.True(server instanceof Server);
  }

  public create_server_with_connection_listener_attaches_listener(): void {
    const server: Server = createServer((_socket: Socket) => {
      // Listener attached
    });
    Assert.NotNull(server);
  }

  public create_server_with_options_returns_server(): void {
    const options: ServerOpts = new ServerOpts();
    options.allowHalfOpen = true;
    const server: Server = createServer(options);
    Assert.NotNull(server);
  }

  public create_server_listens_on_ipc_path_options(): void {
    const server: Server = createServer();
    const options = new ListenOptions();
    options.path = "/tmp/tsonic-nodejs.sock";

    server.listen(options);

    Assert.True(server.listening);
    server.close();
  }
}

A<CreateServerTests>()
  .method((t) => t.create_server_no_args_returns_server)
  .add(FactAttribute);
A<CreateServerTests>()
  .method((t) => t.create_server_with_connection_listener_attaches_listener)
  .add(FactAttribute);
A<CreateServerTests>()
  .method((t) => t.create_server_with_options_returns_server)
  .add(FactAttribute);
A<CreateServerTests>()
  .method((t) => t.create_server_listens_on_ipc_path_options)
  .add(FactAttribute);
