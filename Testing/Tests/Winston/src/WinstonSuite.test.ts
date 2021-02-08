// Template/src/index.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

export class WinstonTestSuite extends TestSuite {
  public testName = 'Winston Suite';

  public async test(): Promise<void> {
    const test = await import('winston');

    console.log('Winston ', test);

    strictEqual('helloWorld', 'helloWorld', 'helloWorld === helloWorld');
  }
}
