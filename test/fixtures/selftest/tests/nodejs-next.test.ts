import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

import { EventEmitter, process as nodeProcess } from "@tsonic/nodejs/index.js";
import * as nodePath from "@tsonic/nodejs/path.js";

export class NodejsNextIntegrationTests {
  public path_subpath_namespace_import_smoke(): void {
    const joined = nodePath.join("root", "sub", "file.txt");
    const parsed = nodePath.parse(joined);

    Assert.Equal("file.txt", nodePath.basename(joined));
    Assert.Equal(".txt", nodePath.extname(joined));
    Assert.Equal("file.txt", parsed.base);
  }

  public root_exports_process_and_events(): void {
    const emitter = new EventEmitter();
    let called = false;

    emitter.on("ready", () => {
      called = true;
    });
    emitter.emit("ready");

    Assert.True(called);
    Assert.True(nodeProcess.version.startsWith("v"));
  }
}

A.on(NodejsNextIntegrationTests)
  .method((t) => t.path_subpath_namespace_import_smoke)
  .add(FactAttribute);
A.on(NodejsNextIntegrationTests)
  .method((t) => t.root_exports_process_and_events)
  .add(FactAttribute);
