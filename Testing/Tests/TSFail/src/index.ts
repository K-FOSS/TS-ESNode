// Testing/Tests/TSFail/src/index.ts
import { equal, throws } from 'assert';
import { add } from '../pepsi/test';

async function runTest(): Promise<void> {
  console.log('Starting TSFail Test');

  const goodAdd = await add(1, 5);
  equal(goodAdd, 6);

  const badAdd = add('5', '1');
  throws(() => add('5', '1'), 'Bad Add');
}

runTest();

/**
 * Insert example/test here
 */
console.log('Hello World');
