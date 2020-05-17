// Testing/Runner/Utils/findTests.ts
import { promises as fs, Dirent } from 'fs';
import { resolve as resolvePath, dirname } from 'path';
import { run } from './run';
import { Test } from './Test';

/**
 * Path to Testing/Tests folder containing all the test folders.
 */
const testsPath = resolvePath(`Testing/Tests`);

export async function findTests(): Promise<Test[]> {
  console.debug(`Finding tests.`);
  const npmInstalls: Promise<unknown>[] = [];

  async function processDir(dirPath: string): Promise<Test[]> {
    const directoryContents = await fs.readdir(dirPath, {
      withFileTypes: true,
      encoding: 'utf-8',
    });

    const tests = await Promise.all(
      directoryContents.map(async (dirContent) => {
        const contentName = dirContent.name;
        const contentPath = resolvePath(dirPath, contentName);

        if (contentName === 'node_modules') return [];

        if (dirContent.isDirectory()) {
          return processDir(contentPath);
        }

        if (contentName === 'package.json') {
          const { name } = await import(contentPath);
          npmInstalls.push(
            run('npm install', {
              cwd: dirname(contentPath),
            }),
          );

          return new Test({
            name,
            path: contentPath,
          });
        }

        return [];
      }),
    );

    return tests.flat(5);
  }

  const tests = await processDir(testsPath);
  await Promise.all(npmInstalls);

  return tests;
}
