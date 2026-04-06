/**
 * Performance entry classes for the perf_hooks module.
 *
 * Baseline: nodejs-clr/src/nodejs/perf_hooks/PerformanceEntry.cs
 */

import type { JsValue } from "@tsonic/core/types.js";

/**
 * Base class for all performance entries.
 * Represents a single performance metric entry in the Performance Timeline.
 */
export class PerformanceEntry {
  public readonly name: string;
  public readonly entryType: string;
  public readonly startTime: number;
  public readonly duration: number;

  public constructor(
    name: string,
    entryType: string,
    startTime: number,
    duration: number,
  ) {
    this.name = name;
    this.entryType = entryType;
    this.startTime = startTime;
    this.duration = duration;
  }
}

/**
 * Represents a performance mark — a named timestamp in the performance timeline.
 */
export class PerformanceMark extends PerformanceEntry {
  public readonly detail: JsValue;

  public constructor(
    name: string,
    startTime: number,
    detail: JsValue = null,
  ) {
    super(name, "mark", startTime, 0);
    this.detail = detail;
  }
}

/**
 * Represents a performance measure — the duration between two marks or timestamps.
 */
export class PerformanceMeasure extends PerformanceEntry {
  public readonly detail: JsValue;

  public constructor(
    name: string,
    startTime: number,
    duration: number,
    detail: JsValue = null,
  ) {
    super(name, "measure", startTime, duration);
    this.detail = detail;
  }
}
