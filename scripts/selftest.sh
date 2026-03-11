#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
NODEJS_CLR_DIR="$PROJECT_DIR/../nodejs-clr"
DOTNET_MAJOR="${1:-10}"
TSONIC_CLI="${TSONIC_CLI:-tsonic@latest}"
TEST_LOG_DIR="$PROJECT_DIR/.tests"
WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/nodejs-selftest.XXXXXX")"
LOCAL_NUGET_FEED="$WORK_DIR/local-nuget"
export NUGET_PACKAGES="$WORK_DIR/nuget-packages"

assert_local_dependency_alignment() {
  local dependency_name="$1"
  local dependency_version="$2"
  local sibling_package_json="$PROJECT_DIR/../${dependency_name#@tsonic/}/versions/$DOTNET_MAJOR/package.json"

  if [ ! -f "$sibling_package_json" ]; then
    return
  fi

  local sibling_version
  sibling_version="$(node -e 'const fs=require("node:fs"); const p=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); process.stdout.write(p.version);' "$sibling_package_json")"

  if [ "$dependency_version" != "$sibling_version" ]; then
    echo "Local dependency drift detected for $dependency_name: package.json pins $dependency_version but sibling repo is $sibling_version" >&2
    exit 1
  fi
}

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

mkdir -p "$TEST_LOG_DIR"

PINNED_JS_VERSION="$(node -e 'const fs=require("node:fs"); const p=JSON.parse(fs.readFileSync(process.argv[1],"utf8")); process.stdout.write(p.dependencies["@tsonic/js"]);' "$PROJECT_DIR/versions/$DOTNET_MAJOR/package.json")"
assert_local_dependency_alignment "@tsonic/js" "$PINNED_JS_VERSION"

timestamp() {
  date +%Y%m%d-%H%M%S
}

run_and_capture() {
  local log_name="$1"
  shift
  "$@" | tee "$TEST_LOG_DIR/$log_name-$(timestamp).log"
}

write_local_nuget_config() {
  local workspace_dir="$1"
  cat >"$workspace_dir/nuget.config" <<EOF
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <packageSources>
    <clear />
    <add key="local" value="$LOCAL_NUGET_FEED" />
    <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
  </packageSources>
</configuration>
EOF
}

pack_local_runtime_packages() {
  mkdir -p "$LOCAL_NUGET_FEED"

  run_and_capture "runtime-dotnet-pack" dotnet pack "$PROJECT_DIR/../runtime/src/Tsonic.Runtime/Tsonic.Runtime.csproj" -c Release -o "$LOCAL_NUGET_FEED" >/dev/null
  run_and_capture "js-runtime-dotnet-pack" dotnet pack "$PROJECT_DIR/../js-runtime/src/Tsonic.JSRuntime/Tsonic.JSRuntime.csproj" -c Release -o "$LOCAL_NUGET_FEED" >/dev/null
  run_and_capture "nodejs-clr-dotnet-pack" dotnet pack "$NODEJS_CLR_DIR/src/nodejs/nodejs.csproj" -c Release -o "$LOCAL_NUGET_FEED" >/dev/null
}

run_npm_install_clean() {
  local workspace_dir="$1"
  shift
  local install_log

  install_log="$WORK_DIR/npm-install-$(timestamp).log"
  (
    cd "$workspace_dir"
    npm install "$@" 2>&1 | tee "$install_log" >/dev/null
  )

  if rg -n "npm warn ERESOLVE|overriding peer dependency|Could not resolve dependency:|Conflicting peer dependency:" "$install_log" >/dev/null; then
    echo "npm install produced peer-dependency warnings:" >&2
    cat "$install_log" >&2
    return 1
  fi
}

copy_fixture() {
  local fixture_dir="$1"
  local project_dir="$2"

  cp "$fixture_dir/App.ts" "$project_dir/src/App.ts"
  if [ -d "$fixture_dir/files" ]; then
    cp -R "$fixture_dir/files/." "$project_dir/"
  fi
}

resolve_local_sibling_package_dir() {
  local package_name="$1"

  node - "$PROJECT_DIR" "$DOTNET_MAJOR" "$package_name" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(process.argv[2]);
const dotnetMajor = process.argv[3];
const packageName = process.argv[4];

if (!packageName.startsWith("@tsonic/")) {
  process.exit(0);
}

const repoName = packageName.slice("@tsonic/".length);
const candidates = [
  path.join(projectDir, "..", repoName, "versions", dotnetMajor),
  path.join(projectDir, "..", repoName),
];

for (const candidate of candidates) {
  const packageJsonPath = path.join(candidate, "package.json");
  if (!fs.existsSync(packageJsonPath)) continue;
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
  if (packageJson.name === packageName) {
    process.stdout.write(candidate);
    process.exit(0);
  }
}
NODE
}

