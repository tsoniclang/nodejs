---
title: Node.js Package
---

# `@tsonic/nodejs`

`@tsonic/nodejs` is the first-party source package for Node-style modules in
Tsonic.

## What it is

- a first-party `tsonic-source-package`
- used alongside `@tsonic/js`
- provides `node:*` module aliases and package-root entry points
- carries manifest metadata that can add CLR framework/runtime requirements

## What it is not

- not a separate ambient surface
- not Node.js itself
- not a separate public companion-package model

The active model is:

- workspace surface: `@tsonic/js`
- package dependency: `@tsonic/nodejs`

## What the package manifest is doing

The package manifest declares:

- compatibility with `@tsonic/js`
- required type roots
- `node:*` and bare module aliases
- exported subpaths such as `./fs.js`, `./path.js`, and `./http.js`
- runtime metadata when framework packages are required underneath

## Quick start

```bash
tsonic init --surface @tsonic/js
tsonic add npm @tsonic/nodejs
```

```ts
import * as fs from "node:fs";
import * as path from "node:path";

export function main(): void {
  const file = path.join("src", "App.ts");
  console.log(file, fs.existsSync(file));
}
```

After installation, run `tsonic restore` or `tsonic build` so the workspace
materializes the CLR dependencies declared by the package manifest.

## Pages

- [Getting Started](getting-started.md)
- [Imports](imports.md)
- [Modules](modules/)
- [Modules and Runtime Model](modules-and-runtime.md)
