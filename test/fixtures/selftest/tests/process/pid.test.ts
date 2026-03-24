import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";
import { Environment } from "@tsonic/dotnet/System.js";
import { Process } from "@tsonic/dotnet/System.Diagnostics.js";

import { process } from "@tsonic/nodejs/process.js";

export class ProcessPidTests {
  public pid_returns_a_valid_process_id(): void {
    Assert.True(process.pid > 0);
  }

  public pid_matches_environment_process_id(): void {
    Assert.Equal(Environment.ProcessId, process.pid);
  }

  public pid_matches_current_process_id(): void {
    Assert.Equal(Process.GetCurrentProcess().Id, process.pid);
  }
}

A.on(ProcessPidTests)
  .method((t) => t.pid_returns_a_valid_process_id)
  .add(FactAttribute);
A.on(ProcessPidTests)
  .method((t) => t.pid_matches_environment_process_id)
  .add(FactAttribute);
A.on(ProcessPidTests)
  .method((t) => t.pid_matches_current_process_id)
  .add(FactAttribute);
