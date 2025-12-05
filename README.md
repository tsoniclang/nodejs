# @tsonic/nodejs

TypeScript type definitions for the Node.js CLR library.

## Features

- **Node.js-like APIs for .NET** - fs, path, events, http, and more
- **camelCase members** - TypeScript-friendly naming conventions
- **Branded primitive types** - Typed numbers via `@tsonic/types`
- **Full type safety** - Complete TypeScript declarations

## Installation

```bash
npm install @tsonic/nodejs @tsonic/types
```

## Usage

### File System

```typescript
import type { fs } from "@tsonic/nodejs/nodejs";

// Read file
const content = fs.readFileSync("./package.json", "utf-8");

// Write file
fs.writeFileSync("./output.txt", "Hello from Tsonic!");
```

### Path Operations

```typescript
import type { path } from "@tsonic/nodejs/nodejs";

const fullPath = path.join(__dirname, "config", "settings.json");
const ext = path.extname(fullPath);  // ".json"
const dir = path.dirname(fullPath);
```

### Events

```typescript
import type { EventEmitter } from "@tsonic/nodejs/nodejs";

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
emitter.on("data", (chunk) => console.log(chunk));
```

### HTTP

```typescript
import type { HttpServer, HttpRequest, HttpResponse } from "@tsonic/nodejs/nodejs.Http";
```

## Naming Conventions

- **Types**: PascalCase (matches .NET)
- **Members**: camelCase (TypeScript convention)

For CLR/PascalCase naming, use `@tsonic/nodejs-pure` instead.

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
