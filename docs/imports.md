# Importing Modules

## Importing from `@tsonic/nodejs/index.js`

Most Node-style modules are exported as named values from the package root entry point:

```ts
import { console, fs, path, process, crypto } from "@tsonic/nodejs/index.js";
```

Types that are part of those modules are also exported from the root entry point:

```ts
import { EventEmitter } from "@tsonic/nodejs/index.js";
```

## Importing submodules (namespaces)

Some namespaces are emitted as separate entry points. For example, HTTP lives in the `nodejs.Http` namespace:

```ts
import { http, IncomingMessage, ServerResponse } from "@tsonic/nodejs/nodejs.Http.js";
```

## Do not import Node builtins (`"fs"`, `"path"`, ...)

Tsonic projects compile to .NET and do **not** run on Node.js. You should not write:

```ts
// ❌ Not supported
import * as fs from "fs";
import * as path from "path";
```

Instead import from `@tsonic/nodejs/index.js`:

```ts
// ✅ Supported
import { fs, path } from "@tsonic/nodejs/index.js";
```

