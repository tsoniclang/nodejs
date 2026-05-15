import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { ListenOptions } from "@tsonic/nodejs/net.js";

export class ListenOptionsTests {
  all_properties_can_be_set(): void {
    const opts = new ListenOptions();
    opts.port = 8080;
    opts.host = "localhost";
    opts.path = "/tmp/socket";
    opts.backlog = 511;
    opts.ipv6Only = false;

    Assert.Equal(8080, opts.port);
    Assert.Equal("localhost", opts.host);
    Assert.Equal("/tmp/socket", opts.path);
    Assert.Equal(511, opts.backlog);
    Assert.Equal(false, opts.ipv6Only);
  }
}

A<ListenOptionsTests>()
  .method((t) => t.all_properties_can_be_set)
  .add(FactAttribute);
