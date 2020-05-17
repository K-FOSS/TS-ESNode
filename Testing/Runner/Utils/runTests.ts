// Testing/Runner/Utils/runTests.ts
import { Test } from './Test';
import { spawnWorker } from './Worker';

export interface Result {
  passed: boolean;

  err?: Error;
}

export function runTest(test: Test): Promise<Result> {
  const worker = spawnWorker(test.path, {
    helloWorld: ['test', 'test2'],
  });

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
