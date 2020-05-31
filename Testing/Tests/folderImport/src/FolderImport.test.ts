// Testing/Tests/folderImport/src/FolderImport.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class FolderImportSuite extends TestSuite {
  public testName = 'FolderImport Suite';

  public async test(): Promise<void> {
    const [{ helloMessage }, { sayHello }] = await Promise.all([
      import('./Modules/Hello'),
      import('./Modules/Random'),
    ]);

    strictEqual(sayHello(), helloMessage, 'sayHello() === helloMessage');
  }
}
