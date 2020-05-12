// Testing/Runner/Utils/runTests.ts
import { Test } from './Test';
import { spawnWorker } from './Worker';

export interface Result {
  passed: boolean;

  err?: Error;
}

export function runTest(test: Test): Promise<Result> {
  const worker = spawnWorker(test.path, {});

  return new Promise((resolve, reject) => {
    worker.on('exit', (exitCode) => {
      resolve({
        passed: true,
      });
    });

    worker.on('error', (err) => {
      resolve({
        passed: false,
        err,
      });
    });
  });
}
