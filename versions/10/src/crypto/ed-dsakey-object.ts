/**
 * Node.js crypto EdDSA key objects.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/EdDSAKeyObject.cs
 */
import { KeyObject } from "./key-object.ts";
import type { int } from "@tsonic/core/types.js";

/**
 * Represents an EdDSA public key.
 */
export class EdDSAPublicKeyObject extends KeyObject {
  private readonly _publicKeyData: unknown;
  private readonly _keyType: string;

  public constructor(publicKeyData: unknown, keyType: string) {
    super();
    this._publicKeyData = publicKeyData;
    this._keyType = keyType;
  }

  public get type(): string {
    return "public";
  }

  public get asymmetricKeyType(): string {
    return this._keyType;
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: unknown): unknown {
    // TODO: actual EdDSA public key export in PEM/DER format
    return this._publicKeyData;
  }
}

/**
 * Represents an EdDSA private key.
 */
export class EdDSAPrivateKeyObject extends KeyObject {
  private readonly _privateKeyData: unknown;
  private readonly _keyType: string;

  public constructor(privateKeyData: unknown, keyType: string) {
    super();
    this._privateKeyData = privateKeyData;
    this._keyType = keyType;
  }

  public get type(): string {
    return "private";
  }

  public get asymmetricKeyType(): string {
    return this._keyType;
  }

  public get symmetricKeySize(): int | null {
    return null;
  }

  protected exportCore(_options?: unknown): unknown {
    // TODO: actual EdDSA private key export in PEM/DER format
    return this._privateKeyData;
  }
}
