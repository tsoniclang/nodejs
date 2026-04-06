import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { SocketConstructorOpts } from "@tsonic/nodejs/net.js";

export class SocketConstructorOptsTests {
  public all_properties_can_be_set(): void {
    const opts = new SocketConstructorOpts();
    opts.fd = 123;
    opts.allowHalfOpen = true;
    opts.readable = true;
    opts.writable = true;

    Assert.Equal(123, opts.fd);
    Assert.Equal(true, opts.allowHalfOpen);
    Assert.Equal(true, opts.readable);
    Assert.Equal(true, opts.writable);
  }
}

A<SocketConstructorOptsTests>()
  .method((t) => t.all_properties_can_be_set)
  .add(FactAttribute);
