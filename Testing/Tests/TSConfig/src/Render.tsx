// Testing/Tests/TSConfig/src/Render.tsx
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

export async function renderModule(
  Component: () => React.ReactElement,
): Promise<string> {
  return renderToStaticMarkup(<Component />);
}
