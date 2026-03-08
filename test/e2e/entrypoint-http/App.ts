import { http } from "@tsonic/nodejs/nodejs.Http.js";

export function main(): void {
  const server = http.createServer((_req, res) => {
    res.end("ok");
  });

  console.log([server.listening ? "true" : "false", server.close !== undefined ? "true" : "false"].join("|"));
}
