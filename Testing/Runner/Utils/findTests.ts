// Testing/Runner/Utils/findTests.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { run } from './run';
import { Test } from './Test';

/**
 * Path to Testing/Tests folder containing all the test folders.
 */
const testsPath = resolvePath(`Testing/Tests`);

export async function findTests(): Promise<Test[]> {
  const dirContents = await fs.readdir(testsPath, { withFileTypes: true });
  console.debug(`Finding tests.`);

  const tests: Test[] = [];
  const npmInstalls: Promise<unknown>[] = [];

  for (const dirContent of dirContents) {
    if (!dirContent.isDirectory()) continue;

    const testPath = resolvePath(testsPath, dirContent.name);
    const testPkgPath = resolvePath(testPath, 'package.json');

    const testPkgFile = await fs.readFile(testPkgPath);
    const testPkg = JSON.parse(testPkgFile.toString());

    const testMainPath = resolvePath(testPath, testPkg.main);

    tests.push({
      name: testPkg.name,
      nodeOptions: testPkg.NODE_OPTIONS,
      path: testMainPath,
    });

    npmInstalls.push(
      run('npm install', {
        cwd: testPath,
      }),
    );
  }

  await Promise.all(npmInstalls);

  return tests;
}
