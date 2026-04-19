# `@tsonic/nodejs`

Native Tsonic source-package implementation of Node.js APIs.

This package is the canonical first-party source implementation for the Node-style surface in Tsonic.

Key points:

- Node imports such as `node:fs`, `node:path`, `node:crypto`, and `node:http` resolve through this package.
- Runtime behavior is authored here in TypeScript source under `src/`, not in a separate CLR mirror package.
- The old CLR split is retired architecture; it is no longer part of the active build or publish path.

Validation lives in the checked-in selftest suites under `test/fixtures/selftest`.
