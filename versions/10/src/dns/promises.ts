/**
 * Promise-based DNS APIs.
 *
 * Baseline: nodejs-clr/src/nodejs/dns/promises.cs
 */
import type { int, JsValue } from "@tsonic/core/types.js";
import { LookupAddress, LookupOptions } from "./options.ts";
import {
  SoaRecord,
  type CaaRecord,
  type MxRecord,
  type NaptrRecord,
  type SrvRecord,
  type TlsaRecord,
} from "./records.ts";

/**
 * Result of a lookupService call.
 */
export class LookupServiceResult {
  public hostname: string = "";
  public service: string = "";
}

/**
 * Promise-based wrappers over dns callback APIs.
 */
export class DnsPromises {
  public lookup(hostname: string, options: LookupOptions | null = null): Promise<LookupAddress> {
    // TODO: delegate to dns.lookup via promise wrapper
    return Promise.resolve(new LookupAddress());
  }

  public lookupAll(hostname: string, options: LookupOptions | null = null): Promise<Array<LookupAddress>> {
    // TODO: delegate to dns.lookup with all=true via promise wrapper
    return Promise.resolve([] as Array<LookupAddress>);
  }

  public lookupService(address: string, port: int): Promise<LookupServiceResult> {
    // TODO: delegate to dns.lookupService via promise wrapper
    return Promise.resolve(new LookupServiceResult());
  }

  public resolve(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolve via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolveWithRrtype(hostname: string, rrtype: string): Promise<JsValue> {
    // TODO: delegate to dns.resolve with rrtype via promise wrapper
    return Promise.resolve(null);
  }

  public resolve4(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolve4 via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolve6(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolve6 via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolveCname(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolveCname via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolveCaa(hostname: string): Promise<Array<CaaRecord>> {
    // TODO: delegate to dns.resolveCaa via promise wrapper
    return Promise.resolve([] as Array<CaaRecord>);
  }

  public resolveMx(hostname: string): Promise<Array<MxRecord>> {
    // TODO: delegate to dns.resolveMx via promise wrapper
    return Promise.resolve([] as Array<MxRecord>);
  }

  public resolveNaptr(hostname: string): Promise<Array<NaptrRecord>> {
    // TODO: delegate to dns.resolveNaptr via promise wrapper
    return Promise.resolve([] as Array<NaptrRecord>);
  }

  public resolveNs(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolveNs via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolvePtr(hostname: string): Promise<Array<string>> {
    // TODO: delegate to dns.resolvePtr via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public resolveSoa(hostname: string): Promise<SoaRecord> {
    // TODO: delegate to dns.resolveSoa via promise wrapper
    return Promise.resolve(new SoaRecord());
  }

  public resolveSrv(hostname: string): Promise<Array<SrvRecord>> {
    // TODO: delegate to dns.resolveSrv via promise wrapper
    return Promise.resolve([] as Array<SrvRecord>);
  }

  public resolveTlsa(hostname: string): Promise<Array<TlsaRecord>> {
    // TODO: delegate to dns.resolveTlsa via promise wrapper
    return Promise.resolve([] as Array<TlsaRecord>);
  }

  public resolveTxt(hostname: string): Promise<Array<Array<string>>> {
    // TODO: delegate to dns.resolveTxt via promise wrapper
    return Promise.resolve([] as Array<Array<string>>);
  }

  public resolveAny(hostname: string): Promise<Array<JsValue>> {
    // TODO: delegate to dns.resolveAny via promise wrapper
    return Promise.resolve([] as Array<JsValue>);
  }

  public reverse(ip: string): Promise<Array<string>> {
    // TODO: delegate to dns.reverse via promise wrapper
    return Promise.resolve([] as Array<string>);
  }

  public getDefaultResultOrder(): string {
    // TODO: delegate to dns.getDefaultResultOrder()
    return "verbatim";
  }

  public setDefaultResultOrder(order: string): void {
    // TODO: delegate to dns.setDefaultResultOrder()
  }

  public getServers(): Array<string> {
    // TODO: delegate to dns.getServers()
    return [] as Array<string>;
  }

  public setServers(servers: Array<string>): void {
    // TODO: delegate to dns.setServers()
  }
}
