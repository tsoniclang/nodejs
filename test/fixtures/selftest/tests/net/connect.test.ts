import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { connect, Socket } from "@tsonic/nodejs/net.js";

export class NetConnectTests {
  public connect_creates_socket(): void {
    const socket: Socket = connect(18234, "localhost");
    Assert.NotNull(socket);
    Assert.True(socket instanceof Socket);
  }

  public connect_path_creates_connected_socket(): void {
    const socket: Socket = connect("/tmp/tsonic-nodejs.sock");
    Assert.NotNull(socket);
    Assert.Equal("open", socket.readyState);
  }
}

A<NetConnectTests>()
  .method((t) => t.connect_creates_socket)
  .add(FactAttribute);
A<NetConnectTests>()
  .method((t) => t.connect_path_creates_connected_socket)
  .add(FactAttribute);
