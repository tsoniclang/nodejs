# `http` (`nodejs.Http`)

The HTTP API lives in the `nodejs.Http` namespace and is imported as a submodule.

Import:

```ts
import { http, IncomingMessage, ServerResponse } from "@tsonic/nodejs/nodejs.Http.js";
```

Example:

```ts
import { console } from "@tsonic/nodejs/index.js";
import { http, IncomingMessage, ServerResponse } from "@tsonic/nodejs/nodejs.Http.js";
import { Thread, Timeout } from "@tsonic/dotnet/System.Threading.js";

export function main(): void {
  const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    console.log(`${req.method} ${req.url}`);
    res.setHeader("Content-Type", "text/plain");
    res.writeHead(200, "OK");
    res.end("Hello from Tsonic!");
  });

  server.listen(3000, () => {
    console.log("Listening on http://localhost:3000/");
  });

  Thread.sleep(Timeout.infinite);
}
```

