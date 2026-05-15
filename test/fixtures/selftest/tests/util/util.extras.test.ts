import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as util from "@tsonic/nodejs/util.js";

export class UtilExtrasTests {
  formatWithOptions_should_format(): void {
    Assert.Equal(
      "hello world",
      util.formatWithOptions(null, "hello %s", "world"),
    );
  }

  stripVTControlCharacters_should_remove_ansi_sequences(): void {
    Assert.Equal("red", util.stripVTControlCharacters("\x1B[31mred\x1B[0m"));
  }

  toUSVString_should_replace_lone_surrogates(): void {
    Assert.Equal("a\uFFFDb", util.toUSVString("a\uD800b"));
  }
}

A<UtilExtrasTests>()
  .method((t) => t.formatWithOptions_should_format)
  .add(FactAttribute);
A<UtilExtrasTests>()
  .method((t) => t.stripVTControlCharacters_should_remove_ansi_sequences)
  .add(FactAttribute);
A<UtilExtrasTests>()
  .method((t) => t.toUSVString_should_replace_lone_surrogates)
  .add(FactAttribute);
