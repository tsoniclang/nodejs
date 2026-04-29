/**
 * Node.js crypto DSA key objects.
 *
 */
import { KeyObject } from "./key-object.ts";
import type { int } from "@tsonic/core/types.js";
import type { KeyExportOptions, KeyExportValue } from "./key-object.ts";

/**
 * Represents a DSA public key.
 */
export class DSAPublicKeyObject extends KeyObject {
  _publicKeyData: KeyExportValue;

  constructor(publicKeyData: KeyExportValue) {
    super();
    this._publicKeyData = publicKeyData;
  }

  get type(): string {
    return "public";
  }

  get asymmetricKeyType(): string | null {
    return "dsa";
  }

  get symmetricKeySize(): int | null {
    return null;
  }

  exportCore(_options?: KeyExportOptions): KeyExportValue {
    return this._publicKeyData;
  }
}

/**
 * Represents a DSA private key.
 */
export class DSAPrivateKeyObject extends KeyObject {
  _privateKeyData: KeyExportValue;

  constructor(privateKeyData: KeyExportValue) {
    super();
    this._privateKeyData = privateKeyData;
  }

  get type(): string {
    return "private";
  }

  get asymmetricKeyType(): string | null {
    return "dsa";
  }

  get symmetricKeySize(): int | null {
    return null;
  }

  exportCore(_options?: KeyExportOptions): KeyExportValue {
    return this._privateKeyData;
  }
}
