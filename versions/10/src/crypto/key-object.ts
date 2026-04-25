/**
 * Node.js crypto KeyObject types.
 *
 */
import type { int, out, JsValue } from "@tsonic/core/types.js";
import {
  DSA,
  ECDsa,
  RSA,
} from "@tsonic/dotnet/System.Security.Cryptography.js";
import {
  createDsaAlgorithm,
  createRsaAlgorithm,
  curveFromName,
  toReadOnlyByteSpan,
} from "./crypto-helpers.ts";
import { base64ToBytes } from "../buffer/buffer-encoding.ts";

export type NativeAsymmetricKey = RSA | DSA | ECDsa | null;

export const isRsaKey = (value: NativeAsymmetricKey): value is RSA =>
  value instanceof RSA;

export const isDsaKey = (value: NativeAsymmetricKey): value is DSA =>
  value instanceof DSA;

export const isEcDsaKey = (value: NativeAsymmetricKey): value is ECDsa =>
  value instanceof ECDsa;

/**
 * Represents a cryptographic key.
 */
export class KeyObject {
  protected constructor() {}

  /**
   * The type of the key: 'secret', 'public', or 'private'.
   */
  public get type(): string {
    throw new Error("KeyObject.type must be implemented by a subclass");
  }

  /**
   * For asymmetric keys, this property returns the type of the key (e.g., 'rsa', 'ec', 'ed25519').
   * For secret keys, this property is undefined.
   */
  public get asymmetricKeyType(): string | null {
    throw new Error(
      "KeyObject.asymmetricKeyType must be implemented by a subclass",
    );
  }

  /**
   * For secret keys, this property returns the size of the key in bytes.
   * For asymmetric keys, this property is undefined.
   */
  public get symmetricKeySize(): int | null {
    throw new Error(
      "KeyObject.symmetricKeySize must be implemented by a subclass",
    );
  }

  public ["export"](options?: JsValue): JsValue {
    return this.exportCore(options);
  }

  protected exportCore(_options?: JsValue): JsValue {
    throw new Error("KeyObject.exportCore must be implemented by a subclass");
  }
}

/**
 * Represents a secret (symmetric) key.
 */
export class SecretKeyObject extends KeyObject {
  private readonly _keyData: Uint8Array;

  public constructor(keyData: Uint8Array) {
    super();
    this._keyData = keyData;
  }

  public get type(): string {
    return "secret";
  }

  public get asymmetricKeyType(): string | null {
    return null;
  }

  public get symmetricKeySize(): int | null {
    return this._keyData.length;
  }

  public ["export"](_options?: JsValue): Uint8Array {
    return this._keyData;
  }

  protected exportCore(_options?: JsValue): Uint8Array {
    return this._keyData;
  }
}

/**
 * Represents a public key.
 */
export class PublicKeyObject extends KeyObject {
  private readonly _keyType: string;
  private readonly _keyData: NativeAsymmetricKey;
  private readonly _pem: string | null;

  public constructor(
    keyData: NativeAsymmetricKey,
    keyType: string,
    pem: string | null = null
  ) {
    super();
    this._keyData = keyData;
    this._keyType = keyType;
    this._pem = pem;
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

  public get nativeKeyData(): NativeAsymmetricKey {
    return this._keyData;
  }

  public get pem(): string | null {
    return this._pem;
  }

  protected exportCore(_options?: JsValue): JsValue {
    if (this._pem !== null) {
      return this._pem;
    }

    return this._keyData;
  }

  public exportFormatted(format: string, _type?: string): string {
    if (this._pem !== null && format.toLowerCase() === "pem") {
      return this._pem;
    }

    throw new Error("PublicKeyObject.exportFormatted is only supported for PEM keys");
  }
}

/**
 * Represents a private key.
 */
export class PrivateKeyObject extends KeyObject {
  private readonly _keyType: string;
  private readonly _keyData: NativeAsymmetricKey;
  private readonly _pem: string | null;
  private readonly _publicKeyData: NativeAsymmetricKey;
  private readonly _publicPem: string | null;

