/**
 * Promise-based readline wrappers.
 *
 * Baseline: nodejs-clr/src/nodejs/readline/promises.cs
 */
import type { Readable } from "../stream/readable.ts";
import type { Writable } from "../stream/writable.ts";
import { Interface } from "./interface.ts";
import { InterfaceOptions } from "./interface-options.ts";

export class ReadlinePromises {
  /**
   * Creates a readline interface from options.
   */
  public createInterface(options: InterfaceOptions): Interface {
    if (options === undefined || options === null) {
      throw new Error("options is required");
    }

    if (options.input === undefined || options.input === null) {
      throw new Error("input stream is required");
    }

    return new Interface(options);
  }

  /**
   * Creates a readline interface from input/output streams.
   */
  public createInterfaceFromStreams(
    input: Readable,
    output?: Writable,
  ): Interface {
    const options = new InterfaceOptions();
    options.input = input;
    options.output = output;
    return this.createInterface(options);
  }

  /**
   * Asks a question and resolves with the response.
   */
  public question(rl: Interface, query: string): Promise<string> {
    if (rl === undefined || rl === null) {
      throw new Error("rl is required");
    }

    return rl.questionAsync(query);
  }
}
