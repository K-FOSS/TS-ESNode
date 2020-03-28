// Testing/Runner/index.ts
import { findTests } from './Utils/findTests';
import { runTest, Result } from './Utils/runTests';

interface TestResults extends Result {
  name: string;
}

async function runTests(): Promise<void> {
  console.debug(`Running Tests`);

  const tests = await findTests();
  const results: TestResults[] = [];

  for (const test of tests) {
    const testResult = await runTest(test);
    console.log(`Result of ${test.name}: `, testResult);

    results.push({
      name: test.name,
      ...testResult,
    });
  }

  console.log('Results', results);

  const failedTests = results.some(({ passed }) => !passed);
  if (failedTests) process.exit(1);
}

runTests();
