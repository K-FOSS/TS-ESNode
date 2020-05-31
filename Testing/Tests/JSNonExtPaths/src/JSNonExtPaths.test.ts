// Testing/Tests/JSNonExtPaths/src/JSNonExtPaths.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { add, divide } from '@paths/Utils/Math';

export class JSNonExtPathsSuite extends TestSuite {
  public testName = 'JSNonExtPaths Suite';

  public async test(): Promise<void> {
    strictEqual(add(1, 1), 2, 'add(1, 1) === 2');

    strictEqual(divide(2, 2), 1, 'divide(2, 2) === 1');

    const { testingSubPath } = await import('@paths/Module/HelloWorld');

    const addSub = await testingSubPath();
    strictEqual(addSub, 6, 'addSub === 6');

    const { randomModule } = await import('@paths/Module/Random');

    const randomResult = await randomModule();
    strictEqual(randomResult, 'random', 'randomResult === random');
  }
}
