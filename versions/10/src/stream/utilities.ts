/**
 * Utility functions for working with streams.
 *
 * Baseline: nodejs-clr/src/nodejs/stream/utilities.cs
 */
import { Stream } from "./stream.ts";

type PipelineCallback = (error: Error | undefined) => void;

export const pipelineStreams = (
  streamList: Stream[],
  callback?: PipelineCallback,
): void => {
  if (streamList.length < 2) {
    throw new Error(
      "pipeline requires at least a source and destination stream",
    );
  }

  let completed = false;
  const finish = (error: Error | undefined): void => {
    if (completed) {
      return;
    }
    completed = true;
    callback?.(error);
  };

  try {
    for (let i = 0; i < streamList.length - 1; i += 1) {
      const source = streamList[i]!;
      const dest = streamList[i + 1]!;

      source.on("error", (...errorArgs: unknown[]) => {
        const err = errorArgs[0];
        const error =
          err instanceof Error ? err : new Error(String(err));

        for (let j = i; j < streamList.length; j += 1) {
          streamList[j]!.destroy(error);
        }

        finish(error);
      });

      source.pipe(dest, {
        end: i === streamList.length - 2,
      });
    }

    const lastStream = streamList[streamList.length - 1]!;
    lastStream.on("finish", (..._args: unknown[]) => {
      finish(undefined);
    });
    lastStream.on("end", (..._args: unknown[]) => {
      finish(undefined);
    });
    lastStream.on("error", (...errorArgs: unknown[]) => {
      const err = errorArgs[0];
      finish(err instanceof Error ? err : new Error(String(err)));
    });
  } catch (ex: unknown) {
    const error = ex instanceof Error ? ex : new Error(String(ex));
    for (const s of streamList) {
      try {
        s.destroy(error);
      } catch {
      }
    }
    finish(error);
  }
};

/**
 * A method to pipe between streams forwarding errors and properly cleaning up.
 *
 * The last argument may be a callback of the form (error: Error | undefined) => void.
 * All other arguments must be Stream instances. At least two streams are required.
 */
export const pipeline = (...args: unknown[]): void => {
  if (args.length < 2) {
    throw new Error(
      "pipeline requires at least a source and destination",
    );
  }

  // Check if last argument is a callback
  let callback: PipelineCallback | undefined;
  const streamList: Stream[] = [];

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (i === args.length - 1 && typeof arg === "function") {
      callback = arg as PipelineCallback;
    } else if (arg instanceof Stream) {
      streamList.push(arg);
    } else {
      throw new Error(`Argument ${String(i)} is not a Stream or callback`);
    }
  }

  pipelineStreams(streamList, callback);
};

/**
 * A function to get notified when a stream is no longer readable, writable or
 * has experienced an error or a premature close event.
 *
 * @param stream - The stream to monitor.
 * @param callback - The callback to invoke when the stream is finished.
 */
export const finished = (
  stream: Stream,
  callback: (error: Error | undefined) => void,
): void => {
  let called = false;

  function onFinished(error: Error | undefined): void {
    if (called) {
      return;
    }
    called = true;

    stream.removeListener("finish", onFinish);
    stream.removeListener("end", onEnd);
    stream.removeListener("error", onError);
    stream.removeListener("close", onClose);

    callback(error);
  }

  function onFinish(..._args: unknown[]): void {
    onFinished(undefined);
  }

  function onEnd(..._args: unknown[]): void {
    onFinished(undefined);
  }

  function onError(...args: unknown[]): void {
    const err = args[0];
    onFinished(err instanceof Error ? err : new Error(String(err)));
  }

  function onClose(...args: unknown[]): void {
    const hadError = args.length > 0 && args[0] === true;
    onFinished(
      hadError
        ? new Error("Stream closed with error")
        : undefined,
    );
  }

  stream.on("finish", onFinish);
  stream.on("end", onEnd);
  stream.on("error", onError);
  stream.on("close", onClose);
};
