// src/Library/transpileSource.ts
import { isMainThread, workerData, Worker, parentPort } from 'worker_threads';
import {
  Source,
  TransformSourceContext,
  TransformSourceResponse,
} from '../types';
import { fileURLToPath } from 'url';
import { getTSConfig } from '../Utils';
import { dirname } from 'path';
import ts from 'typescript';

export function transpileTypeScript(
  source: Source,
  context: TransformSourceContext,
): Promise<TransformSourceResponse> {
  if (!isMainThread) throw new Error('Function only open to main Thread!');

  return new Promise((resolve, reject) => {
    const worker = new Worker(fileURLToPath(import.meta.url), {
      workerData: {
        source,
        context,
      },
    });

    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

if (!isMainThread) {
  if (!parentPort) throw new Error('Parent socket not opened to worker');

  const { source, context } = workerData as {
    source: Source;
    context: TransformSourceContext;
  };

  const sourceFilePath = fileURLToPath(context.url);

  // Load the closest `tsconfig.json` to the source file
  const tsConfig = getTSConfig(dirname(sourceFilePath));

  // Transpile the source code that Node passed to us.
  const transpiledModule = ts.transpileModule(source.toString(), {
    compilerOptions: tsConfig,
    reportDiagnostics: true,
  });

  parentPort.postMessage({
    source: transpiledModule.outputText,
  });
}
