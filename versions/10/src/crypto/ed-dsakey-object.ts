/**
 * Node.js crypto EdDSA key objects.
 *
 */
import { KeyObject } from "./key-object.ts";
import type { int, JsValue } from "@tsonic/core/types.js";

/**
 * Represents an EdDSA public key.
 */
export class EdDSAPublicKeyObject extends KeyObject {
  private readonly _publicKeyData: JsValue;
  private readonly _keyType: string;

  public constructor(publicKeyData: JsValue, keyType: string) {
    super();
    this._publicKeyData = publicKeyData;
    this._keyType = keyType;
  }

  public get type(): string {
    return "public";
  }

  public get asymmetricKeyType(): string | null {
    return this._keyType;
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: JsValue): JsValue {
    // TODO: actual EdDSA public key export in PEM/DER format
    return this._publicKeyData;
  }
}

/**
 * Represents an EdDSA private key.
 */
export class EdDSAPrivateKeyObject extends KeyObject {
  private readonly _privateKeyData: JsValue;
  private readonly _keyType: string;

  public constructor(privateKeyData: JsValue, keyType: string) {
    super();
    this._privateKeyData = privateKeyData;
    this._keyType = keyType;
  }

  public get type(): string {
    return "private";
  }

  public get asymmetricKeyType(): string | null {
    return this._keyType;
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: JsValue): JsValue {
    // TODO: actual EdDSA private key export in PEM/DER format
    return this._privateKeyData;
  }
}
