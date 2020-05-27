// src/Utils.ts
import { promises as fs } from 'fs';
import { dirname, isAbsolute as isAbsolutePath } from 'path';
import ts, { CompilerOptions } from 'typescript';

let tsConfigCache: CompilerOptions;

export async function getTSConfig(
  modulePath: string,
): Promise<CompilerOptions> {
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
    const jsonText = await fs.readFile(tsConfigPath);
    const result = ts.parseJsonText(tsConfigPath, jsonText.toString());

    tsConfigCache = ts.parseJsonSourceFileConfigFileContent(
      result,
      ts.sys,
      dirname(tsConfigPath),
    ).options;
  }

  return tsConfigCache;
}
