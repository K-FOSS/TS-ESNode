import { createRequire } from 'module';
// src/testeLoader.ts
import { fileURLToPath, pathToFileURL } from 'url';

const importURL = new URL(import.meta.url);

const require = createRequire(import.meta.url);

try {
  const imports = require(fileURLToPath(
    importURL.searchParams.get('importPath')!,
  ));

  console.log(imports);
} catch {
  await import(importURL.searchParams.get('importPath')!);
}
