import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export async function renderApp(): Promise<string> {
  const { CoreApp } = await import('./helloWorld');

  return renderToStaticMarkup(<CoreApp />);
}
