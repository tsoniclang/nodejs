import { Assert } from "xunit-types/Xunit.js";

import { createInterface, InterfaceOptions } from "@tsonic/nodejs/readline.js";
import { Readable } from "@tsonic/nodejs/stream.js";
import { Writable } from "@tsonic/nodejs/stream.js";

export class AdvancedTests {
  async Interface_questionAsync_ShouldReturnAnswer(): Promise<void> {
    const input = new Readable();
    const output = new Writable();
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;

    const rl = createInterface(options);

    // Start the async question
    const questionTask = rl.questionAsync("What is your name? ");

    // Simulate user input
    rl.emit("line", "Alice");

    const answer = await questionTask;

    Assert.Equal("Alice", answer);
  }

  Interface_questionAsync_WhenClosed_ShouldThrow(): void {
    const input = new Readable();
    const rl = createInterface(input);

    rl.close();

    let threw = false;
    try {
      rl.questionAsync("Test?");
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  async Interface_questionAsync_MultipleQuestions_ShouldWork(): Promise<void> {
    const input = new Readable();
    const output = new Writable();
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;

    const rl = createInterface(options);

    // First question
    const q1Task = rl.questionAsync("Question 1? ");
    rl.emit("line", "Answer 1");
    const answer1 = await q1Task;

    // Second question
    const q2Task = rl.questionAsync("Question 2? ");
    rl.emit("line", "Answer 2");
    const answer2 = await q2Task;

    Assert.Equal("Answer 1", answer1);
    Assert.Equal("Answer 2", answer2);
  }

  Interface_ArrowKeys_ShouldMoveCursor(): void {
    const input = new Readable();
    const rl = createInterface(input);

    // Simulate typing "hello"
    input.emit("data", "hello");
    Assert.Equal("hello", rl.line);
    Assert.Equal(5, rl.cursor);

    // Simulate left arrow (ESC[D)
    input.emit("data", "\x1B[D");
    Assert.Equal(4, rl.cursor);

    // Simulate another left arrow
    input.emit("data", "\x1B[D");
    Assert.Equal(3, rl.cursor);

    // Simulate right arrow (ESC[C)
    input.emit("data", "\x1B[C");
    Assert.Equal(4, rl.cursor);
  }

  Interface_HomeEndKeys_ShouldMoveCursorToEdges(): void {
    const input = new Readable();
    const rl = createInterface(input);

    // Type some text
    input.emit("data", "hello world");
    Assert.Equal(11, rl.cursor);

    // Home key (ESC[H)
    input.emit("data", "\x1B[H");
    Assert.Equal(0, rl.cursor);

    // End key (ESC[F)
    input.emit("data", "\x1B[F");
    Assert.Equal(11, rl.cursor);
  }

  Interface_DeleteKey_ShouldDeleteCharacterAtCursor(): void {
    const input = new Readable();
    const rl = createInterface(input);

    // Type "hello"
    input.emit("data", "hello");

    // Move cursor to position 2 (between 'e' and 'l')
    input.emit("data", "\x1B[D\x1B[D\x1B[D");
    Assert.Equal(2, rl.cursor);

    // Delete key (ESC[3~)
    input.emit("data", "\x1B[3~");

    // Should have deleted the 'l', leaving "helo"
    Assert.Equal("helo", rl.line);
    Assert.Equal(2, rl.cursor);
  }

  Interface_CtrlA_ShouldMoveToBeginning(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello");
    Assert.Equal(5, rl.cursor);

    // Ctrl+A
    input.emit("data", "\x01");
    Assert.Equal(0, rl.cursor);
  }

  Interface_CtrlE_ShouldMoveToEnd(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello");

    // Move cursor to beginning
    input.emit("data", "\x1B[H");
    Assert.Equal(0, rl.cursor);

    // Ctrl+E
    input.emit("data", "\x05");
    Assert.Equal(5, rl.cursor);
  }

  Interface_CtrlU_ShouldClearLineBeforeCursor(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello world");

    // Move cursor to position 6 (after "hello ")
    input.emit("data", "\x1B[D\x1B[D\x1B[D\x1B[D\x1B[D");
    Assert.Equal(6, rl.cursor);

    // Ctrl+U
    input.emit("data", "\x15");

    // Should leave "world" and cursor at 0
    Assert.Equal("world", rl.line);
    Assert.Equal(0, rl.cursor);
  }

  Interface_CtrlK_ShouldClearLineAfterCursor(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello world");

    // Move cursor to position 5 (after "hello")
    input.emit("data", "\x1B[D");
    input.emit("data", "\x1B[D");
    input.emit("data", "\x1B[D");
    input.emit("data", "\x1B[D");
    input.emit("data", "\x1B[D");
    input.emit("data", "\x1B[D");
    Assert.Equal(5, rl.cursor);

    // Ctrl+K
    input.emit("data", "\x0B");

    // Should leave "hello"
    Assert.Equal("hello", rl.line);
    Assert.Equal(5, rl.cursor);
  }

  Interface_CtrlW_ShouldDeleteWordBeforeCursor(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello world test");
    Assert.Equal("hello world test", rl.line);
    Assert.Equal(16, rl.cursor);

    // Ctrl+W should delete "test"
    input.emit("data", "\x17");
    Assert.Equal("hello world ", rl.line);

    // Ctrl+W again should delete "world "
    input.emit("data", "\x17");
    Assert.Equal("hello ", rl.line);

    // Ctrl+W again should delete "hello "
    input.emit("data", "\x17");
    Assert.Equal("", rl.line);
  }

  Interface_TabKey_ShouldInsertSpaces(): void {
    const input = new Readable();
    const rl = createInterface(input);

    input.emit("data", "hello\tworld");

    // Tab should be converted to 4 spaces
    Assert.Equal("hello    world", rl.line);
  }
}
