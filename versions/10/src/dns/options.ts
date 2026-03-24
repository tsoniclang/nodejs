/**
 * DNS option types.
 *
 * Baseline: nodejs-clr/src/nodejs/dns/Options.cs
 */

/**
 * Options for DNS lookup operations.
 */
export class LookupOptions {
  /**
   * The record family. Must be 4, 6, or 0.
   * 0 indicates that either an IPv4 or IPv6 address is returned.
   * Can be a number or "IPv4" or "IPv6".
   */
  public family: number | string | null = null;

  /**
   * One or more supported getaddrinfo flags. Multiple flags may be passed by bitwise OR.
   */
  public hints: number | null = null;

  /**
   * When true, the callback returns all resolved addresses in an array.
   */
  public all: boolean | null = null;

  /**
   * The order in which to return addresses: "ipv4first", "ipv6first", or "verbatim".
   */
  public order: string | null = null;

  /**
   * When true, the callback receives IPv4 and IPv6 addresses in the order the DNS resolver returned them.
   * Deprecated in favor of order.
   */
  public verbatim: boolean | null = null;
}

/**
 * Address returned by DNS lookup.
 */
export class LookupAddress {
  /** A string representation of an IPv4 or IPv6 address. */
  public address: string = "";

  /** 4 or 6, denoting the family of address. */
  public family: number = 0;
}

/**
 * Options for DNS resolve operations with TTL support.
 */
export class ResolveOptions {
  /** When true, includes TTL (time-to-live) information in results. */
  public ttl: boolean = false;
}

/**
 * Options for creating a Resolver instance.
 */
export class ResolverOptions {
  /** Query timeout in milliseconds, or -1 to use the default timeout. */
  public timeout: number | null = null;

  /** The number of tries the resolver will try contacting each name server before giving up. */
  public tries: number | null = null;

  /** The max retry timeout, in milliseconds. */
  public maxTimeout: number | null = null;
}
