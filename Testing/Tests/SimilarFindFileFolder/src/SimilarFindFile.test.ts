// Testing/Tests/SimilarFindFileFolder/src/SimilarFindFile.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class SimilarFileReactSuite extends TestSuite {
  public testName = 'SimilarFileFinder Suite';

  public async test(): Promise<void> {
    const { helloWorld } = await import('./Library/React');

    strictEqual(helloWorld, 'helloWorld', 'helloWorld === helloWorld');

    const { stuff } = await import('./Library/ReactFlight');

    strictEqual(await stuff(), 'reactFlight', 'stuff() === reactFlight');
  }
}
