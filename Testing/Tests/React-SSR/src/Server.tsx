// React-SSR/src/Server.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from './App';

export async function renderUI(): Promise<string> {
  const { App } = await import('./App');

  console.log(<App />);

  return renderToStaticMarkup(<App />);
}
