import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";
import { TLSSocket } from "@tsonic/nodejs/tls.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/tls/TLSSocket.tests.cs
 */
export class TLSSocketTests {
  public TLSSocket_Constructor_CreatesInstance(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.NotNull(tlsSocket);
  }

  public TLSSocket_Encrypted_AlwaysTrue(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.True(tlsSocket.encrypted);
  }

  public TLSSocket_Authorized_InitiallyFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.False(tlsSocket.authorized);
  }

  public TLSSocket_GetCertificate_NoCert_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cert = tlsSocket.getCertificate();
    Assert.Null(cert);
  }

  public TLSSocket_GetPeerCertificate_NoCert_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cert = tlsSocket.getPeerCertificate();
    Assert.Null(cert);
  }

  public TLSSocket_GetCipher_ReturnsInfo(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cipher = tlsSocket.getCipher();
    Assert.NotNull(cipher);
    Assert.NotNull(cipher.name);
  }

  public TLSSocket_GetProtocol_NoHandshake_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const protocol = tlsSocket.getProtocol();
    Assert.Null(protocol);
  }

  public TLSSocket_GetSharedSigalgs_ReturnsArray(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const sigalgs = tlsSocket.getSharedSigalgs();
    Assert.NotNull(sigalgs);
  }

  public TLSSocket_IsSessionReused_ReturnsFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.False(tlsSocket.isSessionReused());
  }

  public TLSSocket_Renegotiate_ReturnsFalseAndCallsCallback(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    let error: Error | null = null;

    const result = tlsSocket.renegotiate({}, (err) => {
      error = err;
    });

    Assert.False(result);
    Assert.NotNull(error);
  }

  public TLSSocket_SetMaxSendFragment_ReturnsFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const result = tlsSocket.setMaxSendFragment(1024);
    Assert.False(result);
  }

  public TLSSocket_DisableRenegotiation_DoesNotThrow(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);

    let threw = false;
    try {
      tlsSocket.disableRenegotiation();
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public TLSSocket_EnableTrace_DoesNotThrow(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);

    let threw = false;
    try {
      tlsSocket.enableTrace();
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public TLSSocket_ExportKeyingMaterial_ThrowsNotSupported(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);

    let threw = false;
    try {
      tlsSocket.exportKeyingMaterial(128, "label", new Uint8Array(0));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}

A<TLSSocketTests>()
  .method((t) => t.TLSSocket_Constructor_CreatesInstance)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_Encrypted_AlwaysTrue)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_Authorized_InitiallyFalse)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_GetCertificate_NoCert_ReturnsNull)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_GetPeerCertificate_NoCert_ReturnsNull)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_GetCipher_ReturnsInfo)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_GetProtocol_NoHandshake_ReturnsNull)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_GetSharedSigalgs_ReturnsArray)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_IsSessionReused_ReturnsFalse)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_Renegotiate_ReturnsFalseAndCallsCallback)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_SetMaxSendFragment_ReturnsFalse)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_DisableRenegotiation_DoesNotThrow)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_EnableTrace_DoesNotThrow)
  .add(FactAttribute);
A<TLSSocketTests>()
  .method((t) => t.TLSSocket_ExportKeyingMaterial_ThrowsNotSupported)
  .add(FactAttribute);
