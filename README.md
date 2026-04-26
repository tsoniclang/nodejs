# @tsonic/nodejs

Node-style APIs for **Tsonic**.

This package is part of Tsonic: https://tsonic.org.

Use `@tsonic/nodejs` when you want Node-like modules (`fs`, `path`, `events`, `crypto`, `process`, `http`, …) while still compiling to a native binary with `tsonic`.

## Prerequisites

- Install the .NET 10 SDK (required by Tsonic): https://dotnet.microsoft.com/download
- Verify: `dotnet --version`

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

`@tsonic/nodejs` is a regular package, not a surface. Use `@tsonic/js` for the ambient JavaScript world, and add `@tsonic/nodejs` when you want `node:*` module imports. If your workspace is still on CLR, switch its `surface` to `@tsonic/js` first.

## Versioning

This repo is versioned by runtime major:

- `10` → `versions/10/` → npm: `@tsonic/nodejs@10.x`

Before publishing, run `npm run selftest`.

Publish with:

```bash
npm run publish:10
```

## Core Modules (what you get)

- `fs`, `path`, `events`, `crypto`, `process`
- `http` (separate module entrypoint)

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

## Documentation

- [docs/getting-started.md](docs/getting-started.md)
- [docs/imports.md](docs/imports.md)
- Module docs: [fs](docs/modules/fs.md), [path](docs/modules/path.md), [crypto](docs/modules/crypto.md), [http](docs/modules/http.md), [events](docs/modules/events.md), [process](docs/modules/process.md)
- https://tsonic.org/nodejs/

## Naming Conventions

- `@tsonic/nodejs` intentionally uses **Node/JS-style naming** (camelCase members).

## Development

See `__build/` for regeneration scripts.

Run the publish-gated validation suite with:

```bash
npm run selftest
```

When sibling `@tsonic/*` repos are checked out locally, the selftest installs those local packages first, whether they are versioned package repos (for example `../js/versions/10`) or root-package repos (for example `../aspnetcore`). That keeps consumer validation coherent across a local release wave instead of mixing local packages with incompatible published transitive dependencies. The selftest also fails on peer-dependency warnings, so inconsistent package waves are caught before publish.

## License

MIT
