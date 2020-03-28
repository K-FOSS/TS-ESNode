// React-SSR/src/App.tsx
import React from 'react';
import { Home } from './Home';

export function App(): React.ReactElement {
  return (
    <>
      <h1>Hello World</h1>
      <p>I'm an example application</p>
      <Home />
    </>
  );
}
