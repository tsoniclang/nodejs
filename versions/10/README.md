# @tsonic/nodejs

TypeScript type definitions for the **Node.js CLR library** (`nodejs.dll`) for use with the **Tsonic** compiler (TypeScript → .NET).

`@tsonic/nodejs` provides Node-style APIs (like `fs`, `path`, `crypto`, `process`, and `http`) implemented on .NET.

## What this package is (and isn’t)

- ✅ TypeScript bindings (`.d.ts`) for the `nodejs` .NET library.
- ❌ Not Node.js. The `.js` files are **module stubs** and must not be executed.
- ✅ The real implementation is a **.NET DLL** that Tsonic references during compilation.

## Versioning

This repo is versioned by **.NET major**:

- **.NET 10** → `versions/10/` → npm: `@tsonic/nodejs@10.x`

When publishing, run: `npm publish versions/10 --access public`

## Features

- **Node.js-like APIs for .NET** - fs, path, events, http, and more
- **camelCase members** - TypeScript-friendly naming conventions
- **Primitive aliases** - `int`, `long`, `decimal`, etc. via `@tsonic/core`
- **Full type safety** - Complete TypeScript declarations

## Installation

```bash
npm install @tsonic/nodejs @tsonic/dotnet @tsonic/core
```

## Quick start (Tsonic)

To enable Node.js interop in a Tsonic workspace:

```bash
tsonic add nodejs
```

This will:

- install `@tsonic/nodejs` (types) as a dev dependency
- copy `nodejs.dll` and `Tsonic.JSRuntime.dll` into `./libs/` for deterministic builds
- add those DLLs to your workspace config (`dotnet.libraries`)

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
import { EventEmitter } from "@tsonic/nodejs/index.js";

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on("data", (chunk) => console.log(chunk));
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

## Documentation

- `docs/README.md`
- https://tsonic.org/nodejs/

## Naming Conventions

- **Types**: PascalCase (matches .NET)
- **Members**: This package reflects the underlying .NET API surface. The `nodejs` runtime intentionally uses Node/JS-style naming.

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
