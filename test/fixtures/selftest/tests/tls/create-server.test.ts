import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  createServer,
  TLSServer,
  TlsOptions,
} from "@tsonic/nodejs/tls.js";

export class createServerTests {
  createServer_NoArgs_ReturnsServer(): void {
    const server = createServer();
    Assert.NotNull(server);
  }

  createServer_WithListener_AttachesListener(): void {
    const server = createServer((_socket) => {
      // listener
    });
    Assert.NotNull(server);
  }

  createServer_WithOptions_ReturnsServer(): void {
    const options = new TlsOptions();
    options.cert = "test-cert";
    const server = createServer(options);
    Assert.NotNull(server);
  }
}

A<createServerTests>()
  .method((t) => t.createServer_NoArgs_ReturnsServer)
  .add(FactAttribute);
A<createServerTests>()
  .method((t) => t.createServer_WithListener_AttachesListener)
  .add(FactAttribute);
A<createServerTests>()
  .method((t) => t.createServer_WithOptions_ReturnsServer)
  .add(FactAttribute);
