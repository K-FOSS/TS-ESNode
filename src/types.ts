// src/types.ts

export type ModuleFormat =
  | 'builtin'
  | 'commonjs'
  | 'dynamic'
  | 'json'
  | 'module'
  | 'wasm';

export type Source = string | Buffer;

export interface ResolveContext {
  parentURL?: string;
}

export interface ResolveResponse {
  url: string;
  format?: string;
}

export interface TransformContext {
  url: string;
  format: string;
}

export interface TransformResponse {
  source: Source;
}

export interface DynamicInstantiateResponse {
  exports: string[];

  execute: (module: { [key: string]: { set(value: unknown): void } }) => void;
}

export interface GetFormatResponse {
  format: ModuleFormat;
}
