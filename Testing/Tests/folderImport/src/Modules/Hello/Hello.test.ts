// Testing/Tests/folderImport/src/Modules/Hello/Hello.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class FolderImportSuite extends TestSuite {
  public testName = 'FolderImport - Hello Tests';

  public async test(): Promise<void> {
    const { helloMessage } = await import('.');

    strictEqual(helloMessage, 'Hello, World!');
  }
}
