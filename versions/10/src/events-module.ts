
import type {} from "./type-bootstrap.js";

import type { int } from "@tsonic/core/types.js";
import { console as JSConsole } from "@tsonic/js";

export type EventListener = (...args: unknown[]) => void;

export const toEventListener = (
  listener: (() => void) | null | undefined
): EventListener | undefined => {
  if (listener === undefined || listener === null) {
    return undefined;
  }

  return (..._args: unknown[]): void => {
    listener();
  };
};

export const toUnaryEventListener = <T>(
  listener: ((value: T) => void) | null | undefined
): EventListener | undefined => {
  if (listener === undefined || listener === null) {
    return undefined;
  }

  return (...args: unknown[]): void => {
    listener(args[0] as T);
  };
};

export const toBinaryEventListener = <T1, T2>(
  listener: ((first: T1, second: T2) => void) | null | undefined
): EventListener | undefined => {
  if (listener === undefined || listener === null) {
    return undefined;
  }

  return (...args: unknown[]): void => {
    listener(args[0] as T1, args[1] as T2);
  };
};

type ListenerRegistration = {
  readonly original: EventListener;
  readonly invoke: EventListener;
  readonly once: boolean;
};

const ERROR_EVENT = "error";
const NEW_LISTENER_EVENT = "newListener";
const REMOVE_LISTENER_EVENT = "removeListener";

const throwUnhandledError = (value: unknown): never => {
  if (value instanceof Error) {
    throw value;
  }

  throw new Error(`Uncaught, unspecified 'error' event. (${String(value)})`);
};

export class EventEmitter {
  private static _defaultMaxListeners: int = 10 as int;

  public static once(
    emitter: EventEmitter,
    eventName: string
  ): Promise<unknown[]> {
    if (emitter === undefined || emitter === null) {
      throw new Error("EventEmitter.once requires an emitter");
    }

    if (eventName === undefined || eventName === null || eventName.length === 0) {
      throw new Error("EventEmitter.once requires a non-empty event name");
    }

    return once(emitter, eventName);
  }

  private readonly listenersByEvent: Map<string, ListenerRegistration[]> =
    new Map<string, ListenerRegistration[]>();
  private readonly knownEventNames: string[] = [];
  private _maxListeners: int = EventEmitter._defaultMaxListeners;

  public static get defaultMaxListeners(): int {
    return EventEmitter._defaultMaxListeners;
  }

  public static set defaultMaxListeners(value: int) {
    if (value < 0) {
      throw new Error("Max listeners must be non-negative");
    }

    EventEmitter._defaultMaxListeners = value;
  }

  public addListener(eventName: string, listener: EventListener): EventEmitter {
    return this.on(eventName, listener);
  }

  public on(eventName: string, listener: EventListener): EventEmitter {
    return this.insertListener(eventName, listener, false, false);
  }

  public once(eventName: string, listener: EventListener): EventEmitter {
    return this.insertListener(eventName, listener, true, false);
  }

  public prependListener(
    eventName: string,
    listener: EventListener
  ): EventEmitter {
    return this.insertListener(eventName, listener, false, true);
  }

  public prependOnceListener(
    eventName: string,
    listener: EventListener
  ): EventEmitter {
    return this.insertListener(eventName, listener, true, true);
  }

  public off(eventName: string, listener: EventListener): EventEmitter {
    return this.removeListener(eventName, listener);
  }

  public removeListener(eventName: string, listener: EventListener): EventEmitter {
    const registrations = this.listenersByEvent.get(eventName);
    if (registrations === undefined || registrations.length === 0) {
      return this;
    }

    let removed: ListenerRegistration | undefined;
    const remaining: ListenerRegistration[] = [];

    for (const registration of registrations) {
      if (
        removed === undefined &&
        (registration.original === listener || registration.invoke === listener)
      ) {
        removed = registration;
        continue;
      }

      remaining.push(registration);
    }

    if (remaining.length === 0) {
      this.listenersByEvent.delete(eventName);
      this.removeKnownEventName(eventName);
    } else {
      this.listenersByEvent.set(eventName, remaining);
    }

    if (removed !== undefined && eventName !== REMOVE_LISTENER_EVENT) {
      this.emit(REMOVE_LISTENER_EVENT, eventName, removed.original);
    }

    return this;
  }

  public removeAllListeners(eventName?: string): EventEmitter {
    if (eventName === undefined) {
      const names = this.eventNames();
      for (const name of names) {
        this.removeAllListeners(name);
      }
      this.listenersByEvent.clear();
      this.knownEventNames.splice(0, this.knownEventNames.length);
      return this;
    }

    const listeners = this.listeners(eventName);
    this.listenersByEvent.delete(eventName);
    this.removeKnownEventName(eventName);

    if (eventName !== REMOVE_LISTENER_EVENT) {
      for (const listener of listeners) {
        this.emit(REMOVE_LISTENER_EVENT, eventName, listener);
      }
    }

    return this;
  }

  public emit(eventName: string, ...args: unknown[]): boolean {
    const registrations = this.listenersByEvent.get(eventName);
    if (registrations === undefined || registrations.length === 0) {
      if (eventName === ERROR_EVENT) {
        throwUnhandledError(args.length > 0 ? args[0] : undefined);
      }
      return false;
    }

    const snapshot = registrations.slice();
    for (const registration of snapshot) {
      try {
        registration.invoke(...args);
      } catch (error) {
        if (eventName !== ERROR_EVENT) {
          this.emit(ERROR_EVENT, error);
        } else {
          throw error;
        }
      }
    }

    return true;
  }

