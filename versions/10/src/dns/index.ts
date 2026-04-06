/**
 * Node.js dns module.
 *
 * Baseline: nodejs-clr/src/nodejs/dns/dns.cs
 */

import type {} from "../type-bootstrap.ts";

import type { int, JsValue } from "@tsonic/core/types.js";
import { LookupAddress, LookupOptions } from "./options.ts";
import { SoaRecord } from "./records.ts";
import type { CaaRecord, MxRecord, NaptrRecord, SrvRecord, TlsaRecord } from "./records.ts";
import type { ResolveOptions } from "./options.ts";
import { DnsPromises } from "./promises.ts";

// ==================== Re-exports ====================

export { LookupOptions, LookupAddress, ResolveOptions, ResolverOptions } from "./options.ts";
export {
  RecordWithTtl,
  AnyARecord,
  AnyAaaaRecord,
  CaaRecord,
  AnyCaaRecord,
  MxRecord,
  AnyMxRecord,
  NaptrRecord,
  AnyNaptrRecord,
  SoaRecord,
  AnySoaRecord,
  SrvRecord,
  AnySrvRecord,
  TlsaRecord,
  AnyTlsaRecord,
  AnyTxtRecord,
  AnyNsRecord,
  AnyPtrRecord,
  AnyCnameRecord,
} from "./records.ts";
export { Resolver } from "./resolver.ts";
export { DnsPromises, LookupServiceResult } from "./promises.ts";

// ==================== Constants ====================

/** Limits returned address types to the types of non-loopback addresses configured on the system. */
export const ADDRCONFIG: int = 0x0400;

/** If the IPv6 family was specified, but no IPv6 addresses were found, return IPv4 mapped IPv6 addresses. */
export const V4MAPPED: int = 0x0800;

/** If dns.V4MAPPED is specified, return resolved IPv6 addresses as well as IPv4 mapped IPv6 addresses. */
export const ALL: int = V4MAPPED | ADDRCONFIG;

// Error codes
/** DNS server returned answer with no data. */
export const NODATA: string = "ENODATA";
/** DNS server claims query was misformatted. */
export const FORMERR: string = "EFORMERR";
/** DNS server returned general failure. */
export const SERVFAIL: string = "ESERVFAIL";
/** Domain name not found. */
export const NOTFOUND: string = "ENOTFOUND";
/** DNS server does not implement requested operation. */
export const NOTIMP: string = "ENOTIMP";
/** DNS server refused query. */
export const REFUSED: string = "EREFUSED";
/** Misformatted DNS query. */
export const BADQUERY: string = "EBADQUERY";
/** Misformatted host name. */
export const BADNAME: string = "EBADNAME";
/** Unsupported address family. */
export const BADFAMILY: string = "EBADFAMILY";
/** Misformatted DNS reply. */
export const BADRESP: string = "EBADRESP";
/** Could not contact DNS servers. */
export const CONNREFUSED: string = "ECONNREFUSED";
/** Timeout while contacting DNS servers. */
export const TIMEOUT: string = "ETIMEOUT";
/** End of file. */
export const EOF: string = "EOF";
/** Error reading file. */
export const FILE: string = "EFILE";
/** Out of memory. */
export const NOMEM: string = "ENOMEM";
/** Channel is being destroyed. */
export const DESTRUCTION: string = "EDESTRUCTION";
/** Misformatted string. */
export const BADSTR: string = "EBADSTR";
/** Illegal flags specified. */
export const BADFLAGS: string = "EBADFLAGS";
/** Given host name is not numeric. */
export const NONAME: string = "ENONAME";
/** Illegal hints flags specified. */
export const BADHINTS: string = "EBADHINTS";
/** c-ares library initialization not yet performed. */
export const NOTINITIALIZED: string = "ENOTINITIALIZED";
/** Error loading iphlpapi.dll. */
export const LOADIPHLPAPI: string = "ELOADIPHLPAPI";
/** Could not find GetNetworkParams function. */
export const ADDRGETNETWORKPARAMS: string = "EADDRGETNETWORKPARAMS";
/** DNS query cancelled. */
export const CANCELLED: string = "ECANCELLED";

// ==================== Module state ====================

const _promises: DnsPromises = new DnsPromises();
let defaultResultOrder = "verbatim";

/** Promise-based dns APIs. */
export const promises: DnsPromises = _promises;

// ==================== lookup ====================

/** Resolves a host name into the first found A (IPv4) or AAAA (IPv6) record. */
export const lookup = (
  hostname: string,
  optionsOrFamily: LookupOptions | int | null,
  callback: (err: Error | null, address: string, family: int) => void,
): void => {
  // TODO: actual DNS resolution via .NET Dns.GetHostAddresses
  callback(null, "", 0);
};

/** Resolves a host name and returns all addresses when options.all is true. */
export const lookupAll = (
  hostname: string,
  options: LookupOptions | null,
  callback: (err: Error | null, addresses: Array<LookupAddress>) => void,
): void => {
  // TODO: actual DNS resolution via .NET Dns.GetHostAddresses
  callback(null, []);
};

// ==================== lookupService ====================

/** Resolves the given address and port into a host name and service. */
export const lookupService = (
  address: string,
  port: int,
  callback: (err: Error | null, hostname: string, service: string) => void,
): void => {
  // TODO: actual reverse lookup via .NET Dns.GetHostEntry
  callback(null, "", "");
};

