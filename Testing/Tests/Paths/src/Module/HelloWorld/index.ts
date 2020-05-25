// Testing/Tests/src/Module/HelloWorld/index.ts
import { add } from '@paths/Utils/Math';

export async function testingSubPath(): Promise<number> {
  return add(1, 5);
}
