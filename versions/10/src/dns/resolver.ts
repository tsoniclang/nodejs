/**
 * DNS Resolver class.
 *
 */
import type { JsValue } from "@tsonic/core/types.js";
import * as dns from "./index.ts";
import type { ResolverOptions, ResolveOptions } from "./options.ts";
import {
  RecordWithTtl,
  SoaRecord,
  type CaaRecord,
  type MxRecord,
  type NaptrRecord,
  type SrvRecord,
  type TlsaRecord,
} from "./records.ts";

/**
 * An independent resolver for DNS requests.
 * Creating a new resolver uses the default server settings.
 */
export class Resolver {
  private _options: ResolverOptions | null;
  private _cancelled: boolean = false;
  private _localIpv4: string | null = null;
  private _localIpv6: string | null = null;

  constructor(options: ResolverOptions | null = null) {
    this._options = options;
  }

  /** Cancel all outstanding DNS queries made by this resolver. */
  public cancel(): void {
    this._cancelled = true;
  }

  /** Returns an array of IP address strings currently configured for DNS resolution. */
  public getServers(): Array<string> {
    return dns.getServers();
  }

  /** Sets the IP address and port of servers to be used when performing DNS resolution. */
  public setServers(servers: Array<string>): void {
    dns.setServers(servers);
  }

  /** The resolver instance will send its requests from the specified IP address. */
  public setLocalAddress(ipv4: string | null = null, ipv6: string | null = null): void {
    this._localIpv4 = ipv4;
    this._localIpv6 = ipv6;
  }

  /** Uses the DNS protocol to resolve a host name. */
  public resolve(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolve(hostname, callback);
  }

  /** Uses the DNS protocol to resolve IPv4 addresses (A records). */
  public resolve4(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolve4(hostname, callback);
  }

  /** Uses the DNS protocol to resolve IPv4 addresses with options. */
  public resolve4WithOptions(
    hostname: string,
    options: ResolveOptions,
    callback: (err: Error | null, result: Array<RecordWithTtl> | Array<string>) => void,
  ): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolve4WithOptions(hostname, options, callback);
  }

  /** Uses the DNS protocol to resolve IPv6 addresses (AAAA records). */
  public resolve6(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolve6(hostname, callback);
  }

  /** Uses the DNS protocol to resolve IPv6 addresses with options. */
  public resolve6WithOptions(
    hostname: string,
    options: ResolveOptions,
    callback: (err: Error | null, result: Array<RecordWithTtl> | Array<string>) => void,
  ): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolve6WithOptions(hostname, options, callback);
  }

  /** Uses the DNS protocol to resolve all records (ANY query). */
  public resolveAny(hostname: string, callback: (err: Error | null, records: Array<JsValue>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveAny(hostname, callback);
  }

  /** Uses the DNS protocol to resolve CAA records. */
  public resolveCaa(hostname: string, callback: (err: Error | null, records: Array<CaaRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveCaa(hostname, callback);
  }

  /** Uses the DNS protocol to resolve CNAME records. */
  public resolveCname(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveCname(hostname, callback);
  }

  /** Uses the DNS protocol to resolve MX records. */
  public resolveMx(hostname: string, callback: (err: Error | null, records: Array<MxRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveMx(hostname, callback);
  }

  /** Uses the DNS protocol to resolve NAPTR records. */
  public resolveNaptr(hostname: string, callback: (err: Error | null, records: Array<NaptrRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveNaptr(hostname, callback);
  }

  /** Uses the DNS protocol to resolve NS records. */
  public resolveNs(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveNs(hostname, callback);
  }

  /** Uses the DNS protocol to resolve PTR records. */
  public resolvePtr(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolvePtr(hostname, callback);
  }

  /** Uses the DNS protocol to resolve SOA record. */
  public resolveSoa(hostname: string, callback: (err: Error | null, record: SoaRecord) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), new SoaRecord());
      return;
    }
    dns.resolveSoa(hostname, callback);
  }

  /** Uses the DNS protocol to resolve SRV records. */
  public resolveSrv(hostname: string, callback: (err: Error | null, records: Array<SrvRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveSrv(hostname, callback);
  }

  /** Uses the DNS protocol to resolve TLSA records. */
  public resolveTlsa(hostname: string, callback: (err: Error | null, records: Array<TlsaRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveTlsa(hostname, callback);
  }

  /** Uses the DNS protocol to resolve TXT records. */
  public resolveTxt(hostname: string, callback: (err: Error | null, records: Array<Array<string>>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.resolveTxt(hostname, callback);
  }

  /** Performs a reverse DNS query. */
  public reverse(ip: string, callback: (err: Error | null, hostnames: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    dns.reverse(ip, callback);
  }
}
