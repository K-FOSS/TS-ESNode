// Testing/Tests/SimilarFindFileFolder/src/Library/React.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class SimilarFileReactSuite extends TestSuite {
  public testName = 'SimilarFileFinder - React.ts Suite';

  public async test(): Promise<void> {
    const { helloWorld } = await import('./React');

    strictEqual(helloWorld, 'helloWorld', 'helloWorld === helloWorld');
  }
}
