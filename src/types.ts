// src/types.ts

export type Source = string | Buffer;

type MaybePromise<T> = Promise<T> | T;

export interface ResolveContext {
  parentURL?: string;
}

export interface ResolveResponse {
  url: string;
}

export enum ModuleFormat {
  BUILTIN = 'builtin',
  COMMONJS = 'commonjs',
  DYNAMIC = 'dynamic',
  JSON = 'json',
  MODULE = 'module',
  WASM = 'wasm',
}

export interface GetFormatResponse {
  format: ModuleFormat;
}

export type GetFormatHook = (
  url: string,
  context: object,
  defaultGetFormat: GetFormatHook,
) => MaybePromise<GetFormatResponse>;

export interface GetSourceContext {
  format: ModuleFormat;
}

export interface GetSourceResponse {
  source: Source;
}

export type GetSourceHook = (
  url: string,
  context: GetSourceContext,
  defaultGetSource: GetSourceHook,
) => MaybePromise<GetSourceResponse>;

export interface TransformSourceContext {
  url: string;
  format: ModuleFormat;
}

export interface TransformSourceResponse {
  source: Source;
}

export type TransformSourceHook = (
  source: Source,
  context: TransformSourceContext,
  defaultTransformSource: TransformSourceHook,
) => MaybePromise<TransformSourceResponse>;

export interface DynamicInstantiateResponse {
  exports: string[];
  execute: Function;
}

export type DynamicInstantiateHook = (
  url: string,
) => MaybePromise<DynamicInstantiateResponse>;
