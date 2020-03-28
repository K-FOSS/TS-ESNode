// Testing/Tests/Lab/src/index.ts
import { add, divide } from './Utils/Math';
import { equal } from 'assert';

export async function startApp(): Promise<void> {
  console.debug('Starting Application');

  const sum = add(1, 1);
  equal(sum, 2);

  const divideResult = divide(2, 2);
  equal(divideResult, 1);

  console.debug('Done');
}

startApp();
