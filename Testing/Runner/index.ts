// Testing/Runner/index.ts
import { findTests } from './Utils/findTests';
import { runTest, Result } from './Utils/runTests';
import { run } from './Utils/run';
import { dirname } from 'path';

interface TestResults extends Result {
  name: string;
}

async function runTests(): Promise<void> {
  console.debug(`Running Tests`);

  const tests = await findTests();

  console.time();

  const results = await Promise.all(
    tests.map(async (test) => {
      const exec = await run('npm start', {
        cwd: dirname(test.path),
      });

      console.log(exec);

      return {
        name: test.name,
      };
    }),
  );
  console.timeEnd();

  console.log('Results', results);

  // const failedTests = results.some(({ passed }) => !passed);
  // if (failedTests) process.exit(1);
}

runTests();
