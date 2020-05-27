// src/Utils.ts
import ts, { CompilerOptions } from 'typescript';
import { isAbsolute as isAbsolutePath, dirname as pathDirname } from 'path';

let tsConfigCache: CompilerOptions;

export function getTSConfig(modulePath: string): CompilerOptions {
  const tsConfigPath =
    process.env.TS_CONFIG_PATH ??
    ts.findConfigFile(modulePath, ts.sys.fileExists);

  if (!tsConfigPath || !isAbsolutePath(tsConfigPath)) {
    // If no `tsconfig.json` then we force the module to be transpiled as `ESNext`
    tsConfigCache = {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      allowJs: true,
      skipLibCheck: true,
    };
  } else {
    const tsConfigFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile)
      .config;

    tsConfigCache = ts.convertCompilerOptionsFromJson(
      tsConfigFile.compilerOptions,
      pathDirname(tsConfigPath),
    ).options;
  }

  return tsConfigCache;
}
