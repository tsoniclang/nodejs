import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as os from "@tsonic/nodejs/os.js";

export class OsMachineVersionTests {
  machine_should_return_non_empty_value(): void {
    const value = os.machine();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  version_should_return_non_empty_value(): void {
    const value = os.version();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }
}

A<OsMachineVersionTests>()
  .method((t) => t.machine_should_return_non_empty_value)
  .add(FactAttribute);
A<OsMachineVersionTests>()
  .method((t) => t.version_should_return_non_empty_value)
  .add(FactAttribute);
