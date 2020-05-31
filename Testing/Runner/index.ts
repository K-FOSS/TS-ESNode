// Testing/Runner/index.ts
import { installTestsDependencies } from './Utils/installTestsDependencies';
import { run } from './Utils/run';
import { promises as fs } from 'fs';

async function runTests(): Promise<void> {
  await installTestsDependencies();

  try {
    await fs.symlink(process.cwd(), 'node_modules/@k-foss/ts-esnode', 'dir');
  } catch {}

  await run('npx ts-estest ./Testing/Tests', {
    cwd: process.cwd(),
  });
}

runTests();
