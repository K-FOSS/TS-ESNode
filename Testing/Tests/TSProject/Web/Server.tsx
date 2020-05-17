// Testing/Tests/TSProject/Web/Server.tsx
import React from 'react';
import { renderToString } from 'react-dom/server';

/**
 * Renders the requested urlPath and returns the HTML
 */
export async function renderPath(): Promise<string> {
  const { App } = await import('./App');

  const UI = (
    <>
      <App />
    </>
  );

  return renderToString(UI);
}
