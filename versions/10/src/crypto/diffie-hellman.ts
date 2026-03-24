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
  otherPublicKey: string,
  inputEncoding?: string,
): Uint8Array;
function toDiffieHellmanPublicKeyBytes(
  otherPublicKey: Uint8Array,
): Uint8Array;
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

  public constructor(prime: Uint8Array, generator: Uint8Array);
  public constructor(primeLength: number);
  public constructor(primeLength: number, generator: number);
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
  public generateKeys(encoding?: string): string | Uint8Array {
    this._privateKey = randomUnsignedLessThan(this._prime);
    this._publicKey = modPowBytes(
      this._generator,
      this._privateKey,
      this._prime,
      this._prime.length,
    );

    if (typeof encoding === "string") {
      return encodeOutputBytes(this._publicKey, encoding) as string;
    }

    return this._publicKey;
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
  ): string | Uint8Array {
    if (this._privateKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    let publicKeyBytes: Uint8Array;
    if (typeof otherPublicKey === "string") {
      publicKeyBytes = toDiffieHellmanPublicKeyBytes(
        otherPublicKey,
        inputOrOutputEncoding,
      );
    } else {
      publicKeyBytes = toDiffieHellmanPublicKeyBytes(otherPublicKey);
    }
    const secret = modPowBytes(
      publicKeyBytes,
      this._privateKey,
      this._prime,
      this._prime.length,
    );

    if (typeof otherPublicKey === "string") {
      return encodeDiffieHellmanSecret(secret, outputEncoding);
    }

    if (typeof inputOrOutputEncoding === "string") {
      return encodeOutputString(secret, inputOrOutputEncoding);
    }

    return secret;
  }

  /**
   * Returns the Diffie-Hellman prime.
   */
  public getPrime(encoding?: undefined): Uint8Array;
  public getPrime(encoding: string): string;
  public getPrime(encoding?: string): string | Uint8Array {
    if (typeof encoding === "string") {
      return encodeOutputBytes(this._prime, encoding) as string;
    }

    return this._prime;
  }

  /**
   * Returns the Diffie-Hellman generator.
   */
  public getGenerator(encoding?: undefined): Uint8Array;
  public getGenerator(encoding: string): string;
  public getGenerator(encoding?: string): string | Uint8Array {
    if (typeof encoding === "string") {
      return encodeOutputBytes(this._generator, encoding) as string;
    }

    return this._generator;
  }

  /**
   * Returns the Diffie-Hellman public key.
   */
  public getPublicKey(encoding?: undefined): Uint8Array;
  public getPublicKey(encoding: string): string;
  public getPublicKey(encoding?: string): string | Uint8Array {
    if (this._publicKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    if (typeof encoding === "string") {
      return encodeOutputBytes(this._publicKey, encoding) as string;
    }

    return this._publicKey;
  }

  /**
   * Returns the Diffie-Hellman private key.
   */
  public getPrivateKey(encoding?: undefined): Uint8Array;
  public getPrivateKey(encoding: string): string;
  public getPrivateKey(encoding?: string): string | Uint8Array {
    if (this._privateKey === null) {
      throw new Error("Must call generateKeys() first");
    }

    if (typeof encoding === "string") {
      return encodeOutputBytes(this._privateKey, encoding) as string;
    }

    return this._privateKey;
  }

  /**
   * Sets the Diffie-Hellman public key.
   */
  public setPublicKey(publicKey: string, encoding?: string): void;
  public setPublicKey(publicKey: Uint8Array): void;
  public setPublicKey(publicKey: string | Uint8Array, encoding?: string): void {
    this._publicKey =
      typeof publicKey === "string"
        ? decodeInputBytes(publicKey, encoding ?? "base64")
        : publicKey;
  }

  /**
   * Sets the Diffie-Hellman private key.
   */
  public setPrivateKey(privateKey: string, encoding?: string): void;
  public setPrivateKey(privateKey: Uint8Array): void;
  public setPrivateKey(privateKey: string | Uint8Array, encoding?: string): void {
    this._privateKey =
      typeof privateKey === "string"
        ? decodeInputBytes(privateKey, encoding ?? "base64")
        : privateKey;
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
