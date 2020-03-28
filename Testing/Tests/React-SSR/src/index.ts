// Template/src/index.ts
import { renderUI } from './Server';

async function ssrServer(): Promise<void> {
  const htmlString = await renderUI();

  console.log(`HTML String to send to client: ${htmlString}`);
}

ssrServer();
