#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
NODEJS_CLR_DIR="$PROJECT_DIR/../nodejs-clr"
DOTNET_MAJOR="${1:-10}"
TSONIC_CLI="${TSONIC_CLI:-tsonic@latest}"
TEST_LOG_DIR="$PROJECT_DIR/.tests"
WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/nodejs-selftest.XXXXXX")"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

mkdir -p "$TEST_LOG_DIR"

timestamp() {
  date +%Y%m%d-%H%M%S
}

run_and_capture() {
  local log_name="$1"
  shift
  "$@" | tee "$TEST_LOG_DIR/$log_name-$(timestamp).log"
}

copy_fixture() {
  local fixture_dir="$1"
  local project_dir="$2"

  cp "$fixture_dir/App.ts" "$project_dir/src/App.ts"
  if [ -d "$fixture_dir/files" ]; then
    cp -R "$fixture_dir/files/." "$project_dir/"
  fi
}

install_local_bindings_package() {
  local workspace_dir="$1"
  local package_dir="$2"
  local package_name="$3"
  local extra_types_json

  (
    cd "$workspace_dir"
    npm install "$package_dir" >/dev/null
  )

  extra_types_json="$(
    node - "$workspace_dir" "$package_name" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const workspaceDir = path.resolve(process.argv[2]);
const packageName = process.argv[3];
const packageRoot = path.join(workspaceDir, "node_modules", ...packageName.split("/"));
const bindingsPath = path.join(packageRoot, "tsonic.bindings.json");
const workspacePath = path.join(workspaceDir, "tsonic.workspace.json");

const bindings = JSON.parse(fs.readFileSync(bindingsPath, "utf8"));
const workspace = JSON.parse(fs.readFileSync(workspacePath, "utf8"));

const dotnet = workspace.dotnet ?? (workspace.dotnet = {});
const typeRoots = Array.isArray(dotnet.typeRoots) ? [...dotnet.typeRoots] : [];

for (const relativeRoot of bindings.requiredTypeRoots ?? []) {
  const resolvedRoot = relativeRoot === "."
    ? `node_modules/${packageName}`
    : `node_modules/${packageName}/${relativeRoot}`;
  if (!typeRoots.includes(resolvedRoot)) {
    typeRoots.push(resolvedRoot);
  }
}
dotnet.typeRoots = typeRoots;

const mergeById = (existing, incoming) => {
  const merged = Array.isArray(existing) ? [...existing] : [];
  for (const item of incoming ?? []) {
    const index = merged.findIndex((candidate) => candidate.id === item.id);
    if (index >= 0) {
      merged[index] = item;
    } else {
      merged.push(item);
    }
  }
  return merged;
};

dotnet.frameworkReferences = mergeById(dotnet.frameworkReferences, bindings.dotnet?.frameworkReferences);
dotnet.packageReferences = mergeById(dotnet.packageReferences, bindings.dotnet?.packageReferences);

fs.writeFileSync(workspacePath, `${JSON.stringify(workspace, null, 2)}\n`);

const extraTypes = new Set();
for (const reference of bindings.dotnet?.frameworkReferences ?? []) {
  if (reference.types && reference.types !== packageName) {
    extraTypes.add(reference.types);
  }
}
for (const reference of bindings.dotnet?.packageReferences ?? []) {
  if (reference.types && reference.types !== packageName) {
    extraTypes.add(reference.types);
  }
}

process.stdout.write(JSON.stringify([...extraTypes]));
NODE
  )"

  mapfile -t extra_types < <(node -e 'for (const item of JSON.parse(process.argv[1])) console.log(item);' "$extra_types_json")
  if [ "${#extra_types[@]}" -gt 0 ]; then
    (
      cd "$workspace_dir"
      npm install "${extra_types[@]}" >/dev/null
    )
  fi
}

verify_output() {
  local expected_file="$1"
  local actual_output="$2"
  local actual_file="$WORK_DIR/actual-output.txt"
  printf '%s\n' "$actual_output" \
    | sed '/^$/d' \
    | sed '/^Running /d' \
    | sed '/^Process exited with code /d' \
    | sed '/^─/d' \
    > "$actual_file"
  diff -u "$expected_file" "$actual_file"
}

run_fixture() {
  local fixture_name="$1"
  local fixture_dir="$PROJECT_DIR/test/e2e/$fixture_name"
  local fixture_project="$WORK_DIR/$fixture_name"
  local package_dir="$fixture_project/packages/$fixture_name"

  echo "================================================================"
  echo "Running E2E fixture: $fixture_name"
  echo "================================================================"

  mkdir -p "$fixture_project"
  (
    cd "$fixture_project"
    npx --yes "$TSONIC_CLI" init --surface @tsonic/js >/dev/null
    install_local_bindings_package "$fixture_project" "$PROJECT_DIR/versions/$DOTNET_MAJOR" "@tsonic/nodejs"
    copy_fixture "$fixture_dir" "$package_dir"
    npm run build >/dev/null
    actual_output="$(npm run dev --silent)"
    verify_output "$fixture_dir/expected.txt" "$actual_output"
  )
}

echo "================================================================"
echo "Running @tsonic/nodejs selftest"
echo "================================================================"
echo ""
echo "Configuration:"
echo "  nodejs repo:      $PROJECT_DIR"
echo "  nodejs-clr repo:  $NODEJS_CLR_DIR"
echo "  .NET major:       $DOTNET_MAJOR"
echo "  tsonic CLI:       $TSONIC_CLI"
echo "  temp workdir:     $WORK_DIR"
echo ""

echo "[1/4] Regenerating package..."
run_and_capture "generate" npm run generate:"$DOTNET_MAJOR" >/dev/null
echo "  Done"

echo "[2/4] Running nodejs-clr runtime tests..."
(
  cd "$NODEJS_CLR_DIR"
  run_and_capture "nodejs-clr-dotnet-test" dotnet test >/dev/null
)
echo "  Done"

echo "[3/4] Running published-consumer E2E fixtures..."
run_fixture "node-specifiers"
run_fixture "bare-aliases"
run_fixture "node-module-matrix"
run_fixture "bare-module-matrix"
run_fixture "root-exports"
run_fixture "entrypoint-http"
echo "  Done"

echo "[4/4] Selftest complete"
echo ""
echo "All nodejs publish-gated checks passed."
