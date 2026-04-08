---
title: http
---

# `http`

Prefer importing HTTP APIs through the standard Node module name.

Import:

```ts
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
```

Example:

```ts
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

export function main(): void {
  const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, "OK");
    res.end("Hello from Tsonic!");
  });

  server.listen(3000, () => {
    console.log("Listening on http://localhost:3000/");
  });
}
```

This module is part of what downstream apps like proof examples and Jotster use
to prove the Node-style package layer works in real programs.
