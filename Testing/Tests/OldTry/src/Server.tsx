// test/src/Server.tsx
import React from '@pika/react';
import { renderToStaticMarkup } from 'react-dom/server';

export async function renderUI(): Promise<string> {
  const [{ CoreApp }] = await Promise.all([import('./helloWorld')]);

  return renderToStaticMarkup(<CoreApp />);
}
