// Testing/Tests/TSNonExtPaths/src/Module/Random/Random.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { deepStrictEqual } from 'assert';

export class TSNonExtPathRandomSuite extends TestSuite {
  public testName = 'TSNonExtPaths - Modules/Random/index.ts Suite';

  public async test(): Promise<void> {
    const [{ sayRandom }, importRelative, importDot] = await Promise.all([
      import('random'),
      import('./'),
      import('.'),
    ]);

    deepStrictEqual(importRelative, importDot, 'importRelative === importDot');

    deepStrictEqual(
      sayRandom(),
      await importRelative.randomModule(),
      'sayRandom() === importRelative.randomModule()',
    );

    deepStrictEqual(
      await importRelative.randomModule(),
      await importDot.randomModule(),
      'importRelative.randomModule() === importDot.randomModule()',
    );
  }
}
