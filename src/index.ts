// src/index.ts
import { URL, pathToFileURL, fileURLToPath, format } from 'url';
import ts, { CompilerOptions } from 'typescript';
import globby from 'globby';
import { dirname, isAbsolute as isAbsolutePath } from 'path';
import {
  TransformContext,
  Source,
  TransformResponse,
  ResolveContext,
  ResolveResponse
} from './types';
import { createRequire } from 'module';

const rootModulePath = `${process.cwd()}/`;
const relativePathRegex = /^\.{0,2}[/]/;

const baseURL = pathToFileURL(rootModulePath).href;

const extensions = ['.ts', '.tsx'];

// TypeScript files end in .ts or .tsx
const extensionsRegex = new RegExp(`\\${extensions.join('$|\\')}$`);

export async function resolve(
  specifier: string,
  context: ResolveContext = { parentURL: baseURL },
  defaultResolve: Function
  // @ts-ignore
): Promise<ResolveResponse> {
  const { parentURL } = context;
  if (relativePathRegex.test(specifier) && !specifier.startsWith('file:')) {
    const possibleFiles = await globby(
      `${specifier}{${extensions.join(',')}}`,
      {
        cwd: dirname(fileURLToPath(parentURL)),
        absolute: true
      }
    );

    if (possibleFiles.length > 1)
      throw new Error('More then one option for relative import found');

    return {
      url: pathToFileURL(possibleFiles[0]).href
    };
  }
  if (extensionsRegex.test(specifier)) {
    // Node.js normally errors on unknown file extensions, so return a URL for
    // specifiers ending in the TypeScript file extensions.
    return {
      url: new URL(specifier, parentURL).href
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

export async function dynamicInstantiate(url: string) {
  const require = createRequire(
    `${url.split('/node_modules/')[0].replace('file://', '')}/node_modules/`
  );
  const dynModule = require(url.replace(/.*\/node_modules\//, ''));

  return {
    exports: Object.keys(dynModule),
    execute: (module: any) => {
      for (const [key, fn] of Object.entries(dynModule)) module[key].set(fn);
    }
  };
}

export async function getFormat(
  url: string,
  context: never,
  defaultGetFormat: Function
) {
  if (extensionsRegex.test(url)) {
    return {
      format: 'module'
    };
  }

  // We need to use our dynamic hook on Node.JS CommonJS `node_modules` due to anything exported by TypeScript not being accepted by the exports check in Node
  if (url.includes('node_modules')) {
    return {
      format: 'dynamic'
    };
  }

  // Let Node.js handle all other URLs.
  return defaultGetFormat(url, context, defaultGetFormat);
}

let tsConfigCache: CompilerOptions;

function getTSConfig(modulePath: string): CompilerOptions {
  if (tsConfigCache) return tsConfigCache;
  const tsConfigPath = ts.findConfigFile(modulePath, ts.sys.fileExists);

  if (!tsConfigPath || !isAbsolutePath(tsConfigPath))
    tsConfigCache = {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowJs: true,
      skipLibCheck: true
    };
  else {
    const tsConfigFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
      .config;

    tsConfigCache = ts.convertCompilerOptionsFromJson(
      tsConfigFile.compilerOptions,
      dirname(tsConfigPath)
    ).options;
  }

  return tsConfigCache;
}

export async function transformSource(
  source: Source,
  context: TransformContext,
  defaultTransformSource: Function
): Promise<TransformResponse> {
  if (extensionsRegex.test(context.url)) {
    const sourceFileURL = new URL(context.url);
    const sourceFilePath = fileURLToPath(sourceFileURL);

    const tsConfig = getTSConfig(dirname(sourceFilePath));

    const transpiledModule = ts.transpileModule(source.toString(), {
      compilerOptions: tsConfig,
      reportDiagnostics: true
    });

    return {
      source: transpiledModule.outputText
    };
  }

  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
