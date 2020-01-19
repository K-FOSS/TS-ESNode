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
const baseURL = pathToFileURL(rootModulePath).href;

const relativePathRegex = /^\.{0,2}[/]/;

const extensions = ['.ts', '.tsx'];
const extensionsRegex = new RegExp(`\\${extensions.join('$|\\')}$`);

// Custom resolver to allow `.ts` and `.tsx` extensions, along with finding files if no extension is provided.
export async function resolve(
  specifier: string,
  context: ResolveContext = { parentURL: baseURL },
  defaultResolve: Function
): Promise<ResolveResponse> {
  const { parentURL } = context;

  // If we can already see a `.ts` or `.tsx` extensions then we can create a File URL
  if (extensionsRegex.test(specifier)) {
    // Node.js normally errors on unknown file extensions, so return a URL for
    // specifiers ending in the TypeScript file extensions.
    return {
      url: new URL(specifier, parentURL).href
    };
  }

  /**
   * If no extension is passed and is a relative import then let's try to find a `.ts` or `.tsx` file at the path
   */
  if (relativePathRegex.test(specifier) && !specifier.startsWith('file:')) {
    const possibleFiles = await globby(
      `${specifier}{${extensions.join(',')}}`,
      {
        cwd: dirname(fileURLToPath(parentURL)),
        absolute: true
      }
    );

    /**
     * We should error if we find more then one file that matches
     */
    if (possibleFiles.length > 1) {
      throw new Error('More then one option for relative import found');
    }

    if (possibleFiles.length < 1) {
      throw new Error('No files found');
    }

    return {
      url: pathToFileURL(possibleFiles[0]).href
    };
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

/**
 * This dynamically imports the `node_modules` module and creates a dynamic module with all the same exports.
 * @param url fileURL given by Node.JS
 */
export async function dynamicInstantiate(url: string) {
  // Create a Node.JS Require using the `node_modules` folder as the base URL.
  const require = createRequire(
    `${url.split('/node_modules/')[0].replace('file://', '')}/node_modules/`
  );
  // Import the module file path
  let dynModule = require(url.replace(/.*\/node_modules\//, ''));

  if (dynModule.default)
    dynModule = {
      ...dynModule.default,
      ...dynModule
    };

  const linkKeys = Object.keys(dynModule);

  return {
    exports: [...linkKeys, 'default'],
    execute: (module: any) => {
      module.default.set(dynModule);
      // For all elements in the import set the module's key.
      for (const linkKey of linkKeys) module[linkKey].set(dynModule[linkKey]);
    }
  };
}

export async function getFormat(
  url: string,
  context: never,
  defaultGetFormat: Function
) {
  // If it's a TypeScript extension then force `module` mode.
  if (extensionsRegex.test(url)) {
    return {
      format: 'module'
    };
  }

  /**
   * We need to use our dynamic hook on Node.JS CommonJS `node_modules` due to
   * anything exported by TypeScript not being accepted by the exports check in Node
   */
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

  if (!tsConfigPath || !isAbsolutePath(tsConfigPath)) {
    // If no `tsconfig.json` then we force the module to be transpiled as `ESNext`
    tsConfigCache = {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowJs: true,
      skipLibCheck: true
    };
  } else {
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
  // Only transform TypeScript Modules
  if (extensionsRegex.test(context.url)) {
    const sourceFileURL = new URL(context.url);
    const sourceFilePath = fileURLToPath(sourceFileURL);

    // Load the closest `tsconfig.json` to the source file
    const tsConfig = getTSConfig(dirname(sourceFilePath));

    // Transpile the source code that Node passed to us.
    const transpiledModule = ts.transpileModule(source.toString(), {
      compilerOptions: tsConfig,
      reportDiagnostics: true
    });

    // TODO: Actually check the TypeScript Code.
    return {
      source: transpiledModule.outputText
    };
  }

  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
