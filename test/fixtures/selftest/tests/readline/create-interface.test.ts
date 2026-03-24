import { Assert } from "xunit-types/Xunit.js";

import {
  createInterface,
  Interface,
  InterfaceOptions,
} from "@tsonic/nodejs/readline.js";
import { Readable } from "@tsonic/nodejs/stream.js";

/**
 * Baseline: nodejs-clr/tests/nodejs.Tests/readline/createInterface.tests.cs
 */
export class CreateInterfaceTests {
  public createInterface_WithValidOptions_ShouldCreateInterface(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;

    const rl = createInterface(options);

    Assert.NotNull(rl);
    Assert.True(rl instanceof Interface);
  }

  public createInterface_WithInputOnly_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }

  public createInterface_WithNullOptions_ShouldThrow(): void {
    let threw = false;
    try {
      createInterface(null as unknown as InterfaceOptions);
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createInterface_WithNullInput_ShouldThrow(): void {
    let threw = false;
    try {
      createInterface(new InterfaceOptions());
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  public createInterface_WithStreams_ShouldWork(): void {
    const input = new Readable();

    const rl = createInterface(input);

    Assert.NotNull(rl);
  }

  public createInterface_WithCustomPrompt_ShouldUsePrompt(): void {
    const input = new Readable();
    const customPrompt = "custom> ";
    const options = new InterfaceOptions();
    options.input = input;
    options.prompt = customPrompt;

    const rl = createInterface(options);

    Assert.Equal(customPrompt, rl.getPrompt());
  }

  public createInterface_WithHistory_ShouldInitializeHistory(): void {
    const input = new Readable();
    const history = ["line1", "line2", "line3"];
    const options = new InterfaceOptions();
    options.input = input;
    options.history = history;

    const rl = createInterface(options);

    Assert.NotNull(rl);
    // History is initialized (we can't directly access it, but no exception)
  }

  public createInterface_WithTerminalOption_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;
    options.terminal = true;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }

  public createInterface_WithHistorySize_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;
    options.historySize = 100;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }
}
