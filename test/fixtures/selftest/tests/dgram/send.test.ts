import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { Buffer } from "@tsonic/nodejs/buffer.js";
import { createSocket } from "@tsonic/nodejs/dgram.js";
import { assertThrows } from "./helpers.ts";

export class SendTests {
  public send_WithCallback_CallsCallback(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const addr = socket.address();
    const client = createSocket("udp4");

    let callbackCalled = false;
    let callbackError: Error | null = null;
    let bytesSent = 0;

    client.send("test", addr.port, "127.0.0.1", (err: Error | null, bytes: number) => {
      callbackCalled = true;
      callbackError = err;
      bytesSent = bytes;
    });

    Assert.True(callbackCalled);
    Assert.True(callbackError === null);
    Assert.Equal(4, bytesSent);

    client.close();
    socket.close();
  }

  public send_ConnectedSocket_SendsWithoutAddress(): void {
    const server = createSocket("udp4");
    server.bind(0, "127.0.0.1");

    const addr = server.address();
    const client = createSocket("udp4");
    client.connect(addr.port, "127.0.0.1");

    let callbackCalled = false;
    client.send("test", (err: Error | null, bytes: number) => {
      callbackCalled = true;
    });

    Assert.True(callbackCalled);

    client.close();
    server.close();
  }

  public send_WithOffsetAndLength_SendsCorrectSlice(): void {
    const server = createSocket("udp4");
    server.bind(0, "127.0.0.1");

    const addr = server.address();
    const client = createSocket("udp4");

    const buffer = Buffer.from("HelloWorld", "utf8").buffer;
    let sentBytes = 0;

    client.send(buffer, 5, 5, addr.port, "127.0.0.1", (err: Error | null, bytes: number) => {
      sentBytes = bytes;
    });

    // The slice "World" is 5 bytes
    Assert.Equal(5, sentBytes);

    client.close();
    server.close();
  }

  public send_WithInvalidOffset_ThrowsException(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const buffer = new Uint8Array(10);
    assertThrows(() => socket.send(buffer, 15, 5, 1234, "127.0.0.1"));

    socket.close();
  }

  public send_WithInvalidLength_ThrowsException(): void {
    const socket = createSocket("udp4");
    socket.bind(0, "127.0.0.1");

    const buffer = new Uint8Array(10);
    assertThrows(() => socket.send(buffer, 5, 10, 1234, "127.0.0.1"));

    socket.close();
  }
}

A.on(SendTests)
  .method((t) => t.send_WithCallback_CallsCallback)
  .add(FactAttribute);
A.on(SendTests)
  .method((t) => t.send_ConnectedSocket_SendsWithoutAddress)
  .add(FactAttribute);
A.on(SendTests)
  .method((t) => t.send_WithOffsetAndLength_SendsCorrectSlice)
  .add(FactAttribute);
A.on(SendTests)
  .method((t) => t.send_WithInvalidOffset_ThrowsException)
  .add(FactAttribute);
A.on(SendTests)
  .method((t) => t.send_WithInvalidLength_ThrowsException)
  .add(FactAttribute);
