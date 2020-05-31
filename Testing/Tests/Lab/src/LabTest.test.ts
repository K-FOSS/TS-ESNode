// Testing/Tests/Lab/src/Lab.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class LabSuite extends TestSuite {
  public testName = 'Lab Suite';

  public async test(): Promise<void> {
    const { add, divide } = await import('./Utils/Math');

    strictEqual(add(1, 1), 2, 'add(1, 1) === 2');

    strictEqual(divide(2, 2), 1, 'divide(2, 2) === 1');
  }
}
