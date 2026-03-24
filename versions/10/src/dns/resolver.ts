/**
 * DNS Resolver class.
 *
 * Baseline: nodejs-clr/src/nodejs/dns/Resolver.cs
 */
import type { ResolverOptions, ResolveOptions } from "./options.ts";
import {
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

  constructor(options: ResolverOptions | null = null) {
    this._options = options;
  }

  /** Cancel all outstanding DNS queries made by this resolver. */
  public cancel(): void {
    this._cancelled = true;
  }

  /** Returns an array of IP address strings currently configured for DNS resolution. */
  public getServers(): Array<string> {
    // TODO: delegate to dns.getServers()
    return [];
  }

  /** Sets the IP address and port of servers to be used when performing DNS resolution. */
  public setServers(servers: Array<string>): void {
    // TODO: delegate to dns.setServers()
  }

  /** The resolver instance will send its requests from the specified IP address. */
  public setLocalAddress(ipv4: string | null = null, ipv6: string | null = null): void {
    // TODO: stub -- .NET doesn't support setting local address for DNS queries
  }

  /** Uses the DNS protocol to resolve a host name. */
  public resolve(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolve()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve IPv4 addresses (A records). */
  public resolve4(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolve4()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve IPv4 addresses with options. */
  public resolve4WithOptions(hostname: string, options: ResolveOptions, callback: (err: Error | null, result: object) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolve4() with options
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve IPv6 addresses (AAAA records). */
  public resolve6(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolve6()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve IPv6 addresses with options. */
  public resolve6WithOptions(hostname: string, options: ResolveOptions, callback: (err: Error | null, result: object) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolve6() with options
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve all records (ANY query). */
  public resolveAny(hostname: string, callback: (err: Error | null, records: Array<object>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveAny()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve CAA records. */
  public resolveCaa(hostname: string, callback: (err: Error | null, records: Array<CaaRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveCaa()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve CNAME records. */
  public resolveCname(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveCname()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve MX records. */
  public resolveMx(hostname: string, callback: (err: Error | null, records: Array<MxRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveMx()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve NAPTR records. */
  public resolveNaptr(hostname: string, callback: (err: Error | null, records: Array<NaptrRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveNaptr()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve NS records. */
  public resolveNs(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveNs()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve PTR records. */
  public resolvePtr(hostname: string, callback: (err: Error | null, addresses: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolvePtr()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve SOA record. */
  public resolveSoa(hostname: string, callback: (err: Error | null, record: SoaRecord) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), new SoaRecord());
      return;
    }
    // TODO: delegate to dns.resolveSoa()
  }

  /** Uses the DNS protocol to resolve SRV records. */
  public resolveSrv(hostname: string, callback: (err: Error | null, records: Array<SrvRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveSrv()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve TLSA records. */
  public resolveTlsa(hostname: string, callback: (err: Error | null, records: Array<TlsaRecord>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveTlsa()
    callback(null, []);
  }

  /** Uses the DNS protocol to resolve TXT records. */
  public resolveTxt(hostname: string, callback: (err: Error | null, records: Array<Array<string>>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.resolveTxt()
    callback(null, []);
  }

  /** Performs a reverse DNS query. */
  public reverse(ip: string, callback: (err: Error | null, hostnames: Array<string>) => void): void {
    if (this._cancelled) {
      callback(new Error("ECANCELLED"), []);
      return;
    }
    // TODO: delegate to dns.reverse()
    callback(null, []);
  }
}
