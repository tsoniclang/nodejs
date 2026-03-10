import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const outDir = resolve(process.argv[2]);

const replaceAll = (text, replacements) => {
  let updated = text;
  for (const [pattern, replacement] of replacements) {
    updated = typeof pattern === "string"
      ? updated.replaceAll(pattern, replacement)
      : updated.replace(pattern, replacement);
  }
  return updated;
};

const ensureCoreTypeImport = (text) => {
  if (!/\bint\b|\blong\b/.test(text)) {
    return text;
  }

  if (/@tsonic\/core\/types\.js/.test(text)) {
    return text;
  }

  const required = [];
  if (/\bint\b/.test(text)) required.push("int");
  if (/\blong\b/.test(text)) required.push("long");
  return `import type { ${required.join(", ")} } from "@tsonic/core/types.js";\n${text}`;
};

const transformDts = (filePath) => {
  const original = readFileSync(filePath, "utf8");
  const updated = ensureCoreTypeImport(
    replaceAll(original, [
      ["Nullable_1<System_Internal.Int32>", "int | undefined"],
      ["Nullable_1<System_Internal.Int64>", "long | undefined"],
      ["System_Internal.Int32", "int"],
      ["System_Internal.Int64", "long"],
    ]),
  );

  if (updated !== original) {
    writeFileSync(filePath, updated);
  }
};

const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (fullPath.endsWith(".d.ts")) {
      transformDts(fullPath);
    }
  }
};

walk(outDir);
