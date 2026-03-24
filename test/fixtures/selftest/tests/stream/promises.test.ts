import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Readable,
  Writable,
  promises as streamPromises,
} from "@tsonic/nodejs/stream.js";

export class StreamPromisesTests {
  public async finished_should_resolve_on_writable_finish(): Promise<void> {
    const writable = new Writable();
    const finishedPromise = streamPromises.finished(writable);

    writable.end("done");
    await finishedPromise;
  }

  public async pipeline_should_resolve_for_simple_streams(): Promise<void> {
    const source = new Readable();
    const destination = new Writable();

    const pipelinePromise = streamPromises.pipeline(source, destination);
    source.push("data");
    source.push(null);

    await pipelinePromise;
    Assert.True(destination.writableEnded);
  }
}

A.on(StreamPromisesTests)
  .method((t) => t.finished_should_resolve_on_writable_finish)
  .add(FactAttribute);
A.on(StreamPromisesTests)
  .method((t) => t.pipeline_should_resolve_for_simple_streams)
  .add(FactAttribute);
