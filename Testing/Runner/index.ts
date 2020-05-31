// Testing/Runner/index.ts
import { WorkerController } from '@k-foss/ts-estests/dist/Modules/Worker/WorkerController';
import { resolve } from 'path';
import { installTestsDependencies } from './Utils/installTestsDependencies';
import { run } from './Utils/run';

const testRoot = resolve('Testing/Tests');

async function runTests(): Promise<void> {
  await installTestsDependencies();

  run('npx ts-estest ./Testing/Tests', {
    cwd: process.cwd(),
  });
}

runTests();
