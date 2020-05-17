// src/Utils/Worker.ts
import { Worker, WorkerOptions } from 'worker_threads';
import { resolvePath } from './resolvePath';
import { pathToFileURL } from 'url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SubWorkerData = { [key: string]: any };

export function spawnWorker(
  path: string,
  workerData: SubWorkerData,
  options: WorkerOptions = {},
): Worker {
  const transpileURL = pathToFileURL(path);

  for (const dataKey of Object.keys(workerData)) {
    transpileURL.searchParams.set(dataKey, workerData[dataKey]);
  }

  const transpileWorker = new Worker(
    resolvePath('./workerEntry.js', import.meta.url),
    {
      workerData: {
        workerPath: transpileURL.href,
      },
      execArgv: [...process.execArgv],
      ...options,
    },
  );

  return transpileWorker;
}

export function getWorkerData(importUrlString: string): SubWorkerData {
  const importUrl = new URL(importUrlString);

  // eslint-disable-next-line prefer-const
  let workerData: SubWorkerData = {};

  for (const [searchKey, searchData] of importUrl.searchParams.entries()) {
    workerData[searchKey] = searchData;
  }

  return workerData;
}
