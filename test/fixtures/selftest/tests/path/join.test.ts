import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

import { assertContains } from "./helpers.ts";

export class JoinTests {
  public join_combines_segments(): void {
    const result = nodePath.join("/foo", "bar", "baz");
    assertContains("foo", result);
    assertContains("bar", result);
    assertContains("baz", result);
  }

  public join_without_segments_returns_dot(): void {
    Assert.Equal(".", nodePath.join());
    Assert.Equal(".", nodePath.join("", ""));
  }

  public join_filters_empty_segments(): void {
    const result = nodePath.join("/foo", "", "bar");
    assertContains("foo", result);
    assertContains("bar", result);
  }
}

A.on(JoinTests).method((t) => t.join_combines_segments).add(FactAttribute);
A.on(JoinTests)
  .method((t) => t.join_without_segments_returns_dot)
  .add(FactAttribute);
A.on(JoinTests)
  .method((t) => t.join_filters_empty_segments)
  .add(FactAttribute);
