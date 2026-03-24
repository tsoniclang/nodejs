import type { byte, double, int, long } from "@tsonic/core/types.js";
import type { IEnumerable_1 } from "@tsonic/dotnet/System.Collections.Generic/internal/index.js";
import type { Byte, Comparison, Int32, Nullable } from "@tsonic/dotnet/System.js";
import type {
  Date as NativeDate,
  Uint8Array as NativeUint8Array,
} from "@tsonic/js";

declare global {
  class RangeError extends Error {
    constructor(message?: string);
  }

  interface ArrayLike<T> {
    readonly length: int;
    readonly [n: number]: T;
  }

  interface String {
    readonly length: int;
    at(index: int): string;
    charAt(index: int): string;
    charCodeAt(index: int): int;
    codePointAt(index: int): int;
    concat(...strings: string[]): string;
    endsWith(searchString: string): boolean;
    includes(searchString: string): boolean;
    indexOf(searchString: string, position?: int): int;
    isWellFormed(): boolean;
    lastIndexOf(searchString: string, position?: int): int;
    localeCompare(compareString: string): int;
    match(pattern: string): string[] | undefined;
    matchAll(pattern: string): string[][];
    normalize(form?: string): string;
    padEnd(targetLength: int, padString?: string): string;
    padStart(targetLength: int, padString?: string): string;
    repeat(count: int): string;
    replace(searchValue: string, replaceValue: string): string;
    replaceAll(searchValue: string, replaceValue: string): string;
    search(pattern: string): int;
    slice(start?: int, end?: int): string;
    split(separator: string, limit?: int): string[];
    startsWith(searchString: string): boolean;
    substr(start: int, length?: int): string;
    substring(start: int, end?: int): string;
    toLocaleLowerCase(): string;
    toLocaleUpperCase(): string;
    toLowerCase(): string;
    toString(): string;
    trim(): string;
    trimLeft(): string;
    trimRight(): string;
    trimStart(): string;
    trimEnd(): string;
    toUpperCase(): string;
    toWellFormed(): string;
    valueOf(): string;
  }

  interface StringConstructor {
    (value?: unknown): string;
    fromCharCode(...codes: int[]): string;
    fromCodePoint(...codePoints: int[]): string;
  }

  interface Number {
    toString(): string;
    valueOf(): number;
  }

  interface Boolean {
    toString(): string;
    valueOf(): boolean;
  }

  interface BooleanConstructor {
    (value?: unknown): boolean;
  }

  interface ImportMeta {
    readonly url: string;
    readonly filename: string;
    readonly dirname: string;
  }

  interface NumberConstructor {
    (value?: unknown): number;
    readonly EPSILON: number;
    readonly MAX_SAFE_INTEGER: number;
    readonly MAX_VALUE: number;
    readonly MIN_SAFE_INTEGER: number;
    readonly MIN_VALUE: number;
    readonly NEGATIVE_INFINITY: number;
    readonly POSITIVE_INFINITY: number;
    readonly NaN: number;
    isFinite(value: number): boolean;
    isInteger(value: number): boolean;
    isNaN(value: number): boolean;
    isSafeInteger(value: number): boolean;
    parseFloat(str: string): number;
    parseInt(str: string, radix?: number): number;
  }

  interface Array<T> {
    readonly length: int;
    at(index: int): T;
    concat(...items: unknown[]): T[];
    copyWithin(target: int, start?: int, end?: int): T[];
    entries(): Iterable<[int, T]>;
    every(callback: (value: T) => boolean): boolean;
    every(callback: (value: T, index: int, array: T[]) => boolean): boolean;
    fill(value: T, start?: int, end?: int): T[];
    filter(callback: (value: T) => boolean): T[];
    filter(callback: (value: T, index: int) => boolean): T[];
    filter(callback: (value: T, index: int, array: T[]) => boolean): T[];
    find(callback: (value: T) => boolean): T | undefined;
    find(callback: (value: T, index: int) => boolean): T | undefined;
    find(callback: (value: T, index: int, array: T[]) => boolean): T | undefined;
    findIndex(callback: (value: T) => boolean): int;
    findIndex(callback: (value: T, index: int) => boolean): int;
    findIndex(callback: (value: T, index: int, array: T[]) => boolean): int;
    findLast(callback: (value: T) => boolean): T | undefined;
    findLast(callback: (value: T, index: int) => boolean): T | undefined;
    findLast(callback: (value: T, index: int, array: T[]) => boolean): T | undefined;
    findLastIndex(callback: (value: T) => boolean): int;
    findLastIndex(callback: (value: T, index: int) => boolean): int;
    findLastIndex(callback: (value: T, index: int, array: T[]) => boolean): int;
    flat(depth?: int): unknown[];
    flatMap<TResult>(callback: (value: T, index: int, array: T[]) => unknown): TResult[];
    forEach(callback: (value: T) => void): void;
    forEach(callback: (value: T, index: int) => void): void;
    forEach(callback: (value: T, index: int, array: T[]) => void): void;
    includes(searchElement: T): boolean;
    indexOf(searchElement: T, fromIndex?: int): int;
    join(separator?: string): string;
    keys(): Iterable<int>;
    lastIndexOf(searchElement: T, fromIndex?: int): int;
    map<TResult>(callback: (value: T) => TResult): TResult[];
    map<TResult>(callback: (value: T, index: int) => TResult): TResult[];
    map<TResult>(callback: (value: T, index: int, array: T[]) => TResult): TResult[];
    pop(): T;
    push(...items: T[]): int;
    reduce(callback: (previousValue: T, currentValue: T) => T): T;
    reduce<TResult>(callback: (previousValue: TResult, currentValue: T) => TResult, initialValue: TResult): TResult;
    reduce<TResult>(callback: (previousValue: TResult, currentValue: T, index: int) => TResult, initialValue: TResult): TResult;
    reduce<TResult>(callback: (
        previousValue: TResult,
        currentValue: T,
        index: int,
        array: T[]
      ) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (previousValue: TResult, currentValue: T) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (previousValue: TResult, currentValue: T, index: int) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (
        previousValue: TResult,
        currentValue: T,
        index: int,
        array: T[]
      ) => TResult, initialValue: TResult): TResult;
    reverse(): T[];
    shift(): T;
    slice(start?: int, end?: int): T[];
    some(callback: (value: T) => boolean): boolean;
    some(callback: (value: T, index: int, array: T[]) => boolean): boolean;
    sort(compareFunc?: (left: T, right: T) => double): T[];
    splice(start: int, deleteCount?: int, ...items: T[]): T[];
    toLocaleString(): string;
    toReversed(): T[];
    toSorted(compareFunc?: (left: T, right: T) => double): T[];
    toSpliced(start: int, deleteCount?: int, ...items: T[]): T[];
    toString(): string;
    unshift(...items: T[]): int;
    values(): Iterable<T>;
    with(index: int, value: T): T[];
  }

  interface ReadonlyArray<T> {
    readonly length: int;
    at(index: int): T;
    concat(...items: unknown[]): T[];
    entries(): Iterable<[int, T]>;
    every(callback: (value: T) => boolean): boolean;
    every(callback: (value: T, index: int, array: readonly T[]) => boolean): boolean;
    filter(callback: (value: T) => boolean): T[];
    filter(callback: (value: T, index: int) => boolean): T[];
    filter(callback: (value: T, index: int, array: readonly T[]) => boolean): T[];
    find(callback: (value: T) => boolean): T | undefined;
    find(callback: (value: T, index: int) => boolean): T | undefined;
    find(callback: (value: T, index: int, array: readonly T[]) => boolean): T | undefined;
    findIndex(callback: (value: T) => boolean): int;
    findIndex(callback: (value: T, index: int) => boolean): int;
    findIndex(callback: (value: T, index: int, array: readonly T[]) => boolean): int;
    findLast(callback: (value: T) => boolean): T | undefined;
    findLast(callback: (value: T, index: int) => boolean): T | undefined;
    findLast(callback: (value: T, index: int, array: readonly T[]) => boolean): T | undefined;
    findLastIndex(callback: (value: T) => boolean): int;
    findLastIndex(callback: (value: T, index: int) => boolean): int;
    findLastIndex(callback: (value: T, index: int, array: readonly T[]) => boolean): int;
    flat(depth?: int): unknown[];
    flatMap<TResult>(callback: (value: T, index: int, array: readonly T[]) => unknown): TResult[];
    forEach(callback: (value: T) => void): void;
    forEach(callback: (value: T, index: int) => void): void;
    forEach(callback: (value: T, index: int, array: readonly T[]) => void): void;
    includes(searchElement: T): boolean;
    indexOf(searchElement: T, fromIndex?: int): int;
    join(separator?: string): string;
    keys(): Iterable<int>;
    lastIndexOf(searchElement: T, fromIndex?: int): int;
    map<TResult>(callback: (value: T) => TResult): TResult[];
    map<TResult>(callback: (value: T, index: int) => TResult): TResult[];
    map<TResult>(callback: (value: T, index: int, array: readonly T[]) => TResult): TResult[];
    reduce(callback: (previousValue: T, currentValue: T) => T): T;
    reduce<TResult>(callback: (previousValue: TResult, currentValue: T) => TResult, initialValue: TResult): TResult;
    reduce<TResult>(callback: (previousValue: TResult, currentValue: T, index: int) => TResult, initialValue: TResult): TResult;
    reduce<TResult>(callback: (
        previousValue: TResult,
        currentValue: T,
        index: int,
        array: readonly T[]
      ) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (previousValue: TResult, currentValue: T) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (previousValue: TResult, currentValue: T, index: int) => TResult, initialValue: TResult): TResult;
    reduceRight<TResult>(callback: (
        previousValue: TResult,
        currentValue: T,
        index: int,
        array: readonly T[]
      ) => TResult, initialValue: TResult): TResult;
    slice(start?: int, end?: int): T[];
    some(callback: (value: T) => boolean): boolean;
    some(callback: (value: T, index: int, array: readonly T[]) => boolean): boolean;
    toLocaleString(): string;
    toReversed(): T[];
    toSorted(compareFunc?: (left: T, right: T) => double): T[];
    toString(): string;
    values(): Iterable<T>;
    with(index: int, value: T): T[];
  }

  interface Console {
    log(...data: unknown[]): void;
    error(...data: unknown[]): void;
    warn(...data: unknown[]): void;
    info(...data: unknown[]): void;
    debug(...data: unknown[]): void;
    trace(...data: unknown[]): void;
    assert(condition: boolean, message?: string, ...optionalParams: unknown[]): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    dir(obj?: unknown, ...options: unknown[]): void;
    dirxml(...data: unknown[]): void;
    group(...data: unknown[]): void;
    groupCollapsed(...data: unknown[]): void;
    groupEnd(): void;
    table(data?: unknown, properties?: string[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: unknown[]): void;
  }

  interface ArrayConstructor {
    isArray(value: unknown): value is readonly unknown[] | unknown[];
    from(source: string): string[];
    from<TResult>(source: string, mapfn: (value: string, index: int) => TResult): TResult[];
    from<T>(source: Iterable<T> | ArrayLike<T>): T[];
    from<T, TResult>(source: Iterable<T> | ArrayLike<T>, mapfn: (value: T, index: int) => TResult): TResult[];
    of<T>(...items: T[]): T[];
  }

  interface Date extends NativeDate {
  }

  interface Uint8Array
    extends NativeUint8Array, ArrayLike<byte>, IEnumerable_1<Byte> {
    readonly byteLength: int;
    readonly length: int;
    fill(value: byte, start?: int, end?: Nullable<Int32>): Uint8Array;
    includes(value: byte, fromIndex?: int): boolean;
    indexOf(value: byte, fromIndex?: int): int;
    join(separator?: string): string;
    reverse(): Uint8Array;
    set(array: IEnumerable_1<Byte>, offset?: int): void;
    slice(begin?: int, end?: Nullable<Int32>): Uint8Array;
    sort(compareFn?: Comparison<Byte>): Uint8Array;
    subarray(begin?: int, end?: Nullable<Int32>): Uint8Array;
    [index: number]: byte;
  }

  interface DateConstructor {
    new(): Date;
    new(value: string | number | long): Date;
    now(): long;
    parse(s: string): number;
  }

  interface Uint8ArrayConstructor {
    new(length: number): Uint8Array;
    new(values: IEnumerable_1<Byte> | byte[]): Uint8Array;
    readonly BYTES_PER_ELEMENT: int;
  }

  interface JSON {
    parse<T = unknown>(text: string): T;
    stringify(value: unknown, replacer?: unknown, space?: string | number | int): string;
  }

  interface Math {
    round(x: number): number;
    max(...values: double[]): number;
    min(...values: double[]): number;
    random(): number;
  }

  interface RegExpMatchArray extends Array<string> {
    index?: int;
    input?: string;
  }

  interface RegExp {
    exec(string: string): RegExpMatchArray | null;
    test(string: string): boolean;
  }

  interface RegExpConstructor {
    new(pattern: string | RegExp, flags?: string): RegExp;
    (pattern: string | RegExp, flags?: string): RegExp;
  }

  interface Map<K, V> {
    readonly size: int;
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V | undefined;
    entries(): Iterable<[K, V]>;
    forEach(callback: (value: V) => void): void;
    forEach(callback: (value: V, key: K) => void): void;
    forEach(callback: (value: V, key: K, map: Map<K, V>) => void): void;
    has(key: K): boolean;
    keys(): Iterable<K>;
    set(key: K, value: V): this;
    values(): Iterable<V>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
  }

  interface MapConstructor {
    new<K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
  }

  interface Set<T> {
    readonly size: int;
    add(value: T): this;
    clear(): void;
    delete(value: T): boolean;
    entries(): Iterable<[T, T]>;
    forEach(callback: (value: T) => void): void;
    forEach(callback: (value: T, key: T) => void): void;
    forEach(callback: (value: T, key: T, set: Set<T>) => void): void;
    has(value: T): boolean;
    keys(): Iterable<T>;
    values(): Iterable<T>;
    [Symbol.iterator](): IterableIterator<T>;
  }

  interface SetConstructor {
    new<T = unknown>(values?: readonly T[] | null): Set<T>;
  }

  interface ObjectConstructor {
    entries(obj: unknown): [string, unknown][];
    keys(obj: unknown): string[];
    values(obj: unknown): unknown[];
  }

  const String: StringConstructor;

  const Number: NumberConstructor;

  const Boolean: BooleanConstructor;

  const console: Console;

  const Date: DateConstructor;

  const Uint8Array: Uint8ArrayConstructor;

  const JSON: JSON;

  const Math: Math;

  const RegExp: RegExpConstructor;

  const Map: MapConstructor;

  const Set: SetConstructor;

  const Object: ObjectConstructor;

  function parseInt(str: string, radix?: number): number;

  function parseFloat(str: string): number;

  function isFinite(value: number): boolean;

  function isNaN(value: number): boolean;

  function setTimeout(handler: (...args: unknown[]) => void, timeout?: number, ...args: unknown[]): number;

  function clearTimeout(id: number): void;

  function setInterval(handler: (...args: unknown[]) => void, timeout?: number, ...args: unknown[]): number;

  function clearInterval(id: number): void;
}

export {};
