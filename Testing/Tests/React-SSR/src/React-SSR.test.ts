// Testing/Tests/React-SSR/src/React-SSR.test.ts
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';

const htmlRenderedString =
  '<h1>Hello World</h1><p>I&#x27;m an example application</p><h1>Home</h1><button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" type="button"><span class="MuiButton-label">Primary</span></button>';

export class ReactSSRSuite extends TestSuite {
  public testName = 'ReactSSR Suite';

  public async test(): Promise<void> {
    const { renderUI } = await import('./Server');

    strictEqual(
      await renderUI(),
      htmlRenderedString,
      'renderUI === htmlRenderedString',
    );
  }
}
