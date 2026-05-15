import { asinterface } from "@tsonic/core/lang.js";
import { Assert } from "xunit-types/Xunit.js";

import {
  createInterface,
  InterfaceOptions,
} from "@tsonic/nodejs/readline.js";
import { Readable } from "@tsonic/nodejs/stream.js";
import { Writable } from "@tsonic/nodejs/stream.js";

export class InterfaceTests {
  Interface_line_ShouldReturnCurrentLine(): void {
    const input = new Readable();
    const rl = createInterface(input);

    Assert.Equal("", rl.line);
  }

  Interface_cursor_ShouldReturnCursorPosition(): void {
    const input = new Readable();
    const rl = createInterface(input);

    Assert.Equal(0, rl.cursor);
  }

  Interface_setPrompt_ShouldChangePrompt(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.setPrompt("new> ");

    Assert.Equal("new> ", rl.getPrompt());
  }

  Interface_getPrompt_ShouldReturnCurrentPrompt(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;
    options.prompt = "test> ";

    const rl = createInterface(options);

    Assert.Equal("test> ", rl.getPrompt());
  }

  Interface_prompt_ShouldNotThrow(): void {
    const input = new Readable();
    const output = new Writable();
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;
    options.prompt = "$ ";

    const rl = createInterface(options);

    // Should not throw
    rl.prompt();

    Assert.True(true);
  }

  Interface_pause_ShouldPauseInput(): void {
    const input = new Readable();
    const rl = createInterface(input);

    let pauseEmitted = false;
    rl.on("pause", () => {
      pauseEmitted = true;
    });

    const result = rl.pause();

    Assert.True(result === rl); // Should return this
    Assert.True(pauseEmitted);
  }

  Interface_resume_ShouldResumeInput(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.pause();

    let resumeEmitted = false;
    rl.on("resume", () => {
      resumeEmitted = true;
    });

    const result = rl.resume();

    Assert.True(result === rl); // Should return this
    Assert.True(resumeEmitted);
  }

  Interface_close_ShouldEmitCloseEvent(): void {
    const input = new Readable();
    const rl = createInterface(input);

    let closeEmitted = false;
    rl.on("close", () => {
      closeEmitted = true;
    });

    rl.close();

    Assert.True(closeEmitted);
  }

  Interface_close_WhenAlreadyClosed_ShouldNotEmitAgain(): void {
    const input = new Readable();
    const rl = createInterface(input);

    let closeCount = 0;
    rl.on("close", () => {
      closeCount += 1;
    });

    rl.close();
    rl.close(); // Second close

    Assert.Equal(1, closeCount);
  }

  Interface_question_ShouldInvokeCallback(): void {
    const input = new Readable();
    const output = new Writable();
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;

    const rl = createInterface(options);

    let answer: string | undefined;
    rl.question("What is your name? ", (a: string) => {
      answer = a;
    });

    // Simulate user input
    rl.emit("line", "Alice");

    Assert.Equal("Alice", answer);
  }

  Interface_question_WithNullCallback_ShouldThrow(): void {
    const input = new Readable();
    const rl = createInterface(input);

    let threw = false;
    try {
      rl.question("Test? ", asinterface<(answer: string) => void>(null));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  Interface_write_ShouldNotThrow(): void {
    const input = new Readable();
    const output = new Writable();
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;

    const rl = createInterface(options);

    rl.write("test data");

    Assert.True(true);
  }

  Interface_getCursorPos_ShouldReturnPosition(): void {
    const input = new Readable();
    const rl = createInterface(input);

    const pos = rl.getCursorPos();

    Assert.NotNull(pos);
    Assert.True(pos.rows >= 0);
    Assert.True(pos.cols >= 0);
  }

  Interface_prompt_WhenClosed_ShouldThrow(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.close();

    let threw = false;
    try {
      rl.prompt();
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  Interface_question_WhenClosed_ShouldThrow(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.close();

    let threw = false;
    try {
      rl.question("Test?", () => undefined);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  Interface_write_WhenClosed_ShouldThrow(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.close();

    let threw = false;
    try {
      rl.write("test");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }
}
