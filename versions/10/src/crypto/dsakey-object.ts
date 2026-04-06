/**
 * Node.js crypto DSA key objects.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/DSAKeyObject.cs
 */
import { KeyObject } from "./key-object.ts";
import type { int, JsValue } from "@tsonic/core/types.js";

/**
 * Represents a DSA public key.
 */
export class DSAPublicKeyObject extends KeyObject {
  private readonly _publicKeyData: JsValue;

  public constructor(publicKeyData: JsValue) {
    super();
    this._publicKeyData = publicKeyData;
  }

  public get type(): string {
    return "public";
  }

  public get asymmetricKeyType(): string {
    return "dsa";
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: JsValue): JsValue {
    // TODO: actual DSA public key export in PEM/DER format
    return this._publicKeyData;
  }
}

/**
 * Represents a DSA private key.
 */
export class DSAPrivateKeyObject extends KeyObject {
  private readonly _privateKeyData: JsValue;

  public constructor(privateKeyData: JsValue) {
    super();
    this._privateKeyData = privateKeyData;
  }

  public get type(): string {
    return "private";
  }

  public get asymmetricKeyType(): string {
    return "dsa";
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: JsValue): JsValue {
    // TODO: actual DSA private key export in PEM/DER format
    return this._privateKeyData;
  }
}
