// Testing/Tests/Fastify/src/Utils/moduleFileFinder.ts
import { promises as fs } from 'fs';
import { resolvePath } from '@test/fastify/Utils/resolvePath';
import { resolve } from 'path';
import { pathToFileURL } from 'url';

type FileMatcher = RegExp;

const coreModulesDir = resolvePath('../Modules', import.meta.url);

/**
 * Finds module files that match the fileMatcher
 * @param
 */
export async function findModuleFiles<T>(
  fileMatcher: FileMatcher,
  rootDir: string = coreModulesDir,
): Promise<T[]> {
  async function processDirectory(directoryPath: string): Promise<T[]> {
    const directoryContents = await fs.readdir(directoryPath, {
      encoding: 'utf-8',
      withFileTypes: true,
    });

    return Promise.all(
      directoryContents.flatMap((directoryContent) => {
        const contentPath = resolve(directoryPath, directoryContent.name);

        if (directoryContent.isDirectory()) {
          return processDirectory(contentPath);
        }

        if (fileMatcher.test(directoryContent.name) === true) {
          return import(pathToFileURL(contentPath).href) as Promise<T>;
        }

        return [];
      }),
    );
  }

  return (await processDirectory(rootDir)).flat(500);
}
