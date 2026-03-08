import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import * as process from "node:process";
import { createHash } from "node:crypto";

export function main(): void {
  const dirPath = join(".selftest", "node-specifiers");
  mkdirSync(dirPath, { recursive: true });
  const filePath = join(dirPath, "sample.txt");
  writeFileSync(filePath, "node-specifiers", "utf-8");
  const source = readFileSync(filePath, "utf-8");
  const digest = createHash("sha256").update("node-specifiers").digest("hex");

  console.log(
    [
      basename(filePath),
      source === "node-specifiers" ? "true" : "false",
      process.cwd().endsWith("node-specifiers") ? "true" : "false",
      digest.length.toString(),
    ].join("|"),
  );
}
