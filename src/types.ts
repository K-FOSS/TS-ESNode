// src/types.ts

export type ModuleFormat =
  | 'builtin'
  | 'commonjs'
  | 'dynamic'
  | 'json'
  | 'module'
  | 'wasm';

export type Source = string | SharedArrayBuffer | Uint8Array;

export interface ResolveContext {
  parentURL?: string;
}

export interface LoadContext {
  conditions: string[];

  format?: string

  importAssertions: object;
}

export interface LoadResponse {
  format: string;

  shortCircuit?: boolean;

  source: string | ArrayBuffer;
}

export interface ResolveResponse {
  url: string;
  format?: string;
  shortCircuit?: boolean;
}

export type ResolveHook = (
  specifier: string,
  context: ResolveContext,
  defaultResolve: ResolveHook,
) => Promise<ResolveResponse>;

export interface TransformContext {
  url: string;
  format: string;
}

export interface TransformResponse {
  source: Source;
}

export type TransformSourceHook = (
  source: Source,
  context: TransformContext,
  defaultTransformSource: TransformSourceHook,
) => Promise<TransformResponse>;

export interface DynamicInstantiateResponse {
  exports: string[];

  execute: (module: { [key: string]: { set(value: unknown): void } }) => void;
}

export interface GetFormatResponse {
  format: ModuleFormat;
}

export type GetFormatHook = (
  url: string,
  context: never,
  defaultGetFormat: GetFormatHook,
) => Promise<GetFormatResponse>;

export interface GetSourceContext {
  format: string;
}

export interface GetSourceResponse {
  source: Source;
}

export type GetSourceHook = (
  url: string,
  context: GetSourceContext,
  defaultGetSource: GetSourceHook,
) => Promise<GetSourceResponse>;
