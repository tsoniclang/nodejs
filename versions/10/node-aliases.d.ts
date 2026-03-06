declare module "node:assert" {
  export { assert } from "@tsonic/nodejs/index.js";
}

declare module "assert" {
  export { assert } from "@tsonic/nodejs/index.js";
}

declare module "node:buffer" {
  export { buffer } from "@tsonic/nodejs/index.js";
}

declare module "buffer" {
  export { buffer } from "@tsonic/nodejs/index.js";
}

declare module "node:child_process" {
  export { child_process } from "@tsonic/nodejs/index.js";
}

declare module "child_process" {
  export { child_process } from "@tsonic/nodejs/index.js";
}

declare module "node:fs" {
  export { fs } from "@tsonic/nodejs/index.js";
  export const existsSync: typeof import("@tsonic/nodejs/index.js").fs.existsSync;
  export const readFileSync: typeof import("@tsonic/nodejs/index.js").fs.readFileSync;
  export const readFile: typeof import("@tsonic/nodejs/index.js").fs.readFile;
  export const readdir: typeof import("@tsonic/nodejs/index.js").fs.readdir;
  export const mkdirSync: typeof import("@tsonic/nodejs/index.js").fs.mkdirSync;
}

declare module "fs" {
  export { fs } from "@tsonic/nodejs/index.js";
}

declare module "node:path" {
  export { path } from "@tsonic/nodejs/index.js";
  export const join: typeof import("@tsonic/nodejs/index.js").path.join;
  export const extname: typeof import("@tsonic/nodejs/index.js").path.extname;
  export const basename: typeof import("@tsonic/nodejs/index.js").path.basename;
  export const dirname: typeof import("@tsonic/nodejs/index.js").path.dirname;
  export const parse: typeof import("@tsonic/nodejs/index.js").path.parse;
  export const resolve: typeof import("@tsonic/nodejs/index.js").path.resolve;
}

declare module "path" {
  export { path } from "@tsonic/nodejs/index.js";
}

declare module "node:crypto" {
  export { crypto } from "@tsonic/nodejs/index.js";
  export const randomUUID: typeof import("@tsonic/nodejs/index.js").crypto.randomUUID;
}

declare module "crypto" {
  export { crypto } from "@tsonic/nodejs/index.js";
}

declare module "node:dgram" {
  export { dgram } from "@tsonic/nodejs/index.js";
}

declare module "dgram" {
  export { dgram } from "@tsonic/nodejs/index.js";
}

declare module "node:dns" {
  export { dns } from "@tsonic/nodejs/index.js";
}

declare module "dns" {
  export { dns } from "@tsonic/nodejs/index.js";
}

declare module "node:events" {
  export { events } from "@tsonic/nodejs/index.js";
}

declare module "events" {
  export { events } from "@tsonic/nodejs/index.js";
}

declare module "node:net" {
  export { net } from "@tsonic/nodejs/index.js";
}

declare module "net" {
  export { net } from "@tsonic/nodejs/index.js";
}

declare module "node:os" {
  export { os } from "@tsonic/nodejs/index.js";
  export const homedir: typeof import("@tsonic/nodejs/index.js").os.homedir;
  export const tmpdir: typeof import("@tsonic/nodejs/index.js").os.tmpdir;
}

declare module "os" {
  export { os } from "@tsonic/nodejs/index.js";
}

declare module "node:process" {
  export { process } from "@tsonic/nodejs/index.js";
  export const arch: typeof import("@tsonic/nodejs/index.js").process.arch;
  export const cwd: typeof import("@tsonic/nodejs/index.js").process.cwd;
  export const pid: typeof import("@tsonic/nodejs/index.js").process.pid;
  export const platform: typeof import("@tsonic/nodejs/index.js").process.platform;
  export const version: typeof import("@tsonic/nodejs/index.js").process.version;
}

declare module "process" {
  export { process } from "@tsonic/nodejs/index.js";
}

declare module "node:querystring" {
  export { querystring } from "@tsonic/nodejs/index.js";
}

declare module "querystring" {
  export { querystring } from "@tsonic/nodejs/index.js";
}

declare module "node:readline" {
  export { readline } from "@tsonic/nodejs/index.js";
}

declare module "readline" {
  export { readline } from "@tsonic/nodejs/index.js";
}

declare module "node:stream" {
  export { stream } from "@tsonic/nodejs/index.js";
}

declare module "stream" {
  export { stream } from "@tsonic/nodejs/index.js";
}

declare module "node:timers" {
  export { timers } from "@tsonic/nodejs/index.js";
}

declare module "timers" {
  export { timers } from "@tsonic/nodejs/index.js";
}

declare module "node:tls" {
  export { tls } from "@tsonic/nodejs/index.js";
}

declare module "tls" {
  export { tls } from "@tsonic/nodejs/index.js";
}

declare module "node:url" {
  export { url } from "@tsonic/nodejs/index.js";
}

declare module "url" {
  export { url } from "@tsonic/nodejs/index.js";
}

declare module "node:http" {
  export { http } from "@tsonic/nodejs/nodejs.Http.js";
  export type { AddressInfo, ClientRequest, IncomingMessage, RequestOptions, Server, ServerResponse } from "@tsonic/nodejs/nodejs.Http.js";
  export const createServer: typeof import("@tsonic/nodejs/nodejs.Http.js").http.createServer;
  export const get: typeof import("@tsonic/nodejs/nodejs.Http.js").http.get;
  export const request: typeof import("@tsonic/nodejs/nodejs.Http.js").http.request;
}

declare module "http" {
  export { http } from "@tsonic/nodejs/nodejs.Http.js";
  export type { AddressInfo, ClientRequest, IncomingMessage, RequestOptions, Server, ServerResponse } from "@tsonic/nodejs/nodejs.Http.js";
  export const createServer: typeof import("@tsonic/nodejs/nodejs.Http.js").http.createServer;
  export const get: typeof import("@tsonic/nodejs/nodejs.Http.js").http.get;
  export const request: typeof import("@tsonic/nodejs/nodejs.Http.js").http.request;
}

declare module "node:util" {
  export { util } from "@tsonic/nodejs/index.js";
}

declare module "util" {
  export { util } from "@tsonic/nodejs/index.js";
}

declare module "node:zlib" {
  export { zlib } from "@tsonic/nodejs/index.js";
}

declare module "zlib" {
  export { zlib } from "@tsonic/nodejs/index.js";
}
