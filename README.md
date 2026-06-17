# @tsonic/nodejs

Node-style APIs for **Tsonic**.

This package is part of Tsonic: https://tsonic.org.

Use `@tsonic/nodejs` when you want Node-like modules (`fs`, `path`, `events`, `crypto`, `process`, `http`, …) while compiling with Tsonic.

## Target support

`@tsonic/nodejs` is target-neutral. User code imports `@tsonic/nodejs` or
Node-style specifiers such as `node:fs`; the active Tsonic target chooses the
implementation package for that surface.

## Quick Start

```bash
mkdir my-app && cd my-app
npx --yes tsonic@latest init --surface @tsonic/js
npx --yes tsonic@latest add npm @tsonic/nodejs
```

```ts
import { join } from "node:path";
import { readFileSync } from "node:fs";

export function main(): void {
  const fullPath = join("src", "App.ts");
  console.log(fullPath);
  console.log(readFileSync(fullPath, "utf-8"));
}
```

```bash
npm run dev
```

## Existing project

```bash
npx --yes tsonic@latest add npm @tsonic/nodejs
```

`@tsonic/nodejs` is a regular package, not a surface. Use `@tsonic/js` for the ambient JavaScript world, and add `@tsonic/nodejs` when you want `node:*` module imports. Workspaces that use Node-style packages set `surface` to `@tsonic/js`.

## Versioning

This repo is versioned by runtime major:

- `10` → `versions/10/` → npm: `@tsonic/nodejs@10.x`

Before publishing, run `npm run selftest`.

Publish with:

```bash
npm run publish:10
```

## Core Modules

- `assert`, `buffer`, `child_process`, `console`, `crypto`
- `dgram`, `dns`, `events`, `fs`, `http`, `net`, `os`
- `path`, `perf_hooks`, `process`, `querystring`, `readline`
- `stream`, `string_decoder`, `timers`, `tls`, `url`, `util`, `zlib`

The package declares practical Node-style APIs for Tsonic programs. It is a
curated first-party source surface, not an embedded Node.js runtime.

## Usage

### File System (`node:fs`)

```typescript
import { readFileSync, writeFileSync } from "node:fs";

const content = readFileSync("./package.json", "utf-8");
writeFileSync("./output.txt", "Hello from Tsonic!");
```

### Path Operations (`node:path`)

```typescript
import { join, extname, dirname } from "node:path";

const fullPath = join("config", "settings.json");
const ext = extname(fullPath);  // ".json"
const dir = dirname(fullPath);
```

### Events

```typescript
import { EventEmitter } from "@tsonic/nodejs/index.js";

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on("data", (chunk) => console.log(chunk));
```

### Crypto

```ts
import { createHash } from "node:crypto";

const hash = createHash("sha256").update("hello").digest("hex");
void hash;
```

### Process

```ts
import * as process from "node:process";

const cwd = process.cwd();
void cwd;
```

### HTTP

```typescript
import { createServer } from "node:http";

const server = createServer((_req, res) => {
  res.writeHead(200, "OK");
  res.end("Hello from Tsonic!");
});

void server;
```

## Imports (important)

For JS-surface projects with `@tsonic/nodejs` installed, prefer Node-style imports:

- `node:fs`, `node:path`, `node:crypto`, `node:process`, ...
- bare aliases (`fs`, `path`, `crypto`, ...) are also supported

Direct ESM imports from `@tsonic/nodejs/index.js` are still supported.

## Relationship to `@tsonic/js`

- `@tsonic/js` provides JavaScript runtime APIs (JS-style `console`, `JSON`, timers, etc.)
- `@tsonic/nodejs` provides Node-style modules (`fs`, `path`, `crypto`, `http`, etc.)

## Naming Conventions

- `@tsonic/nodejs` intentionally uses **Node/JS-style naming** (camelCase members).

## Runtime values

Node APIs often accept or emit broad event, stream, DNS, URL, and utility
values. The package uses a source-owned `RuntimeValue` union for those broad
slots instead of exposing an unbounded `any` surface. Application code should
prefer concrete module types and narrow broad values before member access.

## Development

Run the package validation check:

```bash
npm run selftest
```

The selftest verifies that the portable runtime forwarding entrypoint is valid
ESM. Target implementation packages own target-specific behavior tests.

## License

MIT
