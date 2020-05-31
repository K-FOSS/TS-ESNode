// Testing/Tests/TSConfig/src/TSConfig.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { renderModule } from './Render';
import { strictEqual } from 'assert';
import { resolve } from 'path';

export class TSConfigTestSuite extends TestSuite {
  public testName = 'TSConfig Suite';

  public async test(): Promise<void> {
    const { App } = await import('./App');

    strictEqual(
      await renderModule(App),
      '<div>HelloAppWorld</div>',
      'renderModule(App)',
    );

    process.env.TS_CONFIG_PATH = resolve(
      'Testing/Tests/TSConfig/tsconfig.random.json',
    );

    const { Main } = await import('./Main');

    strictEqual(await renderModule(Main), '<div><h1>Title!</h1></div>');

    // Coding in TS for over a year, first time I've *needed* to use delete;
    delete process.env.TS_CONFIG_PATH;
  }
}
