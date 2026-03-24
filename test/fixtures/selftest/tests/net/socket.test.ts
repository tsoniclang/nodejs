import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Socket,
  SocketConstructorOpts,
} from "@tsonic/nodejs/net.js";

export class SocketTests {
  public constructor_creates_instance(): void {
    const socket: Socket = new Socket();
    Assert.NotNull(socket);
    Assert.Equal("closed", socket.readyState);
  }

  public constructor_with_options_creates_instance(): void {
    const options: SocketConstructorOpts = new SocketConstructorOpts();
    options.allowHalfOpen = true;
    const socket: Socket = new Socket(options);
    Assert.NotNull(socket);
  }

  public bytes_read_initially_zero(): void {
    const socket: Socket = new Socket();
    Assert.Equal(0, socket.bytesRead);
  }

  public bytes_written_initially_zero(): void {
    const socket: Socket = new Socket();
    Assert.Equal(0, socket.bytesWritten);
  }

  public connecting_initially_false(): void {
    const socket: Socket = new Socket();
    Assert.False(socket.connecting);
  }

  public destroyed_initially_false(): void {
    const socket: Socket = new Socket();
    Assert.False(socket.destroyed);
  }

  public ready_state_initially_closed(): void {
    const socket: Socket = new Socket();
    Assert.Equal("closed", socket.readyState);
  }

  public destroy_marks_as_destroyed(): void {
    const socket: Socket = new Socket();
    socket.destroy();
    Assert.True(socket.destroyed);
    Assert.Equal("closed", socket.readyState);
  }

  public destroy_emits_close_event(): void {
    const socket: Socket = new Socket();
    let closeEmitted = false;

    socket.on("close", () => {
      closeEmitted = true;
    });

    socket.destroy();
    Assert.True(closeEmitted);
  }

  public destroy_with_error_emits_error(): void {
    const socket: Socket = new Socket();
    let errorEmitted = false;

    socket.on("error", () => {
      errorEmitted = true;
    });

    socket.destroy(new Error("Test error"));
    Assert.True(errorEmitted);
  }

  public set_timeout_does_not_throw(): void {
    const socket: Socket = new Socket();
    let threw = false;
    try {
      socket.setTimeout(5000);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public set_no_delay_does_not_throw(): void {
    const socket: Socket = new Socket();
    let threw = false;
    try {
      socket.setNoDelay(true);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public set_keep_alive_does_not_throw(): void {
    const socket: Socket = new Socket();
    let threw = false;
    try {
      socket.setKeepAlive(true, 1000);
    } catch {
      threw = true;
    }
    Assert.False(threw);
  }

  public address_returns_object_when_not_connected(): void {
    const socket: Socket = new Socket();
    const address: object = socket.address();
    Assert.NotNull(address);
  }

  public unref_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.unref();
    Assert.Equal(socket, result);
  }

  public ref_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.ref();
    Assert.Equal(socket, result);
  }

  public pause_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.pause();
    Assert.Equal(socket, result);
  }

  public resume_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.resume();
    Assert.Equal(socket, result);
  }

  public set_encoding_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.setEncoding("utf8");
    Assert.Equal(socket, result);
  }

  public end_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.end();
    Assert.Equal(socket, result);
  }

  public reset_and_destroy_returns_socket(): void {
    const socket: Socket = new Socket();
    const result: Socket = socket.resetAndDestroy();
    Assert.Equal(socket, result);
    Assert.True(socket.destroyed);
  }
}

A.on(SocketTests)
  .method((t) => t.constructor_creates_instance)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.constructor_with_options_creates_instance)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.bytes_read_initially_zero)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.bytes_written_initially_zero)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.connecting_initially_false)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.destroyed_initially_false)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.ready_state_initially_closed)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.destroy_marks_as_destroyed)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.destroy_emits_close_event)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.destroy_with_error_emits_error)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.set_timeout_does_not_throw)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.set_no_delay_does_not_throw)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.set_keep_alive_does_not_throw)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.address_returns_object_when_not_connected)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.unref_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.ref_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.pause_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.resume_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.set_encoding_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.end_returns_socket)
  .add(FactAttribute);
A.on(SocketTests)
  .method((t) => t.reset_and_destroy_returns_socket)
  .add(FactAttribute);
