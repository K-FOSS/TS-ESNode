// Testing/Runner/Utils/findTests.ts
import { promises as fs } from 'fs';
import { resolve } from 'path';
import { resolvePath } from './resolvePath';

interface TestFolder {
  testName: string;

  testFolderPath: string;
}

export async function findTestFolders(): Promise<TestFolder[]> {
  const testsFolderPath = resolvePath('../../Tests/', import.meta.url);

  const testFolders = await fs.readdir(testsFolderPath, {
    encoding: 'utf-8',
    withFileTypes: false,
  });

  return Promise.all(
    testFolders.map(async (testFolderName) => {
      const testFolderPath = resolve(testsFolderPath, testFolderName);

      try {
        const packageJSONFile = await fs.readFile(
          resolve(testFolderPath, 'package.json'),
        );

        const packageJSON = JSON.parse(packageJSONFile.toString());

        return {
          testName: packageJSON.name,
          testFolderPath: testFolderPath,
        } as TestFolder;
      } catch {
        return undefined;
      }
    }),
  );
}
