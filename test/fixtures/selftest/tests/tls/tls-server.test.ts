import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  TLSServer,
  TlsOptions,
  SecureContextOptions,
} from "@tsonic/nodejs/tls.js";

export class TLSServerTests {
  TLSServer_Constructor_CreatesInstance(): void {
    const server = new TLSServer();
    Assert.NotNull(server);
  }

  TLSServer_ConstructorWithListener_AttachesListener(): void {
    const server = new TLSServer((_socket) => {
      // listener
    });
    Assert.NotNull(server);
  }

  TLSServer_ConstructorWithOptions_CreatesInstance(): void {
    const options = new TlsOptions();
    options.cert = "test-cert";
    const server = new TLSServer(options, null);
    Assert.NotNull(server);
  }

  TLSServer_GetTicketKeys_Returns48Bytes(): void {
    const server = new TLSServer();
    const keys = server.getTicketKeys();
    Assert.NotNull(keys);
    Assert.Equal(48, keys.length);
  }

  TLSServer_SetTicketKeys_AcceptsValidKeys(): void {
    const server = new TLSServer();
    const keys = new Uint8Array(48);

    let threw = false;
    try {
      server.setTicketKeys(keys);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  TLSServer_SetTicketKeys_InvalidLength_Throws(): void {
    const server = new TLSServer();
    const keys = new Uint8Array(32);

    let threw = false;
    try {
      server.setTicketKeys(keys);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  TLSServer_SetSecureContext_AcceptsOptions(): void {
    const server = new TLSServer();
    const opts = new SecureContextOptions();
    opts.cert = "test-cert";

    let threw = false;
    try {
      server.setSecureContext(opts);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  TLSServer_AddContext_DoesNotThrow(): void {
    const server = new TLSServer();

    let threw = false;
    try {
      server.addContext("example.com", new SecureContextOptions());
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }
}

A<TLSServerTests>()
  .method((t) => t.TLSServer_Constructor_CreatesInstance)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_ConstructorWithListener_AttachesListener)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_ConstructorWithOptions_CreatesInstance)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_GetTicketKeys_Returns48Bytes)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_SetTicketKeys_AcceptsValidKeys)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_SetTicketKeys_InvalidLength_Throws)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_SetSecureContext_AcceptsOptions)
  .add(FactAttribute);
A<TLSServerTests>()
  .method((t) => t.TLSServer_AddContext_DoesNotThrow)
  .add(FactAttribute);
