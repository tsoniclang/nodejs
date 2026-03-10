import type { int } from "@tsonic/core/types.js";
import { createServer, get, type IncomingMessage, type ServerResponse } from "node:http";

export function main(): void {
  const server = createServer((_req: IncomingMessage, res: ServerResponse) => {
    const before: int = res.statusCode;
    res.statusCode = 204;
    const after: int = res.statusCode;
    console.log(`response:${before.toString()}->${after.toString()}`);
    res.end("ok");
  });

  server.timeout = 111;
  server.headersTimeout = 222;
  server.requestTimeout = 333;
  server.keepAliveTimeout = 444;

  console.log(
    [
      server.timeout.toString(),
      server.headersTimeout.toString(),
      server.requestTimeout.toString(),
      server.keepAliveTimeout.toString(),
    ].join(","),
  );

  server.listen(0, "127.0.0.1", undefined, () => {
    const address = server.address();
    if (address === undefined) {
      throw new Error("expected bound address");
    }

    const port: int = address.port;
    void port;
    console.log("port:int");

    get(`http://127.0.0.1:${port}/`, (res) => {
      if (res.statusCode === undefined) {
        throw new Error("missing incoming status");
      }

      const statusCode: int = res.statusCode;
      console.log(`incoming:${statusCode.toString()}`);
      res.on("data", () => {});
      res.on("end", () => {
        server.close();
      });
    });
  });
}
