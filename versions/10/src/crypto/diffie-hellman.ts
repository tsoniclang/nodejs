import { overloads as O } from "@tsonic/core/lang.js";
import {
  decodeInputBytes,
  encodeOutputBytes,
  encodeOutputString,
  modPowBytes,
  numberToBytes,
  randomBytesExact,
  randomUnsignedLessThan,
} from "./crypto-helpers.ts";

function toDiffieHellmanPublicKeyBytes(
  otherPublicKey: string | Uint8Array,
  inputEncoding?: string,
): Uint8Array {
  if (typeof otherPublicKey === "string") {
    return decodeInputBytes(otherPublicKey, inputEncoding ?? "base64");
  }

  return otherPublicKey;
}

const encodeDiffieHellmanSecret = (
  secret: Uint8Array,
  outputEncoding?: string,
): string => {
  return encodeOutputString(secret, outputEncoding ?? "base64");
};

const resolveDiffieHellmanPrimeByteLength = (primeLength: number): number => {
  return primeLength > 7 ? primeLength / 8 : 1;
};

const resolveDiffieHellmanGeneratorBytes = (
  generatorOrValue?: Uint8Array | number,
): Uint8Array => {
  if (generatorOrValue === undefined) {
    return numberToBytes(2);
  }

  if (typeof generatorOrValue === "number") {
    return numberToBytes(generatorOrValue);
  }

  return generatorOrValue;
};

/**
 * Node.js crypto DiffieHellman class.
 *
 * Baseline: nodejs-clr/src/nodejs/crypto/DiffieHellman.cs
 */

/**
 * The DiffieHellman class is a utility for creating Diffie-Hellman key exchanges.
 */
export class DiffieHellman {
  private readonly _prime: Uint8Array;
  private readonly _generator: Uint8Array;
  private _privateKey: Uint8Array | null = null;
  private _publicKey: Uint8Array | null = null;

  public constructor(
    primeOrLength: Uint8Array | number,
    generatorOrValue?: Uint8Array | number
  ) {
    if (typeof primeOrLength === "number") {
      const byteLength = resolveDiffieHellmanPrimeByteLength(primeOrLength);
      this._prime = randomBytesExact(byteLength);
      this._prime[0] = this._prime[0]! | 0x80;
      this._prime[this._prime.length - 1] = this._prime[this._prime.length - 1]! | 0x01;
      this._generator = resolveDiffieHellmanGeneratorBytes(generatorOrValue);
    } else {
      this._prime = primeOrLength;
      this._generator = resolveDiffieHellmanGeneratorBytes(generatorOrValue);
    }
  }

  /**
   * Generates private and public Diffie-Hellman key values.
   */
  public generateKeys(encoding?: undefined): Uint8Array;
  public generateKeys(encoding: string): string;
  public generateKeys(_encoding?: any): any {
    throw new Error("stub");
  }

  public generateKeys_bytes(_encoding?: undefined): Uint8Array {
    return this.generateKeysBytes();
  }

  public generateKeys_string(encoding: string): string {
    return encodeOutputBytes(this.generateKeysBytes(), encoding) as string;
  }

  /**
   * Computes the shared secret using the other party's public key.
   */
  public computeSecret(
    otherPublicKey: string,
    inputEncoding?: string,
    outputEncoding?: string
  ): string;
  public computeSecret(otherPublicKey: Uint8Array, outputEncoding?: undefined): Uint8Array;
  public computeSecret(otherPublicKey: Uint8Array, outputEncoding: string): string;
  public computeSecret(
    otherPublicKey: string | Uint8Array,
    inputOrOutputEncoding?: string,
    outputEncoding?: string
  ): any {
    throw new Error("stub");
  }

  public computeSecret_string(
    otherPublicKey: string,
    inputEncoding?: string,
    outputEncoding?: string
  ): string {
    return encodeDiffieHellmanSecret(
      this.computeSecretBytes(
        toDiffieHellmanPublicKeyBytes(otherPublicKey, inputEncoding),
      ),
      outputEncoding,
    );
  }

  public computeSecret_bytes(
    otherPublicKey: Uint8Array,
    _outputEncoding?: undefined
  ): Uint8Array {
    return this.computeSecretBytes(otherPublicKey);
  }

  public computeSecret_bytes_string(
    otherPublicKey: Uint8Array,
    outputEncoding: string
  ): string {
    return encodeOutputString(
      this.computeSecretBytes(otherPublicKey),
      outputEncoding,
    );
  }

  /**
   * Returns the Diffie-Hellman prime.
   */
  public getPrime(encoding?: undefined): Uint8Array;
  public getPrime(encoding: string): string;
  public getPrime(_encoding?: any): any {
    throw new Error("stub");
  }

  public getPrime_bytes(_encoding?: undefined): Uint8Array {
    return this._prime;
  }

  public getPrime_string(encoding: string): string {
    return encodeOutputBytes(this._prime, encoding) as string;
  }

  /**
   * Returns the Diffie-Hellman generator.
   */
  public getGenerator(encoding?: undefined): Uint8Array;
  public getGenerator(encoding: string): string;
  public getGenerator(_encoding?: any): any {
    throw new Error("stub");
  }

