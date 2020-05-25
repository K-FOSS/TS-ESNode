// src/index.ts
import { createRequire } from 'module';
import { basename, dirname, resolve as resolvePath, relative } from 'path';
import ts, { CompilerOptions } from 'typescript';
import { fileURLToPath, pathToFileURL } from 'url';
import { findFiles } from './findFiles';
import {
  ModuleFormat,
  ResolveContext,
  ResolveResponse,
  Source,
  TransformContext,
  TransformResponse,
  DynamicInstantiateResponse,
  GetFormatResponse,
} from './types';
import { getTSConfig } from './Utils';

const rootModulePath = process.cwd();
const baseURL = pathToFileURL(rootModulePath).href;

const relativePathRegex = /^\.{1,2}[/]?/;
const hasExtensionRegex = /\.\w+$/;

// TODO: Allow customization of extensions
const extensions = ['.ts', '.tsx'];
const extensionsRegex = new RegExp(`\\${extensions.join('|\\')}`);

let TSConfig: CompilerOptions;

// Custom resolver to allow `.ts` and `.tsx` extensions, along with finding files if no extension is provided.
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function,
): Promise<ResolveResponse> {
  let { parentURL = baseURL } = context;

  let forceRelative = false;
  if (TSConfig && TSConfig.paths) {
    for (const tsPath of Object.keys(TSConfig.paths)) {
      const tsPathKey = tsPath.replace('/*', '');
      if (specifier.startsWith(tsPathKey)) {
        const pathSpecifier = TSConfig.paths[tsPath][0].replace(
          '/*',
          specifier.split(tsPathKey)[1],
        );

        forceRelative = true;

        parentURL = `${
          pathToFileURL(resolvePath(baseURL, TSConfig.baseUrl!)).href
        }/`;
        console.log(parentURL, pathSpecifier);

        specifier = pathSpecifier;
      }
    }
  }

  const resolvedUrl = new URL(specifier, parentURL);
  const fileName = basename(resolvedUrl.pathname);

  // If we can already see a `.ts` or `.tsx` extensions then we can create a File URL
  if (extensionsRegex.test(fileName)) {
    // Node.js normally errors on unknown file extensions, so return a URL for
    // specifiers ending in the TypeScript file extensions.
    return {
      url: resolvedUrl.href,
    };
  }

  /**
   * If no extension is passed and is a relative import then let's try to find a `.ts` or `.tsx` file at the path
   */
  if (
    (relativePathRegex.test(specifier) || forceRelative) &&
    !hasExtensionRegex.test(fileName)
  ) {
    const filePath = fileURLToPath(resolvedUrl);

    const file = await findFiles(dirname(filePath), {
      fileName,
      extensions,
    });

    return {
      url: file.href,
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

/**
 * This dynamically imports the `node_modules` module and creates a dynamic module with all the same exports.
 * @param url fileURL given by Node.JS
 */
export async function dynamicInstantiate(
  url: string,
): Promise<DynamicInstantiateResponse> {
  const urlParts = url.split('/node_modules/');

  // Extract the module name after node_modules.
  const moduleName = urlParts.pop()!;

  // With NPM, this is just top-level node_modules.
  // With PNPM, this is the innermost node_modules.
  const nodeModulesPath = urlParts.join('/node_modules/');

  // Create a require function next to node_module, and import the CommonJS module.
  const require = createRequire(`${nodeModulesPath}/noop.js`);
  let dynModule = require(moduleName);

  // Adapt to default exports in CommonJS module.
  if (dynModule.default && dynModule !== dynModule.default) {
    dynModule = {
      ...dynModule.default,
      ...dynModule,
    };
  }

  // Export as ES Module.
  const linkKeys = Object.keys(dynModule);
  const exports = dynModule.default ? linkKeys : [...linkKeys, 'default'];
  return {
    exports,
    execute: (module): void => {
      module.default.set(dynModule);
      for (const linkKey of linkKeys) {
        module[linkKey].set(dynModule[linkKey]);
      }
    },
  };
}

const formatCache = new Map<string, ModuleFormat>();

export async function getFormat(
  url: string,
  context: never,
  defaultGetFormat: Function,
): Promise<GetFormatResponse> {
  let format = formatCache.get(url);
  if (format) return { format };

  const resolvedUrl = new URL(url);
  const fileName = basename(resolvedUrl.pathname);

  // If it's a TypeScript extension then force `module` mode.
  if (extensionsRegex.test(fileName)) format = 'module';

  if (!format) {
    const defaultResolve = defaultGetFormat(url, context, defaultGetFormat) as {
      format: ModuleFormat;
    };
    format = defaultResolve.format;

    /**
     * We need to use our dynamic hook on Node.JS CommonJS `node_modules` due to
     * anything exported by TypeScript not being accepted by the exports check in Node
     */
    if (url.includes('node_modules') && format === 'commonjs') {
      format = 'dynamic';
    }
  }

  formatCache.set(url, format);

  // Let Node.js handle all other URLs.
  return {
    format,
  };
}

export async function transformSource(
  source: Source,
  context: TransformContext,
  defaultTransformSource: Function,
): Promise<TransformResponse> {
  const resolvedUrl = new URL(context.url);
  const fileName = basename(resolvedUrl.pathname);

  // Only transform TypeScript Modules
  if (extensionsRegex.test(fileName)) {
    const sourceFilePath = fileURLToPath(context.url);

    // Load the closest `tsconfig.json` to the source file
    const tsConfig = getTSConfig(dirname(sourceFilePath));
    TSConfig = tsConfig;

    // Transpile the source code that Node passed to us.
    const transpiledModule = ts.transpileModule(source.toString(), {
      compilerOptions: tsConfig,
      reportDiagnostics: true,
    });

    return {
      source: transpiledModule.outputText,
    };
  }

  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
