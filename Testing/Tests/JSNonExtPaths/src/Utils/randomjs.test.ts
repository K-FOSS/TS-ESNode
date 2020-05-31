// Testing/Tests/JSNonExtPaths/src/Utils/randomjs.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { sayRandom } from './random';

export class RandomJSSuite extends TestSuite {
  public testName = 'JSNonExtPaths - Random.js Tests';

  public async test(): Promise<void> {
    strictEqual(sayRandom(), 'random', 'sayRandom() === random');
  }
}
