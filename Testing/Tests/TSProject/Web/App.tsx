// Testing/Tests/TSProject/Web/App.tsx
import React, { useState, useCallback, lazy, Suspense } from 'react';

const HomeRoute = lazy(() => import('./Routes/Home'));

export function App(): React.ReactElement {
  const [value, setValue] = useState(false);

  const handleClick = useCallback(
    () => setValue((currentValue) => !currentValue),
    [setValue],
  );

  return (
    <main>
      <h1>App</h1>

      <h2>State: {value.valueOf}</h2>

      <button onClick={handleClick}>Click me</button>

      <Suspense fallback={<div>HelloWorld</div>}>
        <HomeRoute />
      </Suspense>
    </main>
  );
}
