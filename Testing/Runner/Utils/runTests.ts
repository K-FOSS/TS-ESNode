// Testing/Runner/Utils/runTests.ts
import { Test } from './Test';
import { spawnWorker } from './Worker';

export interface Result {
  passed: boolean;

  err?: Error;
}

export function runTest(test: Test): Promise<Result> {
  const worker = '';

  return new Promise((resolve) => {
    worker.on('exit', () => {
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
