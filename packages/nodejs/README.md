# `@tsonic/nodejs` Workspace Package

This workspace package contains the authored TypeScript source used to publish
the `@tsonic/nodejs` source package.

The package provides:

- Node-style module aliases such as `node:fs`, `node:path`, `node:http`, and
  `node:crypto`
- explicit ESM subpaths under `@tsonic/nodejs/...`
- source-package metadata in `tsonic.package.json`
- runtime framework/package metadata consumed by the Tsonic compiler
