// Testing/Tests/Axios/src/Axios.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { add, divide } from './Utils/Math';

export class TSExtPathsTest extends TestSuite {
  public testName = 'TSExtPaths Test';

  public async test(): Promise<void> {
    const sum = add(1, 1);
    strictEqual(sum, 2, 'add(1, 1) === 2');

    const divideResult = divide(2, 2);
    strictEqual(divideResult, 1, 'divide(2, 2) === 1');

    const { testingSubPath } = await import('@paths/Module/HelloWorld');

    const addSub = await testingSubPath();
    strictEqual(addSub, 6, 'addSub === 6');

    const { randomModule } = await import('@paths/Module/Random');

    const randomResult = await randomModule();
    console.log('randomResult: ', randomResult);

    strictEqual(randomResult, 'random', 'randomResult === random');
  }
}