install_local_sibling_dependencies() {
  local workspace_dir="$1"
  local package_dir="$2"
  local sibling_specs_json

  sibling_specs_json="$(
    node - "$PROJECT_DIR" "$DOTNET_MAJOR" "$package_dir" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const projectDir = path.resolve(process.argv[2]);
const dotnetMajor = process.argv[3];
const packageDir = path.resolve(process.argv[4]);
const packageJson = JSON.parse(fs.readFileSync(path.join(packageDir, "package.json"), "utf8"));
const dependencies = packageJson.dependencies ?? {};
const results = [];

for (const packageName of Object.keys(dependencies)) {
  if (!packageName.startsWith("@tsonic/")) continue;
  const repoName = packageName.slice("@tsonic/".length);
  const candidates = [
    path.join(projectDir, "..", repoName, "versions", dotnetMajor),
    path.join(projectDir, "..", repoName),
  ];

  for (const siblingDir of candidates) {
    const packageJsonPath = path.join(siblingDir, "package.json");
    if (!fs.existsSync(packageJsonPath)) continue;
    const siblingPackage = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    if (siblingPackage.name !== packageName) continue;
    results.push(siblingDir);
    break;
  }
}

process.stdout.write(JSON.stringify(results));
NODE
  )"

  mapfile -t sibling_specs < <(node -e 'for (const item of JSON.parse(process.argv[1])) console.log(item);' "$sibling_specs_json")
  if [ "${#sibling_specs[@]}" -eq 0 ]; then
    return
  fi

  run_npm_install_clean "$workspace_dir" "${sibling_specs[@]}"
}

