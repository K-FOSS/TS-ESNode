// Testing/Tests/DotImport/src/DotImport.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class DotImportSuite extends TestSuite {
  public testName = 'DotImport Tests';

  public async test(): Promise<void> {
    const { helloString } = await import('.');

    strictEqual(helloString, 'helloWorld');
  }
}
