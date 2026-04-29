import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { console, ConsoleConstructor } from "@tsonic/nodejs/console.js";

export class ConsoleConstructorTests {
  console_property_should_be_available(): void {
    const ctor = console.Console;
    Assert.True(ctor !== undefined);
    if (ctor === undefined) {
      return;
    }
    ctor.log("from constructor export");
  }

  ConsoleConstructor_instance_should_forward_methods(): void {
    const instance = new ConsoleConstructor();
    instance.info("hello");
    instance.warn("warn");
    instance.error("error");
  }
}

A<ConsoleConstructorTests>()
  .method((t) => t.console_property_should_be_available)
  .add(FactAttribute);
A<ConsoleConstructorTests>()
  .method((t) => t.ConsoleConstructor_instance_should_forward_methods)
  .add(FactAttribute);
