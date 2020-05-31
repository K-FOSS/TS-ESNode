// Template/src/index.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class TemplateSuite extends TestSuite {
  public testName = 'Template Suite';

  public async test(): Promise<void> {
    strictEqual('helloWorld', 'helloWorld', 'helloWorld === helloWorld');
  }
}
