import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { createSocket, BindOptions } from "@tsonic/nodejs/dgram.js";

export class BindTests {
  public bind_WithPort_BindsSuccessfully(): void {
    const socket = createSocket("udp4");
    let listening = false;

    socket.on("listening", () => {
      listening = true;
    });

    socket.bind(0, "127.0.0.1");

    Assert.True(listening);
    const addr = socket.address();
    Assert.Equal("127.0.0.1", addr.address);

    socket.close();
  }

  public bind_WithCallback_CallsCallback(): void {
    const socket = createSocket("udp4");
    let callbackCalled = false;

    socket.bind(0, "127.0.0.1", () => {
      callbackCalled = true;
    });

    Assert.True(callbackCalled);

    socket.close();
  }

  public bind_WithBindOptions_BindsSuccessfully(): void {
    const socket = createSocket("udp4");

    const options = new BindOptions();
    options.port = 0;
    options.address = "127.0.0.1";

    socket.bind(options);

    const addr = socket.address();
    Assert.Equal("127.0.0.1", addr.address);

    socket.close();
  }

  public bind_WithBindOptionsAndCallback_CallsCallback(): void {
    const socket = createSocket("udp4");
    let callbackCalled = false;

    const options = new BindOptions();
    options.port = 0;
    options.address = "127.0.0.1";

    socket.bind(options, () => {
      callbackCalled = true;
    });

    Assert.True(callbackCalled);

    socket.close();
  }

  public bind_WithFileDescriptor_BindsSuccessfully(): void {
    const socket = createSocket("udp4");

    const options = new BindOptions();
    options.fd = 123;

    socket.bind(options);

    const addr = socket.address();
    Assert.NotNull(addr);

    socket.close();
  }
}

A<BindTests>()
  .method((t) => t.bind_WithPort_BindsSuccessfully)
  .add(FactAttribute);
A<BindTests>()
  .method((t) => t.bind_WithCallback_CallsCallback)
  .add(FactAttribute);
A<BindTests>()
  .method((t) => t.bind_WithBindOptions_BindsSuccessfully)
  .add(FactAttribute);
A<BindTests>()
  .method((t) => t.bind_WithBindOptionsAndCallback_CallsCallback)
  .add(FactAttribute);
A<BindTests>()
  .method((t) => t.bind_WithFileDescriptor_BindsSuccessfully)
  .add(FactAttribute);
