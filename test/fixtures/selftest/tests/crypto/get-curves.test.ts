import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { getCurves } from "@tsonic/nodejs/crypto.js";

export class GetCurvesTests {
  public getCurves_returns_non_empty_list(): void {
    const curves = getCurves();
    Assert.True(curves.length > 0);
    Assert.True(curves.includes("secp256r1"));
  }

  public getCurves_contains_expected_curves(): void {
    const curves = getCurves();
    Assert.True(curves.includes("secp256r1"));
    Assert.True(curves.includes("secp384r1"));
    Assert.True(curves.includes("secp521r1"));
  }
}

A<GetCurvesTests>().method((t) => t.getCurves_returns_non_empty_list).add(FactAttribute);
A<GetCurvesTests>().method((t) => t.getCurves_contains_expected_curves).add(FactAttribute);
