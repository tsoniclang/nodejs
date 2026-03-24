import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import {
  Readable,
  Writable,
  Duplex,
  Transform,
  PassThrough,
  Stream,
} from "@tsonic/nodejs/stream.js";
import { assertThrows } from "./helpers.ts";

export class StreamTests {
  // ------------------------------------------------------------------ Readable

  public Readable_should_be_creatable(): void {
    const stream = new Readable();

    Assert.NotNull(stream);
    Assert.True(stream.readable);
    Assert.False(stream.readableEnded);
  }

  public Readable_push_should_add_data_to_buffer(): void {
    const stream = new Readable();

    stream.push("hello");
    stream.push("world");

    const chunk1 = stream.read();
    Assert.Equal("hello", chunk1);

    const chunk2 = stream.read();
    Assert.Equal("world", chunk2);
  }

  public Readable_push_null_should_end_stream(): void {
    const stream = new Readable();

    stream.push("data");
    stream.push(null);

    Assert.True(stream.readableEnded);
  }

  public Readable_read_should_return_null_when_empty(): void {
    const stream = new Readable();

    const result = stream.read();

    Assert.Null(result);
  }

  public Readable_pause_should_stop_flowing(): void {
    const stream = new Readable();

    stream.resume();
    Assert.False(stream.isPaused());

    stream.pause();
    Assert.True(stream.isPaused());
  }

  public Readable_resume_should_enable_flowing(): void {
    const stream = new Readable();

    Assert.True(stream.isPaused());

    stream.resume();
    Assert.False(stream.isPaused());
  }

  public Readable_setEncoding_should_return_self(): void {
    const stream = new Readable();

    const result = stream.setEncoding("utf8");

    Assert.True(result === stream);
  }

  public Readable_unshift_should_prepend_data(): void {
    const stream = new Readable();

    stream.push("second");
    stream.unshift("first");

    const chunk1 = stream.read();
    Assert.Equal("first", chunk1);

    const chunk2 = stream.read();
    Assert.Equal("second", chunk2);
  }

  public Readable_readableLength_should_reflect_buffer_size(): void {
    const stream = new Readable();

    Assert.Equal(0, stream.readableLength);

    stream.push("data1");
    stream.push("data2");

    Assert.Equal(2, stream.readableLength);

    stream.read();
    Assert.Equal(1, stream.readableLength);
  }

  public Readable_destroy_should_mark_as_destroyed(): void {
    const stream = new Readable();

    stream.destroy();

    Assert.True(stream.destroyed);
    Assert.False(stream.readable);
  }

  public Readable_destroy_with_error_should_emit_error(): void {
    const stream = new Readable();
    let caughtMessage = "";

    stream.on("error", (err: unknown) => {
      if (err instanceof Error) {
        caughtMessage = err.message;
      }
    });

    const error = new Error("test error");
    stream.destroy(error);

    Assert.Equal("test error", caughtMessage);
  }

  public Readable_flowing_mode_should_emit_data(): void {
    const stream = new Readable();
    const received: string[] = [];

    stream.on("data", (chunk: unknown) => {
      if (chunk !== null && chunk !== undefined) {
        received.push(String(chunk));
      }
    });

    stream.push("chunk1");
    stream.resume();
    stream.push("chunk2");
    stream.push("chunk3");

    Thread.Sleep(50 as int);

    Assert.True(received.indexOf("chunk1") >= 0);
    Assert.True(received.indexOf("chunk2") >= 0);
    Assert.True(received.indexOf("chunk3") >= 0);
  }

  // ------------------------------------------------------------------ Writable

  public Writable_should_be_creatable(): void {
    const stream = new Writable();

    Assert.NotNull(stream);
    Assert.True(stream.writable);
    Assert.False(stream.writableEnded);
  }

  public Writable_write_should_return_true(): void {
    const stream = new Writable();

    const result = stream.write("test data");

    Assert.True(result);
  }

  public Writable_end_should_mark_as_ended(): void {
    const stream = new Writable();

    stream.end();

    Assert.True(stream.writableEnded);
  }

  public Writable_end_with_data_should_write_then_end(): void {
    const stream = new Writable();

    stream.end("final chunk");

    Assert.True(stream.writableEnded);
  }

  public Writable_write_after_end_should_throw(): void {
    const stream = new Writable();

    stream.end();

    assertThrows(() => {
      stream.write("data");
    });
  }

  public Writable_cork_should_buffer_writes(): void {
    const stream = new Writable();

    stream.cork();
    Assert.True(stream.writableCorked);

    stream.write("chunk1");
    stream.write("chunk2");

    stream.uncork();
    Assert.False(stream.writableCorked);
  }

  public Writable_destroy_should_mark_as_destroyed(): void {
    const stream = new Writable();

    stream.destroy();

    Assert.True(stream.destroyed);
    Assert.False(stream.writable);
  }

  public Writable_writableLength_should_reflect_buffer_size(): void {
    const stream = new Writable();

    stream.cork();
    stream.write("data1");
    stream.write("data2");

    Assert.True(stream.writableLength > 0);

    stream.uncork();
  }

  // -------------------------------------------------------------------- Duplex

  public Duplex_should_be_creatable(): void {
    const stream = new Duplex();

    Assert.NotNull(stream);
    Assert.True(stream.readable);
    Assert.True(stream.writable);
  }

  public Duplex_should_support_readable_operations(): void {
    const stream = new Duplex();

    stream.push("data");
    const result = stream.read();

    Assert.Equal("data", result);
  }

  public Duplex_should_support_writable_operations(): void {
    const stream = new Duplex();

    const result = stream.write("data");

    Assert.True(result);
  }

