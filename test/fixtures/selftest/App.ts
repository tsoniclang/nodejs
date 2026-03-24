import {
  EventEmitter,
  process as nodeProcess,
} from "@tsonic/nodejs/index.js";
import * as nodePath from "@tsonic/nodejs/path.js";

const runPathSmoke = (): string => {
  const joined = nodePath.join("alpha", "beta", "gamma.txt");
  const parsed = nodePath.parse(joined);
  if (
    parsed.base !== "gamma.txt" ||
    nodePath.basename(joined) !== "gamma.txt" ||
    nodePath.extname(joined) !== ".txt"
  ) {
    throw new Error("path smoke failed");
  }

  return "path-ok";
};

export async function main(): Promise<void> {
  const pathResult = runPathSmoke();
  const emitter = new EventEmitter();
  let eventSeen = false;
  emitter.on("ready", () => {
    eventSeen = true;
  });
  emitter.emit("ready");

  if (!eventSeen || !nodeProcess.version.startsWith("v")) {
    throw new Error("process or events smoke failed");
  }

  console.log(`${pathResult};events-ok;process-ok`);
}
