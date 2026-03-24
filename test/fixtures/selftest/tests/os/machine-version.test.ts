import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as os from "@tsonic/nodejs/os.js";

export class OsMachineVersionTests {
  public machine_should_return_non_empty_value(): void {
    const value = os.machine();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }

  public version_should_return_non_empty_value(): void {
    const value = os.version();
    Assert.NotNull(value);
    Assert.False(value.length === 0);
  }
}

A.on(OsMachineVersionTests)
  .method((t) => t.machine_should_return_non_empty_value)
  .add(FactAttribute);
A.on(OsMachineVersionTests)
  .method((t) => t.version_should_return_non_empty_value)
  .add(FactAttribute);
