/**
 * Return type for spawnSync and related synchronous child process methods.
 *
 */

/**
 * Object returned by spawnSync(), execFileSync() (when returning structured
 * results), and similar synchronous child-process helpers.
 *
 * @template T - The type of output data (string or Uint8Array).
 */
export class SpawnSyncReturns<T> {
  /** The process ID of the spawned child process. */
  public pid: number = 0;

  /** Array containing the results from stdio output. */
  public output: Array<T | null> = [] as Array<T | null>;

  /** The contents of stdout. */
  public stdout: T;

  /** The contents of stderr. */
  public stderr: T;

  /** The exit code of the subprocess, or null if terminated due to a signal. */
  public status: number | null = null;

  /** The signal used to kill the subprocess, or null. */
  public signal: string | null = null;

  /** Error object if the child process failed or timed out. */
  public error: Error | null = null;

  public constructor(defaultValue: T) {
    this.stdout = defaultValue;
    this.stderr = defaultValue;
  }
}
