/**
 * Utility functions for working with streams.
 *
 */
import type { JsValue } from "@tsonic/core/types.js";
import { Stream } from "./stream.ts";

type PipelineCallback = (error: Error | undefined) => void;

const coerceError = (value: JsValue | undefined): Error => {
  if (value instanceof Error) {
    return value;
  }

  if (typeof value === "string") {
    return new Error(value);
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "bigint"
  ) {
    return new Error(String(value));
  }

  if (typeof value === "symbol") {
    return new Error(String(value));
  }

  return new Error("Unknown stream error");
};

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

      source.on("error", (...errorArgs: JsValue[]) => {
        const error = coerceError(errorArgs[0]);

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
    lastStream.on("finish", (..._args: JsValue[]) => {
      finish(undefined);
    });
    lastStream.on("end", (..._args: JsValue[]) => {
      finish(undefined);
    });
    lastStream.on("error", (...errorArgs: JsValue[]) => {
      const error = coerceError(errorArgs[0]);
      finish(error);
    });
  } catch {
    const error = new Error("Stream pipeline failed");
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
export const pipeline = (...args: JsValue[]): void => {
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

  function onFinish(..._args: JsValue[]): void {
    onFinished(undefined);
  }

  function onEnd(..._args: JsValue[]): void {
    onFinished(undefined);
  }

  function onError(...args: JsValue[]): void {
    const error = coerceError(args[0]);
    onFinished(error);
  }

  function onClose(...args: JsValue[]): void {
    const hadError =
      args.length > 0 && typeof args[0] === "boolean"
        ? (args[0] as boolean)
        : false;
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
