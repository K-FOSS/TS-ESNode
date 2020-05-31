// Testing/Tests/SimilarFindFileFolder/src/Library/ReactFlight/ReactFlight.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class SimilarFileReactFlightSuite extends TestSuite {
  public testName = 'SimilarFileFinder - ReactFlight/index.ts Suite';

  public async test(): Promise<void> {
    const { stuff } = await import('./index');

    strictEqual(await stuff(), 'reactFlight', 'stuff() === reactFlight');
  }
}
