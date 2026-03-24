/**
 * DNS record types.
 *
 * Baseline: nodejs-clr/src/nodejs/dns/Records.cs
 */

/**
 * Record with TTL (time-to-live) information.
 */
export class RecordWithTtl {
  /** IP address. */
  public address: string = "";

  /** Time-to-live in seconds. */
  public ttl: number = 0;
}

/**
 * A (IPv4 address) record with type information.
 */
export class AnyARecord extends RecordWithTtl {
  /** Record type: "A". */
  public readonly type: string = "A";
}

/**
 * AAAA (IPv6 address) record with type information.
 */
export class AnyAaaaRecord extends RecordWithTtl {
  /** Record type: "AAAA". */
  public readonly type: string = "AAAA";
}

/**
 * CAA (Certification Authority Authorization) record.
 */
export class CaaRecord {
  /** Critical flag (0 or 128). */
  public critical: number = 0;

  /** Issue property. */
  public issue: string | null = null;

  /** Issue wildcard property. */
  public issuewild: string | null = null;

  /** IODEF property. */
  public iodef: string | null = null;

  /** Contact email property. */
  public contactemail: string | null = null;

  /** Contact phone property. */
  public contactphone: string | null = null;
}

/**
 * CAA record with type information.
 */
export class AnyCaaRecord extends CaaRecord {
  /** Record type: "CAA". */
  public readonly type: string = "CAA";
}

/**
 * MX (Mail Exchange) record.
 */
export class MxRecord {
  /** Mail server priority (lower is higher priority). */
  public priority: number = 0;

  /** Mail server hostname. */
  public exchange: string = "";
}

/**
 * MX record with type information.
 */
export class AnyMxRecord extends MxRecord {
  /** Record type: "MX". */
  public readonly type: string = "MX";
}

/**
 * NAPTR (Naming Authority Pointer) record.
 */
export class NaptrRecord {
  /** NAPTR flags. */
  public flags: string = "";

  /** Service specification. */
  public service: string = "";

  /** Regular expression. */
  public regexp: string = "";

  /** Replacement value. */
  public replacement: string = "";

  /** Order value. */
  public order: number = 0;

  /** Preference value. */
  public preference: number = 0;
}

/**
 * NAPTR record with type information.
 */
export class AnyNaptrRecord extends NaptrRecord {
  /** Record type: "NAPTR". */
  public readonly type: string = "NAPTR";
}

/**
 * SOA (Start of Authority) record.
 */
export class SoaRecord {
  /** Primary name server. */
  public nsname: string = "";

  /** Responsible party email. */
  public hostmaster: string = "";

  /** Serial number. */
  public serial: number = 0;

  /** Refresh interval in seconds. */
  public refresh: number = 0;

  /** Retry interval in seconds. */
  public retry: number = 0;

  /** Expire timeout in seconds. */
  public expire: number = 0;

  /** Minimum TTL in seconds. */
  public minttl: number = 0;
}

/**
 * SOA record with type information.
 */
export class AnySoaRecord extends SoaRecord {
  /** Record type: "SOA". */
  public readonly type: string = "SOA";
}

/**
 * SRV (Service) record.
 */
export class SrvRecord {
  /** Service priority. */
  public priority: number = 0;

  /** Service weight. */
  public weight: number = 0;

  /** Service port. */
  public port: number = 0;

  /** Target hostname. */
  public name: string = "";
}

/**
 * SRV record with type information.
 */
export class AnySrvRecord extends SrvRecord {
  /** Record type: "SRV". */
  public readonly type: string = "SRV";
}

/**
 * TLSA (DNS-Based Authentication of Named Entities) record.
 */
export class TlsaRecord {
  /** Certificate usage field. */
  public certUsage: number = 0;

  /** Selector field. */
  public selector: number = 0;

  /** Matching type field. */
  public match: number = 0;

  /** Certificate association data. */
  public data: Array<number> = [];
}

/**
 * TLSA record with type information.
 */
export class AnyTlsaRecord extends TlsaRecord {
  /** Record type: "TLSA". */
  public readonly type: string = "TLSA";
}

/**
 * TXT record with type information.
 */
export class AnyTxtRecord {
  /** Record type: "TXT". */
  public readonly type: string = "TXT";

  /** Text entries. */
  public entries: Array<string> = [];
}

/**
 * NS (Name Server) record with type information.
 */
export class AnyNsRecord {
  /** Record type: "NS". */
  public readonly type: string = "NS";

  /** Name server hostname. */
  public value: string = "";
}

/**
 * PTR (Pointer) record with type information.
 */
export class AnyPtrRecord {
  /** Record type: "PTR". */
  public readonly type: string = "PTR";

  /** Pointer value. */
  public value: string = "";
}

/**
 * CNAME (Canonical Name) record with type information.
 */
export class AnyCnameRecord {
  /** Record type: "CNAME". */
  public readonly type: string = "CNAME";

  /** Canonical name value. */
  public value: string = "";
}
