# @tsonic/nodejs

Node-style APIs for **Tsonic** (TypeScript → .NET).

Use `@tsonic/nodejs` when you want Node-like modules (`fs`, `path`, `events`, `crypto`, `process`, `http`, …) while still compiling to a native binary with `tsonic`.

## Quick Start

### New project

```bash
mkdir my-app && cd my-app
tsonic init --nodejs
npm run dev
```

### Existing project

```bash
tsonic add nodejs
```

## Versioning

This repo is versioned by **.NET major**:

- **.NET 10** → `versions/10/` → npm: `@tsonic/nodejs@10.x`

When publishing, run: `npm publish versions/10 --access public`

## Core Modules (what you get)

- `fs`, `path`, `events`, `crypto`, `process`
- `http` (separate module entrypoint)

## Usage

### File System

```typescript
import { fs } from "@tsonic/nodejs/index.js";

// Read file
const content = fs.readFileSync("./package.json", "utf-8");

// Write file
fs.writeFileSync("./output.txt", "Hello from Tsonic!");
```

### Path Operations

```typescript
import { path } from "@tsonic/nodejs/index.js";

const fullPath = path.join("config", "settings.json");
const ext = path.extname(fullPath);  // ".json"
const dir = path.dirname(fullPath);
```

### Events

```typescript
import { EventEmitter, console } from "@tsonic/nodejs/index.js";

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on("data", (chunk) => console.log(chunk));
```

### Crypto

```ts
import { crypto } from "@tsonic/nodejs/index.js";

const hash = crypto.createHash("sha256").update("hello").digest("hex");
void hash;
```

### Process

```ts
import { process } from "@tsonic/nodejs/index.js";

const cwd = process.cwd();
void cwd;
```

### HTTP

```typescript
import { http } from "@tsonic/nodejs/nodejs.Http.js";
```

## Imports (important)

This is an ESM package. Import from the explicit entrypoints:

- `@tsonic/nodejs/index.js` for most Node-style APIs (`fs`, `path`, `crypto`, `process`, …)
- submodules like `@tsonic/nodejs/nodejs.Http.js` for separately emitted namespaces

Node’s built-in specifiers like `node:fs` are **not** supported here.

## Relationship to `@tsonic/js`

- `@tsonic/js` provides JavaScript runtime APIs (JS-style `console`, `JSON`, timers, etc.)
- `@tsonic/nodejs` provides Node-style modules (`fs`, `path`, `crypto`, `http`, etc.)

## Documentation

- `../../docs/README.md`
- https://tsonic.org/nodejs/

## Naming Conventions

- `@tsonic/nodejs` intentionally uses **Node/JS-style naming** (camelCase members).

## Development

### Regenerating Types

To regenerate TypeScript declarations:

```bash
./__build/scripts/generate.sh
```

**Prerequisites:**
- .NET 10 SDK installed
- `tsbindgen` repository at `../tsbindgen`
- `nodejs-clr` repository at `../nodejs-clr` (built with `dotnet build -c Release`)

**Environment variables:**
- `DOTNET_VERSION` - .NET runtime version (default: `10.0.0`)
- `DOTNET_HOME` - .NET installation directory (default: `$HOME/.dotnet`)

## License

MIT