// ==================== resolve ====================

/** Uses the DNS protocol to resolve a host name into an array of resource records. */
export const resolve = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: delegate to resolve4
  callback(null, []);
};

/** Uses the DNS protocol to resolve a host name with specific record type. */
export const resolveWithRrtype = (
  hostname: string,
  rrtype: string,
  callback: (err: Error | null, records: JsValue) => void,
): void => {
  // TODO: dispatch by rrtype to specific resolve functions
  callback(null, []);
};

// ==================== resolve4 ====================

/** Uses the DNS protocol to resolve IPv4 addresses (A records) for the hostname. */
export const resolve4 = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: actual DNS resolution via .NET Dns.GetHostAddresses filtered to InterNetwork
  callback(null, []);
};

/** Uses the DNS protocol to resolve IPv4 addresses with TTL information. */
export const resolve4WithOptions = (
  hostname: string,
  options: ResolveOptions,
  callback: (err: Error | null, result: JsValue) => void,
): void => {
  // TODO: if options.ttl, return RecordWithTtl[]; otherwise string[]
  callback(null, []);
};

// ==================== resolve6 ====================

/** Uses the DNS protocol to resolve IPv6 addresses (AAAA records) for the hostname. */
export const resolve6 = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: actual DNS resolution via .NET Dns.GetHostAddresses filtered to InterNetworkV6
  callback(null, []);
};

/** Uses the DNS protocol to resolve IPv6 addresses with TTL information. */
export const resolve6WithOptions = (
  hostname: string,
  options: ResolveOptions,
  callback: (err: Error | null, result: JsValue) => void,
): void => {
  // TODO: if options.ttl, return RecordWithTtl[]; otherwise string[]
  callback(null, []);
};

// ==================== resolveCname ====================

/** Uses the DNS protocol to resolve CNAME records for the hostname. */
export const resolveCname = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveCaa ====================

/** Uses the DNS protocol to resolve CAA records for the hostname. */
export const resolveCaa = (
  hostname: string,
  callback: (err: Error | null, records: Array<CaaRecord>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveMx ====================

/** Uses the DNS protocol to resolve mail exchange records (MX records) for the hostname. */
export const resolveMx = (
  hostname: string,
  callback: (err: Error | null, records: Array<MxRecord>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveNaptr ====================

/** Uses the DNS protocol to resolve regular expression-based records (NAPTR records). */
export const resolveNaptr = (
  hostname: string,
  callback: (err: Error | null, records: Array<NaptrRecord>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveNs ====================

/** Uses the DNS protocol to resolve name server records (NS records) for the hostname. */
export const resolveNs = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolvePtr ====================

/** Uses the DNS protocol to resolve pointer records (PTR records) for the hostname. */
export const resolvePtr = (
  hostname: string,
  callback: (err: Error | null, addresses: Array<string>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveSoa ====================

/** Uses the DNS protocol to resolve a start of authority record (SOA record). */
export const resolveSoa = (
  hostname: string,
  callback: (err: Error | null, record: SoaRecord) => void,
): void => {
  // TODO: actual DNS resolution
  callback(new Error("SOA records not supported"), new SoaRecord());
};

// ==================== resolveSrv ====================

/** Uses the DNS protocol to resolve service records (SRV records) for the hostname. */
export const resolveSrv = (
  hostname: string,
  callback: (err: Error | null, records: Array<SrvRecord>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveTlsa ====================

/** Uses the DNS protocol to resolve certificate associations (TLSA records). */
export const resolveTlsa = (
  hostname: string,
  callback: (err: Error | null, records: Array<TlsaRecord>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveTxt ====================

/** Uses the DNS protocol to resolve text queries (TXT records) for the hostname. */
export const resolveTxt = (
  hostname: string,
  callback: (err: Error | null, records: Array<Array<string>>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== resolveAny ====================

/** Uses the DNS protocol to resolve all records (ANY or * query). */
export const resolveAny = (
  hostname: string,
  callback: (err: Error | null, records: Array<object>) => void,
): void => {
  // TODO: actual DNS resolution
  callback(null, []);
};

// ==================== reverse ====================

/** Performs a reverse DNS query that resolves an IPv4 or IPv6 address to an array of host names. */
export const reverse = (
  ip: string,
  callback: (err: Error | null, hostnames: Array<string>) => void,
): void => {
  // TODO: actual reverse DNS via .NET Dns.GetHostEntry
  callback(null, []);
};

// ==================== Configuration Methods ====================

/** Get the default value for order in dns.lookup(). */
export const getDefaultResultOrder = (): string => {
  return defaultResultOrder;
};

/** Set the default value of order in dns.lookup(). */
export const setDefaultResultOrder = (order: string): void => {
  if (order !== "ipv4first" && order !== "ipv6first" && order !== "verbatim") {
    throw new Error(
      `Invalid order value: ${order}. Must be 'ipv4first', 'ipv6first' or 'verbatim'`,
    );
  }
  defaultResultOrder = order;
};

/** Sets the IP address and port of servers to be used when performing DNS resolution. */
export const setServers = (servers: Array<string>): void => {
  // TODO: stub -- .NET doesn't support changing DNS servers programmatically
};

/** Returns an array of IP address strings currently configured for DNS resolution. */
export const getServers = (): Array<string> => {
  // TODO: stub -- .NET doesn't provide API to get DNS servers
  return [];
};
