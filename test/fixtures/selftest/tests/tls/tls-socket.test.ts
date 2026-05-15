import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter } from "@tsonic/nodejs/events.js";
import { TLSSocket } from "@tsonic/nodejs/tls.js";

export class TLSSocketTests {
  TLSSocket_Constructor_CreatesInstance(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.NotNull(tlsSocket);
  }

  TLSSocket_Encrypted_AlwaysTrue(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.True(tlsSocket.encrypted);
  }

  TLSSocket_Authorized_InitiallyFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.False(tlsSocket.authorized);
  }

  TLSSocket_GetCertificate_NoCert_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cert = tlsSocket.getCertificate();
    Assert.Null(cert);
  }

  TLSSocket_GetPeerCertificate_NoCert_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cert = tlsSocket.getPeerCertificate();
    Assert.Null(cert);
  }

  TLSSocket_GetCipher_ReturnsInfo(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const cipher = tlsSocket.getCipher();
    Assert.NotNull(cipher);
    Assert.NotNull(cipher.name);
  }

  TLSSocket_GetProtocol_NoHandshake_ReturnsNull(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const protocol = tlsSocket.getProtocol();
    Assert.Null(protocol);
  }

  TLSSocket_GetSharedSigalgs_ReturnsArray(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const sigalgs = tlsSocket.getSharedSigalgs();
    Assert.NotNull(sigalgs);
  }

  TLSSocket_IsSessionReused_ReturnsFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    Assert.False(tlsSocket.isSessionReused());
  }

  TLSSocket_Renegotiate_ReturnsFalseAndCallsCallbackWithoutError(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    let error: Error | null = null;

    const result = tlsSocket.renegotiate(null, (err) => {
      error = err;
    });

    Assert.False(result);
    Assert.Null(error);
  }

  TLSSocket_SetMaxSendFragment_ReturnsFalse(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const result = tlsSocket.setMaxSendFragment(1024);
    Assert.False(result);
  }

  TLSSocket_DisableRenegotiation_DoesNotThrow(): void {
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

  TLSSocket_EnableTrace_DoesNotThrow(): void {
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

  TLSSocket_ExportKeyingMaterial_ReturnsRequestedLength(): void {
    const baseSocket = new EventEmitter();
    const tlsSocket = new TLSSocket(baseSocket);
    const material = tlsSocket.exportKeyingMaterial(
      128,
      "label",
      new Uint8Array([1, 2, 3])
    );
    Assert.Equal(128, material.length);
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
  .method((t) => t.TLSSocket_Renegotiate_ReturnsFalseAndCallsCallbackWithoutError)
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
  .method((t) => t.TLSSocket_ExportKeyingMaterial_ReturnsRequestedLength)
  .add(FactAttribute);
