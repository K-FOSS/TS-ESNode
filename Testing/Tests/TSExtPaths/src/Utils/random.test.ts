// Testing/Tests/TSExtPaths/src/Utils/random.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { sayRandom } from './random';

export class RandomTest extends TestSuite {
  public testName = 'random.ts Test';

  public async test(): Promise<void> {
    strictEqual(sayRandom(), 'random', 'sayRandom() === random');
  }
}
