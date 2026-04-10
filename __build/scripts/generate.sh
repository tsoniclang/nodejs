#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

cat <<EOF
@tsonic/nodejs is a first-party source package.
There is no generated declaration/runtime step anymore.

Authoritative package roots:
  $PROJECT_DIR/versions/10
  $PROJECT_DIR/packages/nodejs

Use these instead:
  npm run selftest
  npm publish ./versions/10 --access public
EOF
