import { attributes as A } from "@tsonic/core/lang.js";
import { int } from "@tsonic/core/types.js";
import { Process, ProcessStartInfo } from "@tsonic/dotnet/System.Diagnostics.js";
import { Thread } from "@tsonic/dotnet/System.Threading.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { process } from "@tsonic/nodejs/process.js";

import { assertThrows, isWindows } from "./helpers.ts";

export class ProcessKillTests {
  public kill_throws_for_non_existent_processes(): void {
    assertThrows(() => process.kill(999999 as int));
  }

  public kill_signal_zero_returns_true_for_the_current_process(): void {
    Assert.True(process.kill(process.pid, 0 as int));
  }

  public kill_terminates_a_sleep_process_on_unix(): void {
    if (isWindows()) {
      return;
    }

    const startInfo = new ProcessStartInfo();
    startInfo.FileName = "sleep";
    startInfo.Arguments = "60";
    startInfo.UseShellExecute = false;
    startInfo.CreateNoWindow = true;

    const spawned = Process.Start(startInfo);
    Assert.True(spawned !== undefined);
    if (spawned === undefined) {
      return;
    }

    Thread.Sleep(100 as int);

    Assert.True(process.kill(spawned.Id));
    Assert.True(spawned.WaitForExit(1000 as int));
    Assert.True(spawned.HasExited);
  }
}

A<ProcessKillTests>()
  .method((t) => t.kill_throws_for_non_existent_processes)
  .add(FactAttribute);
A<ProcessKillTests>()
  .method((t) => t.kill_signal_zero_returns_true_for_the_current_process)
  .add(FactAttribute);
A<ProcessKillTests>()
  .method((t) => t.kill_terminates_a_sleep_process_on_unix)
  .add(FactAttribute);