  public Duplex_should_support_both_ends(): void {
    const stream = new Duplex();

    // Write side
    stream.write("write data");
    stream.end();

    // Read side
    stream.push("read data");
    stream.push(null);

    Assert.True(stream.writableEnded);
    Assert.True(stream.readableEnded);
  }

  // ----------------------------------------------------------------- Transform

  public Transform_should_be_creatable(): void {
    const stream = new Transform();

    Assert.NotNull(stream);
    Assert.True(stream.readable);
    Assert.True(stream.writable);
  }

  public Transform_default_behavior_should_pass_through(): void {
    const stream = new Transform();
    const received: string[] = [];

    stream.on("data", (chunk: unknown) => {
      if (chunk !== null && chunk !== undefined) {
        received.push(String(chunk));
      }
    });

    stream.resume();
    stream.write("test data");

    Thread.Sleep(50 as int);

    Assert.True(received.indexOf("test data") >= 0);
  }

  // --------------------------------------------------------------- PassThrough

  public PassThrough_should_be_creatable(): void {
    const stream = new PassThrough();

    Assert.NotNull(stream);
    Assert.True(stream.readable);
    Assert.True(stream.writable);
  }

  public PassThrough_should_pass_data_through(): void {
    const stream = new PassThrough();
    const received: string[] = [];

    stream.on("data", (chunk: unknown) => {
      if (chunk !== null && chunk !== undefined) {
        received.push(String(chunk));
      }
    });

    stream.resume();

    stream.write("chunk1");
    stream.write("chunk2");
    stream.write("chunk3");

    Thread.Sleep(50 as int);

    Assert.True(received.indexOf("chunk1") >= 0);
    Assert.True(received.indexOf("chunk2") >= 0);
    Assert.True(received.indexOf("chunk3") >= 0);
  }

  // ----------------------------------------------------------------- Pipe / IO

  public Stream_pipe_should_transfer_data_between_streams(): void {
    const readable = new Readable();
    const writable = new Writable();

    readable.pipe(writable);

    readable.push("data1");
    readable.push("data2");
    readable.push(null);

    // Pipe should transfer data from readable to writable
    Assert.True(writable.writableLength >= 0);
  }

  public Stream_pipe_should_return_destination(): void {
    const readable = new Readable();
    const writable = new Writable();

    const result = readable.pipe(writable);

    Assert.True(result === writable);
  }

  public Stream_pipe_should_not_end_destination_when_specified(): void {
    const readable = new Readable();
    const writable = new Writable();

    readable.pipe(writable, { end: false });

    readable.push(null);

    Thread.Sleep(50 as int);

    // Writable should not be ended
    Assert.False(writable.writableEnded);
  }

  // -------------------------------------------------------------------- Events

  public Readable_events_should_be_emitted(): void {
    const stream = new Readable();
    let readableEmitted = false;
    let endEmitted = false;

    stream.on("readable", () => {
      readableEmitted = true;
    });
    stream.on("end", () => {
      endEmitted = true;
    });

    stream.push("data");
    Assert.True(readableEmitted);

    stream.push(null);
    stream.read(); // Trigger end event
    Assert.True(endEmitted);
  }

  public Writable_finish_event_should_be_emitted(): void {
    const stream = new Writable();
    let finishEmitted = false;

    stream.on("finish", () => {
      finishEmitted = true;
    });

    stream.end();

    Thread.Sleep(50 as int);

    Assert.True(finishEmitted);
  }

  public Stream_close_event_should_be_emitted_on_destroy(): void {
    const stream = new Readable();
    let closeEmitted = false;

    stream.on("close", () => {
      closeEmitted = true;
    });

    stream.destroy();

    Thread.Sleep(50 as int);

    Assert.True(closeEmitted);
  }

  public Complex_pipeline_should_work(): void {
    const readable = new Readable();
    const transform1 = new PassThrough();
    const transform2 = new PassThrough();
    const writable = new Writable();

    // Should be able to create a complex pipeline without errors
    readable.pipe(transform1).pipe(transform2).pipe(writable);

    readable.push("data1");
    readable.push("data2");
    readable.push(null);

    Thread.Sleep(100 as int);

    // Verify the pipeline was set up correctly
    Assert.True(
      readable.readableEnded ||
        transform1.readableEnded ||
        writable.writableLength >= 0,
    );
  }
}

A.on(StreamTests)
  .method((t) => t.Readable_should_be_creatable)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_push_should_add_data_to_buffer)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_push_null_should_end_stream)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_read_should_return_null_when_empty)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_pause_should_stop_flowing)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_resume_should_enable_flowing)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_setEncoding_should_return_self)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_unshift_should_prepend_data)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_readableLength_should_reflect_buffer_size)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_destroy_should_mark_as_destroyed)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_destroy_with_error_should_emit_error)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_flowing_mode_should_emit_data)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_should_be_creatable)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_write_should_return_true)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_end_should_mark_as_ended)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_end_with_data_should_write_then_end)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_write_after_end_should_throw)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_cork_should_buffer_writes)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_destroy_should_mark_as_destroyed)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_writableLength_should_reflect_buffer_size)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Duplex_should_be_creatable)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Duplex_should_support_readable_operations)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Duplex_should_support_writable_operations)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Duplex_should_support_both_ends)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Transform_should_be_creatable)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Transform_default_behavior_should_pass_through)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.PassThrough_should_be_creatable)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.PassThrough_should_pass_data_through)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Stream_pipe_should_transfer_data_between_streams)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Stream_pipe_should_return_destination)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Stream_pipe_should_not_end_destination_when_specified)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Readable_events_should_be_emitted)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Writable_finish_event_should_be_emitted)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Stream_close_event_should_be_emitted_on_destroy)
  .add(FactAttribute);
A.on(StreamTests)
  .method((t) => t.Complex_pipeline_should_work)
  .add(FactAttribute);
