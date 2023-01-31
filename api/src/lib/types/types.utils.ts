export type Maybe<T> = T | undefined;

export type ClassType<T = unknown> = new (...args: never[]) => T;

export interface Factory<T> {
  create(...args: unknown[]): Promise<T>;
}

export interface AsyncInit {
  init(silent?: boolean): Promise<void>;
}