  public getGenerator_bytes(_encoding?: undefined): Uint8Array {
    return this._generator;
  }

  public getGenerator_string(encoding: string): string {
    return encodeOutputBytes(this._generator, encoding) as string;
  }

  /**
   * Returns the Diffie-Hellman public key.
   */
  public getPublicKey(encoding?: undefined): Uint8Array;
  public getPublicKey(encoding: string): string;
  public getPublicKey(_encoding?: any): any {
    throw new Error("stub");
  }

  public getPublicKey_bytes(_encoding?: undefined): Uint8Array {
    return this.requirePublicKey();
  }

  public getPublicKey_string(encoding: string): string {
    return encodeOutputBytes(this.requirePublicKey(), encoding) as string;
  }

  /**
   * Returns the Diffie-Hellman private key.
   */
  public getPrivateKey(encoding?: undefined): Uint8Array;
  public getPrivateKey(encoding: string): string;
  public getPrivateKey(_encoding?: any): any {
    throw new Error("stub");
  }

  public getPrivateKey_bytes(_encoding?: undefined): Uint8Array {
    return this.requirePrivateKey();
  }

  public getPrivateKey_string(encoding: string): string {
    return encodeOutputBytes(this.requirePrivateKey(), encoding) as string;
  }

  /**
   * Sets the Diffie-Hellman public key.
   */
  public setPublicKey(publicKey: string, encoding?: string): void;
  public setPublicKey(publicKey: Uint8Array): void;
  public setPublicKey(_publicKey: any, _encoding?: any): any {
    throw new Error("stub");
  }

  public setPublicKey_string(publicKey: string, encoding?: string): void {
    this._publicKey = decodeInputBytes(publicKey, encoding ?? "base64");
  }

  public setPublicKey_bytes(publicKey: Uint8Array): void {
    this._publicKey = publicKey;
  }

  /**
   * Sets the Diffie-Hellman private key.
   */
  public setPrivateKey(privateKey: string, encoding?: string): void;
  public setPrivateKey(privateKey: Uint8Array): void;
  public setPrivateKey(_privateKey: any, _encoding?: any): any {
    throw new Error("stub");
  }

  public setPrivateKey_string(privateKey: string, encoding?: string): void {
    this.setPrivateKeyBytes(decodeInputBytes(privateKey, encoding ?? "base64"));
  }

  public setPrivateKey_bytes(privateKey: Uint8Array): void {
    this.setPrivateKeyBytes(privateKey);
  }

  private generateKeysBytes(): Uint8Array {
    this._privateKey = randomUnsignedLessThan(this._prime);
    this._publicKey = modPowBytes(
      this._generator,
      this._privateKey,
      this._prime,
      this._prime.length,
    );
    return this._publicKey;
  }

  private computeSecretBytes(otherPublicKey: Uint8Array): Uint8Array {
    if (this._privateKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    return modPowBytes(
      otherPublicKey,
      this._privateKey,
      this._prime,
      this._prime.length,
    );
  }

  private requirePublicKey(): Uint8Array {
    if (this._publicKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    return this._publicKey;
  }

  private requirePrivateKey(): Uint8Array {
    if (this._privateKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    return this._privateKey;
  }

  private setPrivateKeyBytes(privateKey: Uint8Array): void {
    this._privateKey = privateKey;
    this._publicKey = modPowBytes(
      this._generator,
      this._privateKey,
      this._prime,
      this._prime.length,
    );
  }

  /**
   * Returns the DH validation error code.
   */
  public getVerifyError(): number {
    return 0;
  }
}

O<DiffieHellman>().method(x => x.generateKeys_bytes).family(x => x.generateKeys);
O<DiffieHellman>().method(x => x.generateKeys_string).family(x => x.generateKeys);
O<DiffieHellman>().method(x => x.computeSecret_string).family(x => x.computeSecret);
O<DiffieHellman>().method(x => x.computeSecret_bytes).family(x => x.computeSecret);
O<DiffieHellman>().method(x => x.computeSecret_bytes_string).family(x => x.computeSecret);
O<DiffieHellman>().method(x => x.getPrime_bytes).family(x => x.getPrime);
O<DiffieHellman>().method(x => x.getPrime_string).family(x => x.getPrime);
O<DiffieHellman>().method(x => x.getGenerator_bytes).family(x => x.getGenerator);
O<DiffieHellman>().method(x => x.getGenerator_string).family(x => x.getGenerator);
O<DiffieHellman>().method(x => x.getPublicKey_bytes).family(x => x.getPublicKey);
O<DiffieHellman>().method(x => x.getPublicKey_string).family(x => x.getPublicKey);
O<DiffieHellman>().method(x => x.getPrivateKey_bytes).family(x => x.getPrivateKey);
O<DiffieHellman>().method(x => x.getPrivateKey_string).family(x => x.getPrivateKey);
O<DiffieHellman>().method(x => x.setPublicKey_string).family(x => x.setPublicKey);
O<DiffieHellman>().method(x => x.setPublicKey_bytes).family(x => x.setPublicKey);
O<DiffieHellman>().method(x => x.setPrivateKey_string).family(x => x.setPrivateKey);
O<DiffieHellman>().method(x => x.setPrivateKey_bytes).family(x => x.setPrivateKey);
