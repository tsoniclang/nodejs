# `fs`

Import:

```ts
import { fs } from "@tsonic/nodejs/index.js";
```

Example:

```ts
import { console, fs } from "@tsonic/nodejs/index.js";

export function main(): void {
  const file = "./README.md";

  if (!fs.existsSync(file)) {
    console.log("Missing README.md");
    return;
  }

  const text = fs.readFileSync(file, "utf-8");
  console.log(text);

  fs.writeFileSync("./out.txt", "Hello from Tsonic!");
}
```

