import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createConnection, Socket } from "@tsonic/nodejs/net.js";

export class CreateConnectionTests {
  public create_connection_creates_socket(): void {
    const socket: Socket = createConnection(18234, "localhost");
    Assert.NotNull(socket);
    Assert.True(socket instanceof Socket);
  }
}

A<CreateConnectionTests>()
  .method((t) => t.create_connection_creates_socket)
  .add(FactAttribute);
