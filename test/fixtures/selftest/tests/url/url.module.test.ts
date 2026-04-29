import { Assert } from "xunit-types/Xunit.js";

import * as url from "@tsonic/nodejs/url.js";
import { URL } from "@tsonic/nodejs/url.js";

export class urlModuleTests {
  parse_And_format_ShouldWork(): void {
    const parsed = url.parse("https://example.com/path?q=1");
    Assert.NotNull(parsed);

    const formatted = url.format(parsed);
    Assert.Contains("https://example.com/path", formatted);
  }

  resolve_ShouldBuildAbsoluteUrl(): void {
    const resolved = url.resolve("https://example.com/base/", "../x");
    Assert.Equal("https://example.com/x", resolved);
  }

  domain_helpers_ShouldRoundTripAsciiAndUnicode(): void {
    Assert.Equal("xn--mnich-kva.example", url.domainToASCII("münich.example"));
    Assert.Equal("münich.example", url.domainToUnicode("xn--mnich-kva.example"));
  }

  file_url_helpers_ShouldRoundTripPath(): void {
    const fileUrl = url.pathToFileURL("./fixtures/hello.txt");
    Assert.StartsWith("file://", fileUrl.href);
    Assert.Contains("fixtures", url.fileURLToPath(fileUrl));
  }

  urlToHttpOptions_ShouldProjectCoreRequestFields(): void {
    const options = url.urlToHttpOptions(new URL("https://user:pass@example.com:8443/path?q=1#hash"));
    Assert.Equal("https:", options.protocol);
    Assert.Equal("example.com", options.hostname);
    Assert.Equal("/path?q=1", options.path);
    Assert.Equal(8443, options.port as number);
    Assert.Equal("user:pass", options.auth as string);
  }
}
