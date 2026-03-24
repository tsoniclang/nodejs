import { Assert } from "xunit-types/Xunit.js";

import * as url from "@tsonic/nodejs/url.js";
import { URL } from "@tsonic/nodejs/url.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/url/url.module.tests.cs
 */
export class urlModuleTests {
  // TODO: domainToASCII — requires punycode/IDN support
  // Tsonic blocker: no punycode library available in native source yet

  public parse_And_format_ShouldWork(): void {
    const parsed = url.parse("https://example.com/path?q=1");
    Assert.NotNull(parsed);

    const formatted = url.format(parsed);
    Assert.Contains("https://example.com/path", formatted);
  }

  public resolve_ShouldBuildAbsoluteUrl(): void {
    const resolved = url.resolve("https://example.com/base/", "../x");
    Assert.Equal("https://example.com/x", resolved);
  }

  // TODO: pathToFileURL / fileURLToPath — requires filesystem path integration
  // TODO: urlToHttpOptions — deferred until http module is ported
}
