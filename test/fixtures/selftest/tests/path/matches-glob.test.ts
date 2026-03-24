import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import * as nodePath from "@tsonic/nodejs/path.js";

export class MatchesGlobTests {
  public matchesGlob_matches_simple_patterns(): void {
    Assert.True(nodePath.matchesGlob("file.txt", "file.txt"));
    Assert.True(!nodePath.matchesGlob("file.txt", "other.txt"));
  }

  public matchesGlob_supports_wildcards(): void {
    Assert.True(nodePath.matchesGlob("file.txt", "*.txt"));
    Assert.True(nodePath.matchesGlob("readme.md", "*.md"));
    Assert.True(!nodePath.matchesGlob("file.txt", "*.md"));
  }

  public matchesGlob_rejects_empty_inputs(): void {
    Assert.True(!nodePath.matchesGlob("", ""));
    Assert.True(!nodePath.matchesGlob("file.txt", ""));
    Assert.True(!nodePath.matchesGlob("", "*.txt"));
  }
}

A.on(MatchesGlobTests)
  .method((t) => t.matchesGlob_matches_simple_patterns)
  .add(FactAttribute);
A.on(MatchesGlobTests)
  .method((t) => t.matchesGlob_supports_wildcards)
  .add(FactAttribute);
A.on(MatchesGlobTests)
  .method((t) => t.matchesGlob_rejects_empty_inputs)
  .add(FactAttribute);
