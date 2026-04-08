---
title: fs
---

# `fs`

Import:

```ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
```

Examples:

```ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";

export function main(): void {
  const file = "./README.md";

  if (!existsSync(file)) {
    console.log("Missing README.md");
    return;
  }

  const text = readFileSync(file, "utf-8");
  console.log(text);

  writeFileSync("./out.txt", "Hello from Tsonic!");
}
```

Common patterns also include:

- `fs.readFile(...)`
- `fs.readdir(...)`
- `fs.mkdir(...)`
- `fs.mkdirSync(...)`

Use `node:fs` for the normal Node-style authoring model, not `@tsonic/nodejs`
subpaths unless you need an explicit package-root import.
