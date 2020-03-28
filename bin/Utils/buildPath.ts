// bin/Utils/buildPath.ts
import { resolve as resolvePath } from 'path';
import ts from 'typescript';
import { reportDiagnostic, reportSolutionBuilderStatus } from './Logging/index';
import { tsSys } from './tsSystem';

/**
 * Builds a source path
 * @param srcStr Source Files Path
 * @param watch Start a watcher to compile on file change
 */
export async function buildPath(
  srcStr: string,
  watch = false,
): Promise<number | void> {
  const srcPath = resolvePath(srcStr);

  let tsConfigPath = ts.findConfigFile(
    srcPath,
    ts.sys.fileExists,
    'tsconfig.json',
  );
  if (!tsConfigPath) tsConfigPath = resolvePath('tsconfig.json');

  /**
   * TypeScript Program to use
   */
  const createProgram = ts.createSemanticDiagnosticsBuilderProgram;

  if (watch) {
    const host = ts.createWatchCompilerHost(
      tsConfigPath,
      {},
      tsSys,
      createProgram,
    );

    ts.createWatchProgram(host);
  } else {
    const host = ts.createSolutionBuilderHost(
      tsSys,
      undefined,
      reportDiagnostic,
      reportSolutionBuilderStatus,
    );
    const solution = ts.createSolutionBuilder(host, [tsConfigPath], {
      verbose: true,
    });

    solution.build(srcStr);
  }
}
