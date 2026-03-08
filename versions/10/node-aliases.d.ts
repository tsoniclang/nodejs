declare module "node:assert" {
  export { assert } from "@tsonic/nodejs/index.js";
}

declare module "assert" {
  export { assert } from "@tsonic/nodejs/index.js";
}

declare module "node:buffer" {
  export { buffer } from "@tsonic/nodejs/index.js";
  export { Buffer } from "@tsonic/nodejs/index.js";
}

declare module "buffer" {
  export { buffer } from "@tsonic/nodejs/index.js";
  export { Buffer } from "@tsonic/nodejs/index.js";
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
  export const readFileSyncBytes: typeof import("@tsonic/nodejs/index.js").fs.readFileSyncBytes;
  export const readdirSync: typeof import("@tsonic/nodejs/index.js").fs.readdirSync;
  export const readdir: typeof import("@tsonic/nodejs/index.js").fs.readdir;
  export const copyFileSync: typeof import("@tsonic/nodejs/index.js").fs.copyFileSync;
  export const mkdirSync: typeof import("@tsonic/nodejs/index.js").fs.mkdirSync;
  export const realpathSync: typeof import("@tsonic/nodejs/index.js").fs.realpathSync;
  export const rmSync: typeof import("@tsonic/nodejs/index.js").fs.rmSync;
  export const statSync: typeof import("@tsonic/nodejs/index.js").fs.statSync;
  export const writeFileSync: typeof import("@tsonic/nodejs/index.js").fs.writeFileSync;
  export const writeFileSyncBytes: typeof import("@tsonic/nodejs/index.js").fs.writeFileSyncBytes;
}

declare module "fs" {
  export { fs } from "@tsonic/nodejs/index.js";
  export const existsSync: typeof import("@tsonic/nodejs/index.js").fs.existsSync;
  export const readFileSync: typeof import("@tsonic/nodejs/index.js").fs.readFileSync;
  export const readFile: typeof import("@tsonic/nodejs/index.js").fs.readFile;
  export const readFileSyncBytes: typeof import("@tsonic/nodejs/index.js").fs.readFileSyncBytes;
  export const readdirSync: typeof import("@tsonic/nodejs/index.js").fs.readdirSync;
  export const readdir: typeof import("@tsonic/nodejs/index.js").fs.readdir;
  export const copyFileSync: typeof import("@tsonic/nodejs/index.js").fs.copyFileSync;
  export const mkdirSync: typeof import("@tsonic/nodejs/index.js").fs.mkdirSync;
  export const realpathSync: typeof import("@tsonic/nodejs/index.js").fs.realpathSync;
  export const rmSync: typeof import("@tsonic/nodejs/index.js").fs.rmSync;
  export const statSync: typeof import("@tsonic/nodejs/index.js").fs.statSync;
  export const writeFileSync: typeof import("@tsonic/nodejs/index.js").fs.writeFileSync;
  export const writeFileSyncBytes: typeof import("@tsonic/nodejs/index.js").fs.writeFileSyncBytes;
}

declare module "node:path" {
  export { path } from "@tsonic/nodejs/index.js";
  export const join: typeof import("@tsonic/nodejs/index.js").path.join;
  export const extname: typeof import("@tsonic/nodejs/index.js").path.extname;
  export const basename: typeof import("@tsonic/nodejs/index.js").path.basename;
  export const dirname: typeof import("@tsonic/nodejs/index.js").path.dirname;
  export const parse: typeof import("@tsonic/nodejs/index.js").path.parse;
  export const isAbsolute: typeof import("@tsonic/nodejs/index.js").path.isAbsolute;
  export const normalize: typeof import("@tsonic/nodejs/index.js").path.normalize;
  export const relative: typeof import("@tsonic/nodejs/index.js").path.relative;
  export const resolve: typeof import("@tsonic/nodejs/index.js").path.resolve;
  export const sep: typeof import("@tsonic/nodejs/index.js").path.sep;
  export const delimiter: typeof import("@tsonic/nodejs/index.js").path.delimiter;
}

declare module "path" {
  export { path } from "@tsonic/nodejs/index.js";
  export const join: typeof import("@tsonic/nodejs/index.js").path.join;
  export const extname: typeof import("@tsonic/nodejs/index.js").path.extname;
  export const basename: typeof import("@tsonic/nodejs/index.js").path.basename;
  export const dirname: typeof import("@tsonic/nodejs/index.js").path.dirname;
  export const parse: typeof import("@tsonic/nodejs/index.js").path.parse;
  export const isAbsolute: typeof import("@tsonic/nodejs/index.js").path.isAbsolute;
  export const normalize: typeof import("@tsonic/nodejs/index.js").path.normalize;
  export const relative: typeof import("@tsonic/nodejs/index.js").path.relative;
  export const resolve: typeof import("@tsonic/nodejs/index.js").path.resolve;
  export const sep: typeof import("@tsonic/nodejs/index.js").path.sep;
  export const delimiter: typeof import("@tsonic/nodejs/index.js").path.delimiter;
}

declare module "node:crypto" {
  export { crypto } from "@tsonic/nodejs/index.js";
  export const createHash: typeof import("@tsonic/nodejs/index.js").crypto.createHash;
  export const randomUUID: typeof import("@tsonic/nodejs/index.js").crypto.randomUUID;
}

