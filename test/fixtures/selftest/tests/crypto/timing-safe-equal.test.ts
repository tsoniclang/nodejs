import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { timingSafeEqual } from "@tsonic/nodejs/crypto.js";

export class TimingSafeEqualTests {
  timingSafeEqual_returns_true_for_equal_buffers(): void {
    const buffer1 = new Uint8Array([72, 101, 108, 108, 111]);
    const buffer2 = new Uint8Array([72, 101, 108, 108, 111]);
    Assert.True(timingSafeEqual(buffer1, buffer2));
  }

  timingSafeEqual_returns_false_for_different_buffers(): void {
    const buffer1 = new Uint8Array([72, 101, 108, 108, 111]);
    const buffer2 = new Uint8Array([87, 111, 114, 108, 100]);
    Assert.False(timingSafeEqual(buffer1, buffer2));
  }

  timingSafeEqual_returns_false_for_different_lengths(): void {
    const buffer1 = new Uint8Array([72, 101, 108, 108, 111]);
    const buffer2 = new Uint8Array([72, 101, 108, 108, 111, 33]);
    Assert.False(timingSafeEqual(buffer1, buffer2));
  }

  timingSafeEqual_with_identical_content(): void {
    const buffer1 = new Uint8Array([1, 2, 3, 4, 5]);
    const buffer2 = new Uint8Array([1, 2, 3, 4, 5]);
    Assert.True(timingSafeEqual(buffer1, buffer2));
  }
}

A<TimingSafeEqualTests>().method((t) => t.timingSafeEqual_returns_true_for_equal_buffers).add(FactAttribute);
A<TimingSafeEqualTests>().method((t) => t.timingSafeEqual_returns_false_for_different_buffers).add(FactAttribute);
A<TimingSafeEqualTests>().method((t) => t.timingSafeEqual_returns_false_for_different_lengths).add(FactAttribute);
A<TimingSafeEqualTests>().method((t) => t.timingSafeEqual_with_identical_content).add(FactAttribute);
