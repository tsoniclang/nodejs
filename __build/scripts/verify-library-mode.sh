#!/bin/bash
# verify-library-mode.sh
# Regression tests for library mode external import resolution
# These tests detect the failure modes that occur when --lib doesn't work correctly

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NODEJS_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

echo "================================================================"
echo "Library Mode Verification Tests"
echo "================================================================"
echo ""
echo "Package directory: $NODEJS_DIR"
echo ""

FAILED=0

# Test 1: No relative imports into BCL namespaces
# If --lib fails, imports would look like "../../System/internal/index.js"
echo "[Test 1] No relative imports to BCL namespaces..."
if grep -r '"\.\./.*System' "$NODEJS_DIR"/*.d.ts "$NODEJS_DIR"/nodejs/*.d.ts "$NODEJS_DIR"/nodejs.Http/*.d.ts 2>/dev/null; then
    echo "  FAIL: Found relative imports to System namespace"
    FAILED=1
else
    echo "  PASS: No relative BCL imports found"
fi

# Test 2: No unresolved type leakage for BCL types
# If type resolution fails, unresolved types surface as 'unknown' or '__OpaqueClrType<...>'
echo ""
echo "[Test 2] No unresolved type leakage..."
UNRESOLVED_COUNT=$(grep -rE ': unknown[^a-zA-Z]|: unknown$|\(.*: unknown|__OpaqueClrType<' "$NODEJS_DIR"/nodejs/internal/index.d.ts "$NODEJS_DIR"/nodejs.Http/internal/index.d.ts 2>/dev/null | wc -l)
if [ "$UNRESOLVED_COUNT" -gt 0 ]; then
    echo "  FAIL: Found $UNRESOLVED_COUNT unresolved type leakage instances"
    grep -rE ': unknown[^a-zA-Z]|: unknown$|\(.*: unknown|__OpaqueClrType<' "$NODEJS_DIR"/nodejs/internal/index.d.ts "$NODEJS_DIR"/nodejs.Http/internal/index.d.ts 2>/dev/null | head -5
    FAILED=1
else
    echo "  PASS: No unresolved type leakage found"
fi

# Test 3: No BCL namespace directories in output
# If --lib fails, BCL namespaces get generated as separate directories
echo ""
echo "[Test 3] No BCL namespace directories..."
BCL_DIRS=$(ls -d "$NODEJS_DIR"/System* "$NODEJS_DIR"/Microsoft* 2>/dev/null | wc -l)
if [ "$BCL_DIRS" -gt 0 ]; then
    echo "  FAIL: Found $BCL_DIRS BCL namespace directories (should be 0)"
    ls -d "$NODEJS_DIR"/System* "$NODEJS_DIR"/Microsoft* 2>/dev/null | head -5
    FAILED=1
else
    echo "  PASS: No BCL namespace directories found"
fi

# Test 4: Imports use package specifier format
# Correct imports should be "@tsonic/dotnet/System.js" not relative paths
echo ""
echo "[Test 4] Imports use @tsonic/dotnet package specifier..."
PACKAGE_IMPORTS=$(grep -c '@tsonic/dotnet/' "$NODEJS_DIR"/nodejs/internal/index.d.ts 2>/dev/null || echo "0")
if [ "$PACKAGE_IMPORTS" -eq 0 ]; then
    echo "  FAIL: No @tsonic/dotnet imports found (library mode not working)"
    FAILED=1
else
    echo "  PASS: Found $PACKAGE_IMPORTS @tsonic/dotnet imports"
fi

# Test 5: TypeScript compilation succeeds
echo ""
echo "[Test 5] TypeScript compilation..."
cd "$NODEJS_DIR"
if npx tsc --noEmit 2>&1; then
    echo "  PASS: TypeScript compilation succeeded"
else
    echo "  FAIL: TypeScript compilation failed"
    FAILED=1
fi

# Summary
echo ""
echo "================================================================"
if [ "$FAILED" -eq 0 ]; then
    echo "All tests PASSED"
    exit 0
else
    echo "Some tests FAILED"
    exit 1
fi
