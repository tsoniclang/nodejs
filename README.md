# @tsonic/nodejs

TypeScript type definitions for the Node.js CLR library.

## Features

- **Node.js-like APIs for .NET** - fs, path, events, http, and more
- **camelCase members** - TypeScript-friendly naming conventions
- **Primitive aliases** - `int`, `long`, `decimal`, etc. via `@tsonic/core`
- **Full type safety** - Complete TypeScript declarations

## Installation

```bash
npm install @tsonic/nodejs @tsonic/dotnet @tsonic/core
```

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

## Naming Conventions

- **Types**: PascalCase (matches .NET)
- **Members**: camelCase (TypeScript convention)

To generate CLR/PascalCase member names, regenerate with `--naming clr` (or omit `--naming js`).

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
