// Template/src/index.ts
import { renderUI } from './Server';
import { match } from 'assert';

const htmlRenderedString =
  '<h1>Hello World</h1><p>I&#x27;m an example application</p><h1>Home</h1><button class="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary" tabindex="0" type="button"><span class="MuiButton-label">Primary</span></button>';

async function ssrServer(): Promise<void> {
  const htmlString = await renderUI();

  match(htmlString, new RegExp(htmlRenderedString));

  console.log(`HTML String to send to client: ${htmlString}`);
}

ssrServer();
