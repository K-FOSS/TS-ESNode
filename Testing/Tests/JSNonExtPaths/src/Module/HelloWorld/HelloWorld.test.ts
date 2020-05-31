// Testing/Tests/JSNonExtPaths/src/Module/HelloWorld/HelloWorld.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class JSNonExtPathsHelloWorldSuite extends TestSuite {
  public testName = 'JSNonExtPaths - HelloWorld Tests';

  public async test(): Promise<void> {
    const { testingSubPath } = await import('.');

    strictEqual(await testingSubPath(), 6, 'testingSubPath() === 6');
  }
}
