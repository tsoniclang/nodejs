import { Assert } from "xunit-types/Xunit.js";

import {
  clearLine,
  clearScreenDown,
  cursorTo,
  moveCursor,
} from "@tsonic/nodejs/readline.js";
import { Writable } from "@tsonic/nodejs/stream.js";

export class UtilitiesTests {
  clearLine_WithValidStream_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = clearLine(output, 0);

    Assert.True(result);
  }

  clearLine_Direction_Left_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, -1);

    Assert.True(result);
  }

  clearLine_Direction_EntireLine_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, 0);

    Assert.True(result);
  }

  clearLine_Direction_Right_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, 1);

    Assert.True(result);
  }

  clearLine_WithInvalidDirection_ShouldReturnFalse(): void {
    const output = new Writable();

    // Invalid direction throws internally which is caught by try-catch
    // The method returns false when exception occurs
    const result = clearLine(output, 5);

    Assert.False(result);
  }

  clearLine_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      clearLine(null, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  clearLine_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    clearLine(output, 0, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  clearScreenDown_WithValidStream_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = clearScreenDown(output);

    Assert.True(result);
  }

  clearScreenDown_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearScreenDown(output);

    Assert.True(result);
  }

  clearScreenDown_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      clearScreenDown(null);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  clearScreenDown_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    clearScreenDown(output, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  cursorTo_WithColumnOnly_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = cursorTo(output, 10);

    Assert.True(result);
  }

  cursorTo_WithColumnOnly_ShouldSucceed(): void {
    const output = new Writable();
    const result = cursorTo(output, 5);

    Assert.True(result);
  }

  cursorTo_WithRowAndColumn_ShouldSucceed(): void {
    const output = new Writable();
    const result = cursorTo(output, 10, 5);

    Assert.True(result);
  }

  cursorTo_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      cursorTo(null, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  cursorTo_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    cursorTo(output, 0, null, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  moveCursor_WithPositiveDx_ShouldMoveRight(): void {
    const output = new Writable();
    const result = moveCursor(output, 5, 0);

    Assert.True(result);
  }

  moveCursor_WithNegativeDx_ShouldMoveLeft(): void {
    const output = new Writable();
    const result = moveCursor(output, -3, 0);

    Assert.True(result);
  }

  moveCursor_WithPositiveDy_ShouldMoveDown(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, 2);

    Assert.True(result);
  }

  moveCursor_WithNegativeDy_ShouldMoveUp(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, -4);

    Assert.True(result);
  }

  moveCursor_WithBothDirections_ShouldSucceed(): void {
    const output = new Writable();
    const result = moveCursor(output, 2, -1);

    Assert.True(result);
  }

  moveCursor_WithZeroDelta_ShouldWork(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, 0);

    Assert.True(result);
  }

  moveCursor_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      moveCursor(null, 0, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  moveCursor_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    moveCursor(output, 1, 1, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }
}