  public listeners(eventName: string): EventListener[] {
    const registrations = this.listenersByEvent.get(eventName);
    if (registrations === undefined) {
      return [];
    }

    return registrations.map((registration) => registration.original);
  }

  public rawListeners(eventName: string): EventListener[] {
    const registrations = this.listenersByEvent.get(eventName);
    if (registrations === undefined) {
      return [];
    }

    return registrations.map((registration) => registration.invoke);
  }

  public listenerCount(eventName: string): int {
    const registrations = this.listenersByEvent.get(eventName);
    return registrations?.length ?? 0;
  }

  public eventNames(): string[] {
    return [...this.knownEventNames];
  }

  public getMaxListeners(): int {
    return this._maxListeners;
  }

  public setMaxListeners(value: int): EventEmitter {
    if (value < 0) {
      throw new Error("Max listeners must be non-negative");
    }

    this._maxListeners = value;
    return this;
  }

  private insertListener(
    eventName: string,
    listener: EventListener,
    once: boolean,
    prepend: boolean
  ): EventEmitter {
    const registration = this.createRegistration(eventName, listener, once);
    const existing = this.listenersByEvent.get(eventName) ?? [];
    const next = prepend
      ? [registration, ...existing]
      : [...existing, registration];
    if (existing.length === 0) {
      this.knownEventNames.push(eventName);
    }
    this.listenersByEvent.set(eventName, next);

    if (eventName !== NEW_LISTENER_EVENT) {
      this.emit(NEW_LISTENER_EVENT, eventName, listener);
    }

    if (this._maxListeners > 0 && next.length > this._maxListeners) {
      JSConsole.error(
        `Warning: Possible EventEmitter memory leak detected. ${String(next.length)} ${eventName} listeners added.`
      );
    }

    return this;
  }

  private createRegistration(
    eventName: string,
    listener: EventListener,
    once: boolean
  ): ListenerRegistration {
    if (!once) {
      return { original: listener, invoke: listener, once: false };
    }

    const invoke: EventListener = (...args: unknown[]): unknown => {
      this.removeListener(eventName, invoke);
      return listener(...args);
    };

    return { original: listener, invoke, once: true };
  }

  private removeKnownEventName(eventName: string): void {
    const index = this.knownEventNames.indexOf(eventName);
    if (index >= 0) {
      this.knownEventNames.splice(index, 1);
    }
  }
}

export const captureRejectionSymbol = "nodejs.captureRejection";
export const errorMonitor = "errorMonitor";

let captureRejections: boolean = false;

export const addAbortListener = (
  _signal: unknown,
  listener: () => void
): (() => void) => listener;

export const getEventListeners = (
  emitter: EventEmitter,
  eventName: string
): EventListener[] => emitter.listeners(eventName);

export const getMaxListeners = (emitter: EventEmitter): int =>
  emitter.getMaxListeners();

export const listenerCount = (emitter: EventEmitter, eventName: string): int =>
  emitter.listenerCount(eventName);

export const once = (
  emitter: EventEmitter,
  eventName: string
): Promise<unknown[]> => {
  if (emitter === undefined || emitter === null) {
    throw new Error("EventEmitter.once requires an emitter");
  }

  if (eventName === undefined || eventName === null || eventName.length === 0) {
    throw new Error("EventEmitter.once requires a non-empty event name");
  }

  return new Promise<unknown[]>((resolve) => {
    emitter.once(eventName, (...args: unknown[]) => {
      resolve(args);
    });
  });
};

export const setMaxListeners = (
  value: int,
  ...emitters: EventEmitter[]
): void => {
  for (const emitter of emitters) {
    emitter.setMaxListeners(value);
  }
};

export class EventsModule {
  public get captureRejections(): boolean {
    return captureRejections;
  }

  public set captureRejections(value: boolean) {
    captureRejections = value;
  }

  public get defaultMaxListeners(): int {
    return EventEmitter.defaultMaxListeners;
  }

  public set defaultMaxListeners(value: int) {
    EventEmitter.defaultMaxListeners = value;
  }

  public get captureRejectionSymbol(): string {
    return captureRejectionSymbol;
  }

  public get errorMonitor(): string {
    return errorMonitor;
  }

  public addAbortListener(signal: unknown, listener: () => void): () => void {
    return addAbortListener(signal, listener);
  }

  public getEventListeners(
    emitter: EventEmitter,
    eventName: string
  ): EventListener[] {
    return getEventListeners(emitter, eventName);
  }

  public getMaxListeners(emitter: EventEmitter): int {
    return getMaxListeners(emitter);
  }

  public listenerCount(emitter: EventEmitter, eventName: string): int {
    return listenerCount(emitter, eventName);
  }

  public async once(
    emitter: EventEmitter,
    eventName: string
  ): Promise<unknown[]> {
    return await once(emitter, eventName);
  }

  public setMaxListeners(value: int, ...emitters: EventEmitter[]): void {
    setMaxListeners(value, ...emitters);
  }
}

export const events = new EventsModule();
