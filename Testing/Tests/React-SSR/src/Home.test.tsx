// Testing/Tests/React-SSR/src/Home.test.ts
import React from 'react';
import { TestSuite } from '@k-foss/ts-estests';
import { strictEqual } from 'assert';
import { renderToStaticMarkup } from 'react-dom/server';

const htmlRenderedString =
  '<h1>Home</h1><button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" type="button"><span class="MuiButton-label">Primary</span></button>';

export class ReactSSRHomeSuite extends TestSuite {
  public testName = 'ReactSSR Suite - Home.tsx';

  public async test(): Promise<void> {
    const { Home } = await import('./Home');

    strictEqual(
      renderToStaticMarkup(<Home />),
      htmlRenderedString,
      'renderUI === htmlRenderedString',
    );
  }
}
