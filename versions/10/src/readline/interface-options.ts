/**
 * Options for creating a readline Interface.
 *
 * Baseline: nodejs-clr/src/nodejs/readline/Interface.cs (InterfaceOptions)
 */
import type { Readable } from "../stream/readable.ts";
import type { Writable } from "../stream/writable.ts";
import type { int } from "@tsonic/core/types.js";

export class InterfaceOptions {
  /** The Readable stream to listen to. Required. */
  public input: Readable | undefined = undefined;

  /** The Writable stream to write readline data to. */
  public output: Writable | undefined = undefined;

  /**
   * true if input and output streams should be treated as TTY and have
   * ANSI/VT100 escape codes written.
   */
  public terminal: boolean | undefined = undefined;

  /** The prompt string to use. */
  public prompt: string | undefined = undefined;

  /** Initial list of history lines. */
  public history: string[] | undefined = undefined;

  /** Maximum number of history lines retained. Default is 30. */
  public historySize: int | undefined = undefined;

  /**
   * If true, when a new input line equals an old one in history, removes the
   * old line. Default is false.
   */
  public removeHistoryDuplicates: boolean | undefined = undefined;

  /** The duration readline will wait for a character (in ms). */
  public escapeCodeTimeout: int | undefined = undefined;

  /** The number of spaces a tab is equal to. Default is 8. */
  public tabSize: int | undefined = undefined;
}

/**
 * Represents the cursor position with row and column.
 */
export class CursorPosition {
  /** Row position (0-based). */
  public rows: int = 0;

  /** Column position (0-based). */
  public cols: int = 0;
}
