# `fs`

Import:

```ts
import { existsSync, readFileSync, writeFileSync } from "node:fs";
```

Example:

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
