#!/bin/bash
# Generate TypeScript declarations for Node.js CLR library
#
# This script regenerates all TypeScript type declarations from the nodejs.dll
# assembly using tsbindgen.
#
# Prerequisites:
#   - .NET 10 SDK installed
#   - tsbindgen repository cloned at ../tsbindgen (sibling directory)
#   - nodejs-clr repository cloned at ../nodejs-clr (sibling directory)
#
# Usage:
#   ./__build/scripts/generate.sh [dotnetMajor]

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
TSBINDGEN_DIR="$PROJECT_DIR/../tsbindgen"
NODEJS_CLR_DIR="$PROJECT_DIR/../nodejs-clr"

# .NET major to generate (publishes to versions/<major>/)
DOTNET_MAJOR="${1:-10}"
OUT_DIR="$PROJECT_DIR/versions/$DOTNET_MAJOR"

DOTNET_LIB="$PROJECT_DIR/../dotnet/versions/$DOTNET_MAJOR"
JS_LIB="$PROJECT_DIR/../js/versions/$DOTNET_MAJOR"

# .NET runtime path (needed for BCL type resolution)
DOTNET_VERSION="${DOTNET_VERSION:-10.0.1}"
DOTNET_HOME="${DOTNET_HOME:-$HOME/.dotnet}"
DOTNET_RUNTIME_PATH="$DOTNET_HOME/shared/Microsoft.NETCore.App/$DOTNET_VERSION"

# nodejs.dll path
NODEJS_DLL="$NODEJS_CLR_DIR/artifacts/bin/nodejs/Release/net${DOTNET_MAJOR}.0/nodejs.dll"
SURFACE_PACKAGE="$NODEJS_CLR_DIR/surface/$DOTNET_MAJOR/tsbindgen.surface-package.json"

echo "================================================================"
echo "Generating Node.js CLR TypeScript Declarations"
echo "================================================================"
echo ""
echo "Configuration:"
echo "  nodejs.dll:   $NODEJS_DLL"
echo "  .NET Runtime: $DOTNET_RUNTIME_PATH"
echo "  BCL Library:  $DOTNET_LIB (external reference)"
echo "  JS Library:   $JS_LIB (external reference)"
echo "  tsbindgen:    $TSBINDGEN_DIR"
echo "  Output:       $OUT_DIR"
echo "  Surface:      $SURFACE_PACKAGE"
echo ""

# Verify prerequisites
if [ ! -f "$NODEJS_DLL" ]; then
    echo "ERROR: nodejs.dll not found at $NODEJS_DLL"
    echo "Build it first: cd ../nodejs-clr && dotnet build -c Release"
    exit 1
fi

if [ ! -d "$DOTNET_RUNTIME_PATH" ]; then
    echo "ERROR: .NET runtime not found at $DOTNET_RUNTIME_PATH"
    echo "Set DOTNET_HOME or DOTNET_VERSION environment variables"
    exit 1
fi

if [ ! -d "$TSBINDGEN_DIR" ]; then
    echo "ERROR: tsbindgen not found at $TSBINDGEN_DIR"
    echo "Clone it: git clone https://github.com/tsoniclang/tsbindgen ../tsbindgen"
    exit 1
fi

if [ ! -d "$DOTNET_LIB" ]; then
    echo "ERROR: @tsonic/dotnet not found at $DOTNET_LIB"
    echo "Clone it: git clone https://github.com/tsoniclang/dotnet ../dotnet"
    exit 1
fi

if [ ! -d "$JS_LIB" ]; then
    echo "ERROR: @tsonic/js not found at $JS_LIB"
    echo "Clone it: git clone https://github.com/tsoniclang/js ../js"
    exit 1
fi

if [ ! -f "$SURFACE_PACKAGE" ]; then
    echo "ERROR: Node.js surface package not found at $SURFACE_PACKAGE"
    echo "Expected runtime-owned surface config in ../nodejs-clr/surface/$DOTNET_MAJOR"
    exit 1
fi

# Ensure output directory exists
mkdir -p "$OUT_DIR"

# Clean output directory (keep package metadata files)
echo "[1/3] Cleaning output directory..."
cd "$OUT_DIR"

# Remove all generated namespace directories
find . -maxdepth 1 -type d ! -name '.' -exec rm -rf {} \; 2>/dev/null || true

# Remove generated files at root (keep package metadata copied from repo root)
find . -maxdepth 1 -type f \
  ! -name 'package.json' \
  ! -name 'README.md' \
  ! -name 'LICENSE' \
  -exec rm -f {} \; 2>/dev/null || true

