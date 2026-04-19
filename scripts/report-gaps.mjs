import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

const repoRoot = resolve(new URL("..", import.meta.url).pathname);
const selftestRoot = join(repoRoot, "test", "fixtures", "selftest", "tests");

const collectTestFiles = (root) =>
  readdirSync(root)
    .map((name) => join(root, name))
    .filter((entryPath) => statSync(entryPath).isDirectory())
    .sort()
    .map((modulePath) => {
      const testFiles = readdirSync(modulePath)
        .filter((name) => name.endsWith(".test.ts"))
        .sort();
      return {
        moduleName: modulePath.slice(modulePath.lastIndexOf("/") + 1),
        testFiles,
      };
    });

const countFacts = (filePath) => {
  const contents = readFileSync(filePath, "utf8");
  const attributed = (
    contents.match(/\.add\((FactAttribute|TheoryAttribute)\)/g) ?? []
  ).length;
  if (attributed > 0) {
    return attributed;
  }

  return (contents.match(/\bpublic\s+(?!constructor\b)\w+\s*\(/g) ?? []).length;
};

const modules = collectTestFiles(selftestRoot);
let totalFiles = 0;
let totalFacts = 0;

console.log("@tsonic/nodejs selftest inventory");
console.log("source package is authoritative; no CLR parity baseline remains");
console.log("");

for (const { moduleName, testFiles } of modules) {
  totalFiles += testFiles.length;
  const factCount = testFiles.reduce(
    (sum, fileName) => sum + countFacts(join(selftestRoot, moduleName, fileName)),
    0
  );
  totalFacts += factCount;
  console.log(
    `${moduleName.padEnd(18)} ${String(testFiles.length).padStart(3)} file(s) ${String(factCount).padStart(4)} fact(s)`
  );
}

console.log("");
console.log(`modules: ${modules.length}`);
console.log(`files:   ${totalFiles}`);
console.log(`facts:   ${totalFacts}`);
