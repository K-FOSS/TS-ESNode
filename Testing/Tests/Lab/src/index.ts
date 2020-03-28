// Testing/Tests/Lab/src/index.ts
import { add, divide } from './Utils/Math';

export async function startApp(): Promise<void> {
  console.debug('Starting Application');

  const sum = add(1, 1);
  if (sum !== 2) throw new Error(`add(1, 1) !== 2`);

  const divideResult = divide(2, 2);
  if (divideResult !== 1) throw new Error(`divide(2, 2) !== 1`);

  console.debug('Done');
}

startApp();
