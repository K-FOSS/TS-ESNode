// Testing/Tests/JSNonExtPaths/src/Utils/Math.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class JSNonExtPathsMathSuite extends TestSuite {
  public testName = 'JSNonExtPaths - Math.ts Tests';

  public async test(): Promise<void> {
    const { add, divide } = await import('./Math');

    strictEqual(add(1, 1), 2, 'add(1, 1) === 2');
    strictEqual(add(1, 2), 3, 'add(1, 2) === 3');

    strictEqual(divide(1, 1), 1, 'divide(1, 1) === 1');
    strictEqual(divide(2, 2), 1, 'divide(2, 2) === 1');
  }
}
