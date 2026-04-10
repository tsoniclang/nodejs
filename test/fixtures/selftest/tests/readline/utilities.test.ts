import { Assert } from "xunit-types/Xunit.js";

import {
  clearLine,
  clearScreenDown,
  cursorTo,
  moveCursor,
} from "@tsonic/nodejs/readline.js";
import { Writable } from "@tsonic/nodejs/stream.js";

export class UtilitiesTests {
  public clearLine_WithValidStream_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = clearLine(output, 0);

    Assert.True(result);
  }

  public clearLine_Direction_Left_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, -1);

    Assert.True(result);
  }

  public clearLine_Direction_EntireLine_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, 0);

    Assert.True(result);
  }

  public clearLine_Direction_Right_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearLine(output, 1);

    Assert.True(result);
  }

  public clearLine_WithInvalidDirection_ShouldReturnFalse(): void {
    const output = new Writable();

    // Invalid direction throws internally which is caught by try-catch
    // The method returns false when exception occurs
    const result = clearLine(output, 5);

    Assert.False(result);
  }

  public clearLine_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      clearLine(null, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public clearLine_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    clearLine(output, 0, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  public clearScreenDown_WithValidStream_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = clearScreenDown(output);

    Assert.True(result);
  }

  public clearScreenDown_ShouldSucceed(): void {
    const output = new Writable();
    const result = clearScreenDown(output);

    Assert.True(result);
  }

  public clearScreenDown_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      clearScreenDown(null);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public clearScreenDown_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    clearScreenDown(output, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  public cursorTo_WithColumnOnly_ShouldReturnTrue(): void {
    const output = new Writable();
    const result = cursorTo(output, 10);

    Assert.True(result);
  }

  public cursorTo_WithColumnOnly_ShouldSucceed(): void {
    const output = new Writable();
    const result = cursorTo(output, 5);

    Assert.True(result);
  }

  public cursorTo_WithRowAndColumn_ShouldSucceed(): void {
    const output = new Writable();
    const result = cursorTo(output, 10, 5);

    Assert.True(result);
  }

  public cursorTo_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      cursorTo(null, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public cursorTo_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    cursorTo(output, 0, null, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }

  public moveCursor_WithPositiveDx_ShouldMoveRight(): void {
    const output = new Writable();
    const result = moveCursor(output, 5, 0);

    Assert.True(result);
  }

  public moveCursor_WithNegativeDx_ShouldMoveLeft(): void {
    const output = new Writable();
    const result = moveCursor(output, -3, 0);

    Assert.True(result);
  }

  public moveCursor_WithPositiveDy_ShouldMoveDown(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, 2);

    Assert.True(result);
  }

  public moveCursor_WithNegativeDy_ShouldMoveUp(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, -4);

    Assert.True(result);
  }

  public moveCursor_WithBothDirections_ShouldSucceed(): void {
    const output = new Writable();
    const result = moveCursor(output, 2, -1);

    Assert.True(result);
  }

  public moveCursor_WithZeroDelta_ShouldWork(): void {
    const output = new Writable();
    const result = moveCursor(output, 0, 0);

    Assert.True(result);
  }

  public moveCursor_WithNullStream_ShouldThrow(): void {
    let threw = false;
    try {
      moveCursor(null, 0, 0);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public moveCursor_WithCallback_ShouldInvokeCallback(): void {
    const output = new Writable();
    let callbackInvoked = false;

    moveCursor(output, 1, 1, () => {
      callbackInvoked = true;
    });

    Assert.True(callbackInvoked);
  }
}