echo "  Done"

# Build tsbindgen
echo "[2/3] Building tsbindgen..."
cd "$TSBINDGEN_DIR"
dotnet build src/tsbindgen/tsbindgen.csproj -c Release --verbosity quiet
echo "  Done"

# Generate types with CLR-faithful naming.
# Uses --lib to reference BCL types from @tsonic/dotnet instead of regenerating them
# Uses --namespace-map to emit as index.d.ts/index.js for cleaner imports
echo "[3/3] Generating TypeScript declarations..."
dotnet run --project src/tsbindgen/tsbindgen.csproj --no-build -c Release -- \
    generate -a "$NODEJS_DLL" -d "$DOTNET_RUNTIME_PATH" -o "$OUT_DIR" \
    --lib "$DOTNET_LIB" \
    --lib "$JS_LIB" \
    --namespace-map "nodejs=index" \
    --surface-package "$SURFACE_PACKAGE"

echo "[4/5] Curating generated facade..."
node - "$OUT_DIR" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const outDir = path.resolve(process.argv[2]);
const indexDtsPath = path.join(outDir, "index.d.ts");
const original = fs.readFileSync(indexDtsPath, "utf8");
const filtered = original
  .split("\n")
  .filter((line) => line !== "export { console$instance as console } from './index/internal/index.js';")
  .filter((line) => line !== "export { ConsoleConstructor as ConsoleConstructor } from './index/internal/index.js';")
  .join("\n");

fs.writeFileSync(indexDtsPath, filtered);
NODE
echo "  Done"

cp -f "$PROJECT_DIR/README.md" "$OUT_DIR/README.md"
cp -f "$PROJECT_DIR/LICENSE" "$OUT_DIR/LICENSE"

echo "[5/5] Verifying generated surface and npm package contents..."
PACK_JSON="$(cd "$PROJECT_DIR" && npm pack --dry-run --json "./versions/$DOTNET_MAJOR")"
node - "$OUT_DIR" "$PACK_JSON" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const outDir = path.resolve(process.argv[2]);
const packJson = JSON.parse(process.argv[3]);
const packEntry = Array.isArray(packJson) ? packJson[0] : packJson;
const packedFiles = new Set(
  (packEntry.files ?? []).map((entry) => String(entry.path).replace(/\\/g, "/"))
);

const expectedFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    expectedFiles.push(path.relative(outDir, fullPath).replace(/\\/g, "/"));
  }
};
walk(outDir);

const missing = expectedFiles
  .filter((file) => !packedFiles.has(file))
  .sort();

if (missing.length > 0) {
  console.error("ERROR: npm pack is missing generated files:");
  for (const file of missing) {
    console.error(`  - ${file}`);
  }
  process.exit(1);
}

const nodeAliases = fs.readFileSync(path.join(outDir, "node-aliases.d.ts"), "utf8");
const indexDts = fs.readFileSync(path.join(outDir, "index.d.ts"), "utf8");

const requiredSnippets = [
  'declare module "node:fs" {',
  'declare module "fs" {',
  'export const readFileSync: typeof import("@tsonic/nodejs/index.js").fs.readFileSync;',
  'declare module "node:path" {',
  'declare module "path" {',
  'export const join: typeof import("@tsonic/nodejs/index.js").path.join;',
  'declare module "node:crypto" {',
  'declare module "crypto" {',
  'export const createHash: typeof import("@tsonic/nodejs/index.js").crypto.createHash;',
  'declare module "node:http" {',
  'declare module "http" {',
  'export const createServer: typeof import("@tsonic/nodejs/nodejs.Http.js").http.createServer;',
  'declare module "node:timers" {',
  'declare module "timers" {',
  'export const setInterval: typeof import("@tsonic/nodejs/index.js").timers.setInterval;'
];

for (const snippet of requiredSnippets) {
  if (!nodeAliases.includes(snippet)) {
    console.error(`ERROR: generated node-aliases.d.ts is missing required snippet: ${snippet}`);
    process.exit(1);
  }
}

const forbiddenRootExports = [
  "export { console$instance as console } from './index/internal/index.js';",
  "export { ConsoleConstructor as ConsoleConstructor } from './index/internal/index.js';"
];

for (const snippet of forbiddenRootExports) {
  if (indexDts.includes(snippet)) {
    console.error(`ERROR: generated index.d.ts still exports JS ambient symbol through @tsonic/nodejs root: ${snippet}`);
    process.exit(1);
  }
}
NODE
echo "  Done"

echo ""
echo "================================================================"
echo "Generation Complete"
echo "================================================================"
