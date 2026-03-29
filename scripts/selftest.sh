#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
DOTNET_MAJOR="${1:-10}"
WORK_DIR="$(mktemp -d "${TMPDIR:-/tmp}/nodejs-selftest.XXXXXX")"
if [ -n "${TSONIC_CLI:-}" ]; then
  TSONIC_CLI="$TSONIC_CLI"
elif [ -f "$PROJECT_ROOT/../tsonic/packages/cli/dist/index.js" ]; then
  TSONIC_CLI="$PROJECT_ROOT/../tsonic/packages/cli/dist/index.js"
else
  TSONIC_CLI="tsonic@latest"
fi
LOCAL_NUGET_FEED="$WORK_DIR/local-nuget"
export NUGET_PACKAGES="$WORK_DIR/nuget-packages"

cleanup() {
  rm -rf "$WORK_DIR"
}
trap cleanup EXIT

run_tsonic() {
  if [[ "$TSONIC_CLI" == *.js ]]; then
    node "$TSONIC_CLI" "$@"
    return
  fi

  npx --yes "$TSONIC_CLI" "$@"
}

run_tsonic_in() {
  local workdir="$1"
  shift
  (
    cd "$workdir"
    run_tsonic "$@"
  )
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
  dotnet pack "$PROJECT_ROOT/../runtime/src/Tsonic.Runtime/Tsonic.Runtime.csproj" -c Release -o "$LOCAL_NUGET_FEED" >/dev/null
  dotnet pack "$PROJECT_ROOT/../js-runtime/src/Tsonic.JSRuntime/Tsonic.JSRuntime.csproj" -c Release -o "$LOCAL_NUGET_FEED" >/dev/null
}

patch_workspace_for_tests() {
  local workspace_dir="$1"
  node - "$workspace_dir" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");

const workspaceDir = path.resolve(process.argv[2]);
const workspacePath = path.join(workspaceDir, "tsonic.workspace.json");
const workspace = JSON.parse(fs.readFileSync(workspacePath, "utf8"));
workspace.testDotnet = {
  packageReferences: [
    { id: "Microsoft.NET.Test.Sdk", version: "17.11.1", types: false },
    { id: "xunit", version: "2.9.2" },
    { id: "xunit.runner.visualstudio", version: "2.5.6", types: false }
  ]
};
fs.writeFileSync(workspacePath, JSON.stringify(workspace, null, 2) + "\n");

const projectName = path.basename(workspaceDir);
const projectConfigPath = path.join(
  workspaceDir,
  "packages",
  projectName,
  "tsonic.json"
);
const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, "utf8"));
projectConfig.tests = {
  entryPoint: "src/tests/index.ts",
  outputDirectory: ".tsonic/generated-tests",
  outputName: "NodejsNext.Selftests"
};
fs.writeFileSync(projectConfigPath, JSON.stringify(projectConfig, null, 2) + "\n");
NODE
}

copy_fixture_tree() {
  local fixture_dir="$1"
  local workspace_dir="$2"
  local project_name
  project_name="$(basename "$workspace_dir")"
  local project_src="$workspace_dir/packages/$project_name/src"
  mkdir -p "$project_src"
  cp -R "$fixture_dir/." "$project_src/"
}

pack_local_runtime_packages

run_tsonic_in "$WORK_DIR" init --surface @tsonic/js >/dev/null
write_local_nuget_config "$WORK_DIR"

npm --prefix "$WORK_DIR" install \
  "$PROJECT_ROOT/../core/versions/$DOTNET_MAJOR" \
  "$PROJECT_ROOT/../dotnet/versions/$DOTNET_MAJOR" \
  "$PROJECT_ROOT/../js/versions/$DOTNET_MAJOR" >/dev/null

PACKAGE_TGZ="$(npm pack --silent --pack-destination "$WORK_DIR" "$PROJECT_ROOT/versions/$DOTNET_MAJOR")"
PACKAGE_SPEC="$WORK_DIR/$PACKAGE_TGZ"

npm --prefix "$WORK_DIR" install "$PACKAGE_SPEC" >/dev/null

patch_workspace_for_tests "$WORK_DIR"
copy_fixture_tree "$PROJECT_ROOT/test/fixtures/selftest" "$WORK_DIR"

run_tsonic_in "$WORK_DIR" test >/dev/null

OUTPUT="$(
  run_tsonic_in "$WORK_DIR" run 2>/dev/null \
    | sed '/^Running /d;/^Process exited with code /d;/^─/d;/^$/d' \
    | tail -n 1
)"

[ "$OUTPUT" = "path-ok;events-ok;process-ok" ]

echo "nodejs selftest passed"
