// Testing/Tests/Lab/src/index.ts
import { add, divide } from '@paths/Utils/Math';
import { strictEqual } from 'assert';

export async function startApp(): Promise<void> {
  console.debug('Starting Application');

  const sum = add(1, 1);
  strictEqual(sum, 2);

  const divideResult = divide(2, 2);
  strictEqual(divideResult, 1);

  const { testingSubPath } = await import('@paths/Module/HelloWorld');

  const addSub = await testingSubPath();
  strictEqual(addSub, 6);

  console.debug('Done');
}

startApp();