  public constructor(
    keyData: NativeAsymmetricKey,
    keyType: string,
    pem: string | null = null,
    publicKeyData: NativeAsymmetricKey = null,
    publicPem: string | null = null,
  ) {
    super();
    this._keyData = keyData;
    this._keyType = keyType;
    this._pem = pem;
    this._publicKeyData = publicKeyData;
    this._publicPem = publicPem;
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

  public get nativeKeyData(): NativeAsymmetricKey {
    return this._keyData;
  }

  public get pem(): string | null {
    return this._pem;
  }

  public get publicKeyData(): NativeAsymmetricKey {
    return this._publicKeyData;
  }

  public get publicPem(): string | null {
    return this._publicPem;
  }

  protected exportCore(_options?: JsValue): JsValue {
    if (this._pem !== null) {
      return this._pem;
    }

    return this._keyData;
  }

  public exportFormatted(
    format: string,
    _type?: string,
    _cipher?: string,
    _passphrase?: string
  ): string {
    if (this._pem !== null && format.toLowerCase() === "pem") {
      return this._pem;
    }

    throw new Error("PrivateKeyObject.exportFormatted is only supported for PEM keys");
  }
}

const stripPemBody = (value: string): string => {
  let body = "";
  let currentLine = "";
  for (let index = 0; index <= value.length; index += 1) {
    const char = index === value.length ? "\n" : value.charAt(index);
    if (char !== "\n" && char !== "\r") {
      currentLine += char;
      continue;
    }

    const line = currentLine.trim();
    currentLine = "";
    if (line.length === 0 || line.startsWith("-----")) {
      continue;
    }
    body += line;
  }
  return body;
};

const pemToBytes = (pem: string): Uint8Array => {
  return base64ToBytes(stripPemBody(pem));
};

const emptyPlaceholderPublicKey = (): PublicKeyObject => {
  return new PublicKeyObject(null, "rsa");
};

const emptyPlaceholderPrivateKey = (): PrivateKeyObject => {
  return new PrivateKeyObject(null, "rsa");
};

const isStringOrBytesKey = (
  key: string | Uint8Array | KeyObject,
): key is string | Uint8Array => {
  return typeof key === "string" || key instanceof Uint8Array;
};

const tryImportRsaPublic = (
  bytes: Uint8Array,
  pem: string | null,
): PublicKeyObject | null => {
  try {
    const rsa = createRsaAlgorithm();
    rsa.ImportSubjectPublicKeyInfo(toReadOnlyByteSpan(bytes), 0 as out<int>);
    return new PublicKeyObject(rsa, "rsa", pem);
  } catch {
    return null;
  }
};

const tryImportDsaPublic = (
  bytes: Uint8Array,
  pem: string | null,
): PublicKeyObject | null => {
  try {
    const dsa = createDsaAlgorithm();
    dsa.ImportSubjectPublicKeyInfo(toReadOnlyByteSpan(bytes), 0 as out<int>);
    return new PublicKeyObject(dsa, "dsa", pem);
  } catch {
    return null;
  }
};

const tryImportEcPublic = (
  bytes: Uint8Array,
  pem: string | null,
): PublicKeyObject | null => {
  try {
    const ec = ECDsa.Create(curveFromName("secp256r1"));
    ec.ImportSubjectPublicKeyInfo(toReadOnlyByteSpan(bytes), 0 as out<int>);
    return new PublicKeyObject(ec, "ec", pem);
  } catch {
    return null;
  }
};

const tryImportRsaPrivate = (
  bytes: Uint8Array,
  pem: string | null,
): PrivateKeyObject | null => {
  try {
    const rsa = createRsaAlgorithm();
    rsa.ImportPkcs8PrivateKey(toReadOnlyByteSpan(bytes), 0 as out<int>);
    const publicRsa = createRsaAlgorithm();
    publicRsa.ImportParameters(rsa.ExportParameters(false));
    return new PrivateKeyObject(rsa, "rsa", pem, publicRsa, null);
  } catch {
    return null;
  }
};

const tryImportDsaPrivate = (
  bytes: Uint8Array,
  pem: string | null,
): PrivateKeyObject | null => {
  try {
    const dsa = createDsaAlgorithm();
    dsa.ImportPkcs8PrivateKey(toReadOnlyByteSpan(bytes), 0 as out<int>);
    const publicDsa = createDsaAlgorithm();
    publicDsa.ImportParameters(dsa.ExportParameters(false));
    return new PrivateKeyObject(dsa, "dsa", pem, publicDsa, null);
  } catch {
    return null;
  }
};

const tryImportEcPrivate = (
  bytes: Uint8Array,
  pem: string | null,
): PrivateKeyObject | null => {
  try {
    const ec = ECDsa.Create(curveFromName("secp256r1"));
    ec.ImportPkcs8PrivateKey(toReadOnlyByteSpan(bytes), 0 as out<int>);
    const publicEc = ECDsa.Create(curveFromName("secp256r1"));
    publicEc.ImportSubjectPublicKeyInfo(
      toReadOnlyByteSpan(ec.ExportSubjectPublicKeyInfo()),
      0 as out<int>,
    );
    return new PrivateKeyObject(ec, "ec", pem, publicEc, null);
  } catch {
    return null;
  }
};

export const importPublicKey = (
  key: string | Uint8Array,
): PublicKeyObject => {
  const pem = typeof key === "string" ? key : null;
  const bytes = typeof key === "string" ? pemToBytes(key) : key;

  if (bytes.length === 0) {
    return emptyPlaceholderPublicKey();
  }

  const rsa = tryImportRsaPublic(bytes, pem);
  if (rsa !== null) {
    return rsa;
  }

  const dsa = tryImportDsaPublic(bytes, pem);
  if (dsa !== null) {
    return dsa;
  }

  const ec = tryImportEcPublic(bytes, pem);
  if (ec !== null) {
    return ec;
  }

  throw new Error("Unsupported public key format");
};

export const importPrivateKey = (
  key: string | Uint8Array,
): PrivateKeyObject => {
  const pem = typeof key === "string" ? key : null;
  const bytes = typeof key === "string" ? pemToBytes(key) : key;

  if (bytes.length === 0) {
    return emptyPlaceholderPrivateKey();
  }

  const rsa = tryImportRsaPrivate(bytes, pem);
  if (rsa !== null) {
    return rsa;
  }

  const dsa = tryImportDsaPrivate(bytes, pem);
  if (dsa !== null) {
    return dsa;
  }

  const ec = tryImportEcPrivate(bytes, pem);
  if (ec !== null) {
    return ec;
  }

  throw new Error("Unsupported private key format");
};

export const extractPublicKey = (
  key: PrivateKeyObject,
): PublicKeyObject => {
  const publicKeyData = key.publicKeyData;
  if (publicKeyData !== null && publicKeyData !== undefined) {
    return new PublicKeyObject(publicKeyData, key.asymmetricKeyType, key.publicPem);
  }

  const nativeKeyData = key.nativeKeyData;
  if (isRsaKey(nativeKeyData)) {
    const publicRsa = createRsaAlgorithm();
    publicRsa.ImportParameters(nativeKeyData.ExportParameters(false));
    return new PublicKeyObject(publicRsa, "rsa", key.publicPem);
  }

  if (isDsaKey(nativeKeyData)) {
    const publicDsa = createDsaAlgorithm();
    publicDsa.ImportParameters(nativeKeyData.ExportParameters(false));
    return new PublicKeyObject(publicDsa, "dsa", key.publicPem);
  }

  if (isEcDsaKey(nativeKeyData)) {
    const publicEc = ECDsa.Create(curveFromName("secp256r1"));
    publicEc.ImportSubjectPublicKeyInfo(
      toReadOnlyByteSpan(nativeKeyData.ExportSubjectPublicKeyInfo()),
      0 as out<int>,
    );
    return new PublicKeyObject(publicEc, "ec", key.publicPem);
  }

  return new PublicKeyObject(null, key.asymmetricKeyType ?? "rsa", key.publicPem);
};

export const coercePublicKeyObject = (
  key: string | Uint8Array | KeyObject,
): PublicKeyObject => {
  if (isStringOrBytesKey(key)) {
    return importPublicKey(key);
  }

  if (key instanceof PublicKeyObject) {
    return key;
  }

  if (key instanceof PrivateKeyObject) {
    return extractPublicKey(key);
  }

  if (key instanceof KeyObject) {
    if (key.type === "public") {
      return new PublicKeyObject(null, key.asymmetricKeyType ?? "rsa");
    }

    throw new Error("Key must be a private or public key");
  }

  throw new Error("Unexpected key shape");
};

export const coercePrivateKeyObject = (
  key: string | Uint8Array | KeyObject,
): PrivateKeyObject => {
  if (isStringOrBytesKey(key)) {
    return importPrivateKey(key);
  }

  if (key instanceof PrivateKeyObject) {
    return key;
  }

  if (key instanceof PublicKeyObject) {
    throw new Error("Key must be a private key");
  }

  if (key instanceof KeyObject) {
    throw new Error("Key must be a private key");
  }

  throw new Error("Unexpected key shape");
};
