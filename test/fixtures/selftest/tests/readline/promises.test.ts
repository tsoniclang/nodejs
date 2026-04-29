import { Assert } from "xunit-types/Xunit.js";

import { promises } from "@tsonic/nodejs/readline.js";
import { Readable } from "@tsonic/nodejs/stream.js";
import { Writable } from "@tsonic/nodejs/stream.js";

export class PromisesTests {
  createInterface_ShouldCreateInterface(): void {
    const input = new Readable();
    const output = new Writable();

    const rl = promises.createInterfaceFromStreams(input, output);
    Assert.NotNull(rl);
  }

  async question_ShouldResolveAnswer(): Promise<void> {
    const input = new Readable();
    const output = new Writable();
    const rl = promises.createInterfaceFromStreams(input, output);

    const answerTask = promises.question(rl, "question?");
    input.resume();
    input.push("value\n");

    const answer = await answerTask;
    Assert.Equal("value", answer);
  }
}
