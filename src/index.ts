// src/index.ts
import { createRequire } from 'module';
import { basename, dirname, relative, resolve as resolvePath } from 'path';
import ts, { CompilerOptions } from 'typescript';
import { fileURLToPath, pathToFileURL } from 'url';
import { findFiles } from './findFiles';
import {
  DynamicInstantiateResponse,
  GetFormatHook,
  GetFormatResponse,
  GetSourceContext,
  GetSourceHook,
  GetSourceResponse,
  LoadContext,
  LoadResponse,
  ModuleFormat,
  ResolveContext,
  ResolveHook,
  ResolveResponse,
  Source,
  TransformContext,
  TransformResponse,
  TransformSourceHook,
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
  defaultResolve: ResolveHook,
): Promise<ResolveResponse> {
  const { parentURL = baseURL } = context;

  // let forceRelative = false;
  if (TSConfig?.paths) {
    for (const tsPath of Object.keys(TSConfig.paths)) {
      const tsPathKey = tsPath.replace('*', '');
      if (specifier.startsWith(tsPathKey)) {
        const tsResolvedPath = resolvePath(
          resolvePath(baseURL, TSConfig.baseUrl!),
          TSConfig.paths[tsPath][0].replace('*', specifier.split(tsPathKey)[1]),
        );

        specifier = `./${relative(
          dirname(fileURLToPath(parentURL)),
          tsResolvedPath,
        )}`;

        break;
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
      shortCircuit: true,
    };
  }

  /**
   * If no extension is passed and is a relative import then let's try to find a `.ts` or `.tsx` file at the path
   */
  if (relativePathRegex.test(specifier) && !hasExtensionRegex.test(fileName)) {
    const filePath = fileURLToPath(resolvedUrl);

    const file = await findFiles(dirname(filePath), {
      fileName,
      extensions,
    });

    return {
      url: file.href,
      shortCircuit: true,
    };
  }

  return defaultResolve(specifier, { ...context, parentURL }, defaultResolve);
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

const CommonJSMap = new Set<string>();

export async function getFormat(
  url: string,
  context: never,
  defaultGetFormat: GetFormatHook,
): Promise<GetFormatResponse> {
  let format = formatCache.get(url);
  if (format) return { format };

  const resolvedUrl = new URL(url);
  const fileName = basename(resolvedUrl.pathname);

  // If it's a TypeScript extension then force `module` mode.
  if (extensionsRegex.test(fileName)) format = 'module';

  if (!format) {
    const defaultResolve = await defaultGetFormat(
      url,
      context,
      defaultGetFormat,
    );
    format = defaultResolve.format;

    /**
     * We need to use our dynamic hook on Node.JS CommonJS `node_modules` due to
     * anything exported by TypeScript not being accepted by the exports check in Node
     */
    // if (url.includes('node_modules') && format === 'commonjs') {
    //   format = 'dynamic';
    // }
  }

  formatCache.set(url, format);

  if (format === 'commonjs') {
    format = 'module';

    CommonJSMap.add(url);
  }

  // Let Node.js handle all other URLs.
  return {
    format,
  };
}

export async function getSource(
  url: string,
  context: GetSourceContext,
  defaultGetSource: GetSourceHook,
): Promise<GetSourceResponse> {
  if (CommonJSMap.has(url)) {
    const urlParts = url.split('/node_modules/');

    // Extract the module name after node_modules.
    const moduleName = urlParts.pop()!;

    // With NPM, this is just top-level node_modules.
    // With PNPM, this is the innermost node_modules.
    const nodeModulesPath = urlParts.join('/node_modules/');

    // Create a require function next to node_module, and import the CommonJS module.
    const require = createRequire(`${nodeModulesPath}/noop.js`);
    const dynModule = require(moduleName);
    let isDefault = false;

    let defaultKeys: string[] = [];

    const moduleKeys = Object.keys(dynModule);

    if (dynModule.default) {
      if (dynModule.default !== dynModule) {
        isDefault = true;
        defaultKeys = Object.keys(dynModule.default).filter(
          (defaultKey) => !moduleKeys.includes(defaultKey),
        );
      }
    }

    // Export as ES Module.
    const linkKeys = Object.keys(dynModule).filter((key) => key !== 'default');

    const code = `
import {createRequire} from 'module';

const require = createRequire('${nodeModulesPath}/noop.js');
const cjs = require('${moduleName}');

${linkKeys
  .map((prop) => `let $${prop} = cjs[${JSON.stringify(prop)}];`)
  .join(';\n')}

${defaultKeys
  .map((prop) => `let $default${prop} = cjs.default[${JSON.stringify(prop)}];`)
  .join(';\n')}

export {
${linkKeys.map((prop) => ` $${prop} as ${prop},`).join('\n')}
}

export {
${defaultKeys.map((prop) => ` $default${prop} as ${prop},`).join('\n')}
}

${isDefault ? `export default cjs['default'];` : 'export default cjs;'}
`;

    return {
      source: code,
    };
  }

  return defaultGetSource(url, context, defaultGetSource);
}

export async function load(
  url: string,
  context: LoadContext,
  nextLoad: (specifier: string, context: LoadContext) => Promise<LoadResponse>,
): Promise<LoadResponse> {
  const resolvedUrl = new URL(url);
  const fileName = basename(resolvedUrl.pathname);

  let format = 'commonjs';

  if (extensionsRegex.test(fileName)) format = 'module';

  const response = await nextLoad(url, context);

  if (format === 'module') {
    const sourceFilePath = fileURLToPath(url);

    // Load the closest `tsconfig.json` to the source file
    const tsConfig = await getTSConfig(dirname(sourceFilePath));
    TSConfig = tsConfig;

    // Transpile the source code that Node passed to us.
    const transpiledModule = ts.transpileModule(response.source.toString(), {
      compilerOptions: TSConfig,
      reportDiagnostics: true,
      fileName: resolvedUrl.pathname,
      moduleName: fileName,
    });

    return {
      format: 'module',
      source: transpiledModule.outputText,
      shortCircuit: true,
    };
  }

  if (response.format === 'commonjs') {
    const urlParts = url.split('/node_modules/');

    // Extract the module name after node_modules.
    const moduleName = urlParts.pop()!;

    const nodeModulesPath = urlParts.join('/node_modules/');

    // Create a require function next to node_module, and import the CommonJS module.
    const require = createRequire(`${nodeModulesPath}/noop.js`);
    const dynModule = require(moduleName);
    let isDefault = false;

    let defaultKeys: string[] = [];

    const moduleKeys = Object.keys(dynModule);

    if (dynModule.default) {
      if (dynModule.default !== dynModule) {
        isDefault = true;
        defaultKeys = Object.keys(dynModule.default).filter(
          (defaultKey) => !moduleKeys.includes(defaultKey),
        );
      }
    }

    // Export as ES Module.
    const linkKeys = Object.keys(dynModule).filter((key) => key !== 'default');

    return {
      format: 'module',
      source: `
      import {createRequire} from 'module';
      
      const require = createRequire('${nodeModulesPath}/noop.js');
      const cjs = require('${moduleName}');
      
      ${linkKeys
        .map((prop) => `let $${prop} = cjs[${JSON.stringify(prop)}];`)
        .join(';\n')}
      
      ${defaultKeys
        .map(
          (prop) =>
            `let $default${prop} = cjs.default[${JSON.stringify(prop)}];`,
        )
        .join(';\n')}
      
      export {
      ${linkKeys.map((prop) => ` $${prop} as ${prop},`).join('\n')}
      }
      
      export {
      ${defaultKeys.map((prop) => ` $default${prop} as ${prop},`).join('\n')}
      }
      
      ${isDefault ? `export default cjs['default'];` : 'export default cjs;'}
      `,
      shortCircuit: false,
    };
  }

  return response;
}

export async function transformSource(
  source: Source,
  context: TransformContext,
  defaultTransformSource: TransformSourceHook,
): Promise<TransformResponse> {
  const resolvedUrl = new URL(context.url);
  const fileName = basename(resolvedUrl.pathname);

  // Only transform TypeScript Modules
  if (extensionsRegex.test(fileName)) {
    const sourceFilePath = fileURLToPath(context.url);

    // Load the closest `tsconfig.json` to the source file
    const tsConfig = await getTSConfig(dirname(sourceFilePath));
    TSConfig = tsConfig;

    // Transpile the source code that Node passed to us.
    const transpiledModule = ts.transpileModule(source.toString(), {
      compilerOptions: TSConfig,
      reportDiagnostics: true,
      fileName: resolvedUrl.pathname,
      moduleName: fileName,
    });

    return {
      source: transpiledModule.outputText,
    };
  }

  // Defer to Node.js for all other sources.
  return defaultTransformSource(source, context, defaultTransformSource);
}
