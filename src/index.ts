// src/index.ts
import { createRequire } from 'module';
import { basename, dirname } from 'path';
import { fileURLToPath, pathToFileURL, URL } from 'url';
import { findFiles } from './findFiles';
import { transpileTypeScript } from './Library/transpileSource';
import {
  DynamicInstantiateResponse,
  GetFormatHook,
  GetFormatResponse,
  ModuleFormat,
  ResolveContext,
  ResolveResponse,
  Source,
  TransformSourceContext,
  TransformSourceHook,
  TransformSourceResponse,
} from './types';

const baseURL = pathToFileURL(`${process.cwd()}/`).href;

const relativePathRegex = /^\.{0,2}[/]/;

// TODO: Allow customization of extensions
const extensions = ['.ts', '.tsx'];

/**
 * Pull in the extension array and create a Regular Expression to test for files.
 * @constant
 */
const extensionsRegex = new RegExp(`\\${extensions.join('$|\\')}$`);

// Custom resolver to allow `.ts` and `.tsx` extensions, along with finding files if no extension is provided.
export async function resolve(
  specifier: string,
  context: ResolveContext,
  defaultResolve: Function,
): Promise<ResolveResponse> {
  const { parentURL = baseURL } = context;

  // If we can already see a `.ts` or `.tsx` extensions then we can create a File URL
  if (extensionsRegex.test(specifier)) {
    // Node.js normally errors on unknown file extensions, so return a URL for
    // specifiers ending in the TypeScript file extensions.
    return {
      url: new URL(specifier, parentURL).href,
    };
  }

  /**
   * If no extension is passed and is a relative import then let's try to find a `.ts` or `.tsx` file at the path
   *
   * // TODO: Find a better way to not pass possible JavaScript files to the findFiles functionx
   */
  if (relativePathRegex.test(specifier) && !specifier.startsWith('file:')) {
    const fileURL = new URL(specifier, parentURL);
    const filePath = fileURLToPath(fileURL);

    const file = await findFiles(dirname(filePath), {
      fileName: basename(filePath),
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
  // TODO: Fix this hack to allow Yarn2 to work
  // Create a Node.JS Require using the `node_modules` folder as the base URL.
  const require = createRequire(
    `${url.split('/node_modules/')[0].replace('file://', '')}/node_modules/`,
  );

  // Import the module file path
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  let dynModule = require(url.replace(/.*\/node_modules\//, ''));

  /**
   * This is needed to allow for default exports in CommonJS modules.
   */
  if (dynModule.default)
    dynModule = {
      ...dynModule.default,
      ...dynModule,
    };

  const linkKeys = Object.keys(dynModule);

  return {
    exports: [...linkKeys, 'default'],
    execute: (dynamicModule: {
      [key: string]: { set: (moduleMap: typeof dynModule[string]) => void };
    }) => {
      dynamicModule.default.set(dynModule);
      // For all elements in the import set the module's key.
      for (const linkKey of linkKeys)
        dynamicModule[linkKey].set(dynModule[linkKey]);
    },
  };
}

export async function getFormat(
  url: string,
  context: object,
  defaultGetFormat: GetFormatHook,
): Promise<GetFormatResponse> {
  // If it's a TypeScript extension then force `module` mode.
  if (extensionsRegex.test(url)) {
    return {
      format: ModuleFormat.MODULE,
    };
  }

  /**
   * We need to use our dynamic hook on Node.JS CommonJS `node_modules` due to
   * anything exported by TypeScript not being accepted by the exports check in Node
   */
  if (url.includes('node_modules')) {
    const defaultFormat = await defaultGetFormat(
      url,
      context,
      defaultGetFormat,
    );
    if (defaultFormat.format === ModuleFormat.MODULE) return defaultFormat;

    return {
      format: ModuleFormat.DYNAMIC,
    };
  }

  // Let Node.js handle all other URLs.
  return defaultGetFormat(url, context, defaultGetFormat);
}

/**
 * Transforms the incoming source into raw ESNext code if possible
 * @param source Source passed from Node.JS
 * @param context
 * @param defaultTransformSource Default function passed by Node.JS if we don't want to handle this ourselves
 */
export async function transformSource(
  source: Source,
  context: TransformSourceContext,
  defaultTransformSource: TransformSourceHook,
): Promise<TransformSourceResponse> {
  if (extensionsRegex.test(context.url)) {
    return transpileTypeScript(source, context);
  }

  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
