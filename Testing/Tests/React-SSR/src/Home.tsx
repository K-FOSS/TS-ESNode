// React-SSR/src/Home.tsx
import React from 'react';
import Button from '@material-ui/core/Button';

export function Home(): React.ReactElement {
  return (
    <>
      <h1>Home</h1>

      <Button variant="contained" color="primary">
        Primary
      </Button>
    </>
  );
}
