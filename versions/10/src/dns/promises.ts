/**
 * Promise-based DNS APIs.
 *
 */
import type { int, JsValue } from "@tsonic/core/types.js";
import * as dns from "./index.ts";
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
    return new Promise((resolve, reject) => {
      dns.lookup(hostname, options, (err, address, family) => {
        if (err !== null) {
          reject(err);
          return;
        }

        const result = new LookupAddress();
        result.address = address;
        result.family = family;
        resolve(result);
      });
    });
  }

  public lookupAll(hostname: string, options: LookupOptions | null = null): Promise<Array<LookupAddress>> {
    return new Promise((resolve, reject) => {
      dns.lookupAll(hostname, options, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public lookupService(address: string, port: int): Promise<LookupServiceResult> {
    return new Promise((resolve, reject) => {
      dns.lookupService(address, port, (err, hostname, service) => {
        if (err !== null) {
          reject(err);
          return;
        }

        const result = new LookupServiceResult();
        result.hostname = hostname;
        result.service = service;
        resolve(result);
      });
    });
  }

  public resolve(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolve(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolveWithRrtype(hostname: string, rrtype: string): Promise<JsValue> {
    return new Promise((resolve, reject) => {
      dns.resolveWithRrtype(hostname, rrtype, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolve4(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolve4(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolve6(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolve6(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolveCname(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolveCname(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolveCaa(hostname: string): Promise<Array<CaaRecord>> {
    return new Promise((resolve, reject) => {
      dns.resolveCaa(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveMx(hostname: string): Promise<Array<MxRecord>> {
    return new Promise((resolve, reject) => {
      dns.resolveMx(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveNaptr(hostname: string): Promise<Array<NaptrRecord>> {
    return new Promise((resolve, reject) => {
      dns.resolveNaptr(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveNs(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolveNs(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolvePtr(hostname: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.resolvePtr(hostname, (err, addresses) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(addresses);
      });
    });
  }

  public resolveSoa(hostname: string): Promise<SoaRecord> {
    return new Promise((resolve, reject) => {
      dns.resolveSoa(hostname, (err, record) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(record);
      });
    });
  }

  public resolveSrv(hostname: string): Promise<Array<SrvRecord>> {
    return new Promise((resolve, reject) => {
      dns.resolveSrv(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveTlsa(hostname: string): Promise<Array<TlsaRecord>> {
    return new Promise((resolve, reject) => {
      dns.resolveTlsa(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveTxt(hostname: string): Promise<Array<Array<string>>> {
    return new Promise((resolve, reject) => {
      dns.resolveTxt(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public resolveAny(hostname: string): Promise<Array<JsValue>> {
    return new Promise((resolve, reject) => {
      dns.resolveAny(hostname, (err, records) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(records);
      });
    });
  }

  public reverse(ip: string): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      dns.reverse(ip, (err, hostnames) => {
        if (err !== null) {
          reject(err);
          return;
        }

        resolve(hostnames);
      });
    });
  }

  public getDefaultResultOrder(): string {
    return dns.getDefaultResultOrder();
  }

  public setDefaultResultOrder(order: string): void {
    dns.setDefaultResultOrder(order);
  }

  public getServers(): Array<string> {
    return dns.getServers();
  }

  public setServers(servers: Array<string>): void {
    dns.setServers(servers);
  }
}
