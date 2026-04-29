import { asinterface } from "@tsonic/core/lang.js";
import { Assert } from "xunit-types/Xunit.js";

import {
  createInterface,
  Interface,
  InterfaceOptions,
} from "@tsonic/nodejs/readline.js";
import { Readable } from "@tsonic/nodejs/stream.js";

export class CreateInterfaceTests {
  createInterface_WithValidOptions_ShouldCreateInterface(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;

    const rl = createInterface(options);

    Assert.NotNull(rl);
    Assert.True(rl instanceof Interface);
  }

  createInterface_WithInputOnly_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }

  createInterface_WithNullOptions_ShouldThrow(): void {
    let threw = false;
    try {
      createInterface(asinterface<InterfaceOptions>(null));
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  createInterface_WithNullInput_ShouldThrow(): void {
    let threw = false;
    try {
      createInterface(new InterfaceOptions());
    } catch {
      threw = true;
    }
    Assert.True(threw);
  }

  createInterface_WithStreams_ShouldWork(): void {
    const input = new Readable();

    const rl = createInterface(input);

    Assert.NotNull(rl);
  }

  createInterface_WithCustomPrompt_ShouldUsePrompt(): void {
    const input = new Readable();
    const customPrompt = "custom> ";
    const options = new InterfaceOptions();
    options.input = input;
    options.prompt = customPrompt;

    const rl = createInterface(options);

    Assert.Equal(customPrompt, rl.getPrompt());
  }

  createInterface_WithHistory_ShouldInitializeHistory(): void {
    const input = new Readable();
    const history = ["line1", "line2", "line3"];
    const options = new InterfaceOptions();
    options.input = input;
    options.history = history;

    const rl = createInterface(options);

    Assert.NotNull(rl);
    // History is initialized (we can't directly access it, but no exception)
  }

  createInterface_WithTerminalOption_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;
    options.terminal = true;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }

  createInterface_WithHistorySize_ShouldWork(): void {
    const input = new Readable();
    const options = new InterfaceOptions();
    options.input = input;
    options.historySize = 100;

    const rl = createInterface(options);

    Assert.NotNull(rl);
  }
}
