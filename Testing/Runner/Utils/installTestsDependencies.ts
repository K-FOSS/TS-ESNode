// Testing/Runner/Utils/installTestsDependencies.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { run } from './run';

/**
 * Path to Testing/Tests folder containing all the test folders.
 */
const testsPath = resolvePath(`Testing/Tests`);

export async function installTestsDependencies(): Promise<void[]> {
  const dirContents = await fs.readdir(testsPath, { withFileTypes: true });
  console.debug(`Finding tests.`);

  const npmInstalls: Promise<void>[] = [];

  for (const dirContent of dirContents) {
    if (!dirContent.isDirectory()) continue;

    npmInstalls.push(
      run('npm install', {
        cwd: resolvePath(testsPath, dirContent.name),
      }),
    );
  }

  return Promise.all(npmInstalls);
}
