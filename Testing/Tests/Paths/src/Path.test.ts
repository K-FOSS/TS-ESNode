// Testing/Tests/Paths/src/Paths.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { add, divide } from '@paths/Utils/Math';

export class PathsSuite extends TestSuite {
  public testName = 'Paths Suite';

  public async test(): Promise<void> {
    strictEqual(add(1, 1), 2, 'add(1, 1) === 2');

    strictEqual(divide(2, 2), 1, 'divide(2, 2) === 1');

    const { testingSubPath } = await import('@paths/Module/HelloWorld');

    const addSub = await testingSubPath();
    strictEqual(addSub, 6, 'addSub === 6');
  }
}
