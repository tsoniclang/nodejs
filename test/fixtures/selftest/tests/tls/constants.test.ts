import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  CLIENT_RENEG_LIMIT,
  CLIENT_RENEG_WINDOW,
  DEFAULT_ECDH_CURVE,
  DEFAULT_MAX_VERSION,
  DEFAULT_MIN_VERSION,
} from "@tsonic/nodejs/tls.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/tls/constants.tests.cs
 */
export class TlsConstantsTests {
  public constants_HaveExpectedValues(): void {
    Assert.Equal(3, CLIENT_RENEG_LIMIT);
    Assert.Equal(600, CLIENT_RENEG_WINDOW);
    Assert.Equal("auto", DEFAULT_ECDH_CURVE);
    Assert.Equal("TLSv1.3", DEFAULT_MAX_VERSION);
    Assert.Equal("TLSv1.2", DEFAULT_MIN_VERSION);
  }
}

A<TlsConstantsTests>()
  .method((t) => t.constants_HaveExpectedValues)
  .add(FactAttribute);