install_packages_preferring_local_siblings() {
  local workspace_dir="$1"
  shift
  local packages=("$@")
  local resolved_specs=()
  local package_name
  local sibling_dir

  for package_name in "${packages[@]}"; do
    if [[ "$package_name" == @tsonic/* ]]; then
      sibling_dir="$(resolve_local_sibling_package_dir "$package_name")"
      if [ -n "$sibling_dir" ]; then
        resolved_specs+=("$sibling_dir")
        continue
      fi
    fi
    resolved_specs+=("$package_name")
  done

  run_npm_install_clean "$workspace_dir" "${resolved_specs[@]}"
}

apply_installed_bindings_package() {
  local workspace_dir="$1"
  local package_name="$2"

  node - "$workspace_dir" "$package_name" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const workspaceDir = path.resolve(process.argv[2]);
const packageName = process.argv[3];
const packageRoot = path.join(workspaceDir, "node_modules", ...packageName.split("/"));
const bindingsPath = path.join(packageRoot, "tsonic.bindings.json");
const workspacePath = path.join(workspaceDir, "tsonic.workspace.json");

if (!fs.existsSync(bindingsPath)) {
  process.stdout.write("[]");
  process.exit(0);
}

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
}

read_installed_tsonic_dependencies() {
  local workspace_dir="$1"
  local package_name="$2"

  node - "$workspace_dir" "$package_name" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const workspaceDir = path.resolve(process.argv[2]);
const packageName = process.argv[3];
const packageRoot = path.join(workspaceDir, "node_modules", ...packageName.split("/"));
const packageJsonPath = path.join(packageRoot, "package.json");

if (!fs.existsSync(packageJsonPath)) {
  process.stdout.write("[]");
  process.exit(0);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const dependencies = Object.keys(packageJson.dependencies ?? {}).filter((name) => name.startsWith("@tsonic/"));
process.stdout.write(JSON.stringify(dependencies));
NODE
}

install_local_bindings_package() {
  local workspace_dir="$1"
  local package_dir="$2"
  local package_name="$3"
  local pending_json
  local current_package
  local extra_types_json
  local dependency_types_json
  local discovered_json

  install_local_sibling_dependencies "$workspace_dir" "$package_dir"
  run_npm_install_clean "$workspace_dir" "$package_dir"

  dependency_types_json="$(read_installed_tsonic_dependencies "$workspace_dir" "$package_name")"
  pending_json="$(node -e 'const pending = [process.argv[1], ...JSON.parse(process.argv[2])]; process.stdout.write(JSON.stringify([...new Set(pending)]));' "$package_name" "$dependency_types_json")"

  while :; do
    mapfile -t pending < <(node -e 'for (const item of JSON.parse(process.argv[1])) console.log(item);' "$pending_json")
    if [ "${#pending[@]}" -eq 0 ]; then
      break
    fi

    current_package="${pending[0]}"
    pending_json="$(node -e 'const items = JSON.parse(process.argv[1]); items.shift(); process.stdout.write(JSON.stringify(items));' "$pending_json")"

    extra_types_json="$(apply_installed_bindings_package "$workspace_dir" "$current_package")"
    dependency_types_json="$(read_installed_tsonic_dependencies "$workspace_dir" "$current_package")"
    discovered_json="$(node -e 'const merged = [...JSON.parse(process.argv[1]), ...JSON.parse(process.argv[2])]; process.stdout.write(JSON.stringify([...new Set(merged)]));' "$extra_types_json" "$dependency_types_json")"
    mapfile -t extra_types < <(node -e 'for (const item of JSON.parse(process.argv[1])) console.log(item);' "$discovered_json")

    if [ "${#extra_types[@]}" -gt 0 ]; then
      install_packages_preferring_local_siblings "$workspace_dir" "${extra_types[@]}"
      pending_json="$(node -e 'const pending = JSON.parse(process.argv[1]); const extra = JSON.parse(process.argv[2]); const seen = new Set(pending); for (const item of extra) { if (!seen.has(item)) { pending.push(item); seen.add(item); } } process.stdout.write(JSON.stringify(pending));' "$pending_json" "$discovered_json")"
    fi
  done
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
    write_local_nuget_config "$fixture_project"
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

echo "[1/7] Building nodejs-clr release artifacts..."
(
  cd "$NODEJS_CLR_DIR"
  run_and_capture "nodejs-clr-dotnet-build-release" dotnet build -c Release >/dev/null
)
echo "  Done"

echo "[2/7] Regenerating package..."
run_and_capture "generate" npm run generate:"$DOTNET_MAJOR" >/dev/null
echo "  Done"

echo "[3/7] Checking exact numeric JS-surface contracts..."
HTTP_INTERNAL="$PROJECT_DIR/versions/$DOTNET_MAJOR/nodejs.Http/internal/index.d.ts"
grep -Fq "timeout: int;" "$HTTP_INTERNAL"
grep -Fq "headersTimeout: int;" "$HTTP_INTERNAL"
grep -Fq "requestTimeout: int;" "$HTTP_INTERNAL"
grep -Fq "keepAliveTimeout: int;" "$HTTP_INTERNAL"
grep -Fq "readonly statusCode: int | undefined;" "$HTTP_INTERNAL"
grep -Fq "setTimeout(msecs: int, callback?: Action): IncomingMessage;" "$HTTP_INTERNAL"
grep -Fq "statusCode: int;" "$HTTP_INTERNAL"
grep -Fq "listen(port: int, hostname?: string, backlog?: int | undefined, callback?: Action): Server;" "$HTTP_INTERNAL"
grep -Fq "writeHead(statusCode: int, statusMessage?: string, headers?: Dictionary_2<System_Internal.String, System_Internal.String>): ServerResponse;" "$HTTP_INTERNAL"
echo "  Done"

echo "[4/7] Running unified Node API verification..."
(
  cd "$NODEJS_CLR_DIR"
  run_and_capture "nodejs-clr-verify-api" npm run verify:api >/dev/null
)
echo "  Done"

echo "[5/7] Running nodejs-clr runtime tests..."
(
  cd "$NODEJS_CLR_DIR"
  run_and_capture "nodejs-clr-dotnet-test" dotnet test -c Release --no-build >/dev/null
)
echo "  Done"

echo "[6/7] Packing local runtime NuGet packages..."
pack_local_runtime_packages
echo "  Done"

echo "[7/7] Running published-consumer E2E fixtures..."
run_fixture "node-specifiers"
run_fixture "bare-aliases"
run_fixture "node-module-matrix"
run_fixture "bare-module-matrix"
run_fixture "root-exports"
run_fixture "entrypoint-http"
run_fixture "http-exact-numerics"
echo "  Done"

echo "[7/7] Selftest complete"
echo ""
echo "All nodejs publish-gated checks passed."
