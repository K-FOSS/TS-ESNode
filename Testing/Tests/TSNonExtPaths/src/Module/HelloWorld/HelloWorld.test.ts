// Testing/Tests/TSNonExtPaths/src/Modules/HelloWorld/HelloWorld.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { deepStrictEqual, strictEqual } from 'assert';

export class TSNonExtPathHelloWorldSuite extends TestSuite {
  public testName = 'TSNonExtPaths - Modules/HelloWorld/index.ts Suite';

  public async test(): Promise<void> {
    const [importPath, importRelative, importDot] = await Promise.all([
      import('@paths/Module/HelloWorld'),
      import('./'),
      import('.'),
    ]);

    deepStrictEqual(
      importPath,
      importRelative,
      'importPath === importRelative',
    );
    deepStrictEqual(importPath, importDot, 'importPath === importDot');
    deepStrictEqual(importRelative, importDot, 'importRelative === importDot');

    strictEqual(
      await importPath.testingSubPath(),
      6,
      'importPath.testingSubPath() === 6',
    );
  }
}
