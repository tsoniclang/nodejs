import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { createHash } from "crypto";
import { createServer, type IncomingMessage, type ServerResponse } from "http";
import { clearInterval, setInterval } from "timers";

export function main(): void {
  const timer = setInterval(() => {}, 1000);
  clearInterval(timer);

  const server = createServer((_req: IncomingMessage, res: ServerResponse) => {
    res.end("ok");
  });

  const dirPath = join(".selftest", "bare-aliases");
  mkdirSync(dirPath, { recursive: true });
  const filePath = join(dirPath, "sample.txt");
  writeFileSync(filePath, "bare-aliases", "utf-8");
  const source = readFileSync(filePath, "utf-8");
  const digest = createHash("sha256").update("bare-aliases").digest("hex");

  console.log(
    [
      existsSync(filePath) ? "true" : "false",
      source === "bare-aliases" ? "true" : "false",
      server.listening ? "true" : "false",
      digest.length.toString(),
    ].join("|"),
  );
}