declare module "crypto" {
  export { crypto } from "@tsonic/nodejs/index.js";
  export const createHash: typeof import("@tsonic/nodejs/index.js").crypto.createHash;
  export const randomUUID: typeof import("@tsonic/nodejs/index.js").crypto.randomUUID;
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
  export const homedir: typeof import("@tsonic/nodejs/index.js").os.homedir;
  export const tmpdir: typeof import("@tsonic/nodejs/index.js").os.tmpdir;
}

declare module "node:process" {
  export { process } from "@tsonic/nodejs/index.js";
  export const argv: typeof import("@tsonic/nodejs/index.js").process.argv;
  export const argv0: typeof import("@tsonic/nodejs/index.js").process.argv0;
  export const arch: typeof import("@tsonic/nodejs/index.js").process.arch;
  export const cwd: typeof import("@tsonic/nodejs/index.js").process.cwd;
  export const chdir: typeof import("@tsonic/nodejs/index.js").process.chdir;
  export const env: typeof import("@tsonic/nodejs/index.js").process.env;
  export const execPath: typeof import("@tsonic/nodejs/index.js").process.execPath;
  export const exit: typeof import("@tsonic/nodejs/index.js").process.exit;
  export const exitCode: typeof import("@tsonic/nodejs/index.js").process.exitCode;
  export const kill: typeof import("@tsonic/nodejs/index.js").process.kill;
  export const pid: typeof import("@tsonic/nodejs/index.js").process.pid;
  export const ppid: typeof import("@tsonic/nodejs/index.js").process.ppid;
  export const platform: typeof import("@tsonic/nodejs/index.js").process.platform;
  export const version: typeof import("@tsonic/nodejs/index.js").process.version;
}

declare module "process" {
  export { process } from "@tsonic/nodejs/index.js";
  export const argv: typeof import("@tsonic/nodejs/index.js").process.argv;
  export const argv0: typeof import("@tsonic/nodejs/index.js").process.argv0;
  export const arch: typeof import("@tsonic/nodejs/index.js").process.arch;
  export const cwd: typeof import("@tsonic/nodejs/index.js").process.cwd;
  export const chdir: typeof import("@tsonic/nodejs/index.js").process.chdir;
  export const env: typeof import("@tsonic/nodejs/index.js").process.env;
  export const execPath: typeof import("@tsonic/nodejs/index.js").process.execPath;
  export const exit: typeof import("@tsonic/nodejs/index.js").process.exit;
  export const exitCode: typeof import("@tsonic/nodejs/index.js").process.exitCode;
  export const kill: typeof import("@tsonic/nodejs/index.js").process.kill;
  export const pid: typeof import("@tsonic/nodejs/index.js").process.pid;
  export const ppid: typeof import("@tsonic/nodejs/index.js").process.ppid;
  export const platform: typeof import("@tsonic/nodejs/index.js").process.platform;
  export const version: typeof import("@tsonic/nodejs/index.js").process.version;
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
  export const clearImmediate: typeof import("@tsonic/nodejs/index.js").timers.clearImmediate;
  export const clearInterval: typeof import("@tsonic/nodejs/index.js").timers.clearInterval;
  export const clearTimeout: typeof import("@tsonic/nodejs/index.js").timers.clearTimeout;
  export const setImmediate: typeof import("@tsonic/nodejs/index.js").timers.setImmediate;
  export const setInterval: typeof import("@tsonic/nodejs/index.js").timers.setInterval;
  export const setTimeout: typeof import("@tsonic/nodejs/index.js").timers.setTimeout;
}

declare module "timers" {
  export { timers } from "@tsonic/nodejs/index.js";
  export const clearImmediate: typeof import("@tsonic/nodejs/index.js").timers.clearImmediate;
  export const clearInterval: typeof import("@tsonic/nodejs/index.js").timers.clearInterval;
  export const clearTimeout: typeof import("@tsonic/nodejs/index.js").timers.clearTimeout;
  export const setImmediate: typeof import("@tsonic/nodejs/index.js").timers.setImmediate;
  export const setInterval: typeof import("@tsonic/nodejs/index.js").timers.setInterval;
  export const setTimeout: typeof import("@tsonic/nodejs/index.js").timers.setTimeout;
}

declare module "node:tls" {
  export { tls } from "@tsonic/nodejs/index.js";
}

declare module "tls" {
  export { tls } from "@tsonic/nodejs/index.js";
}

declare module "node:url" {
  export { url } from "@tsonic/nodejs/index.js";
  export { URL, URLSearchParams } from "@tsonic/nodejs/index.js";
  export const fileURLToPath: typeof import("@tsonic/nodejs/index.js").url.fileURLToPath;
  export const pathToFileURL: typeof import("@tsonic/nodejs/index.js").url.pathToFileURL;
}

declare module "url" {
  export { url } from "@tsonic/nodejs/index.js";
  export { URL, URLSearchParams } from "@tsonic/nodejs/index.js";
  export const fileURLToPath: typeof import("@tsonic/nodejs/index.js").url.fileURLToPath;
  export const pathToFileURL: typeof import("@tsonic/nodejs/index.js").url.pathToFileURL;
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
