// src/findFiles.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { pathToFileURL, URL } from 'url';
import { findRealFilePath } from './findRealFilePath';

type FIND_MODE = 'READ_DIR' | 'REAL_PATH';

interface FileRule {
  fileName: string;
  extensions: string[];
}

type Finder = (cwd: string, fileRules: FileRule) => Promise<string | undefined>;

const finder: { [mode in FIND_MODE]: Finder } = {
  READ_DIR: findFileReadDir,
  REAL_PATH: findRealFilePath
};

const findMode: FIND_MODE = (process.env.FIND_MODE as FIND_MODE) || 'READ_DIR';

async function findFileReadDir(
  cwd: string,
  { fileName, extensions }: FileRule
): Promise<string | undefined> {
  const directoryFiles = await fs.readdir(cwd);

  const matchedFiles = directoryFiles.filter(directoryFileName =>
    extensions.includes(directoryFileName.split(fileName)[1])
  );
  if (matchedFiles.length > 1 || matchedFiles.length < 1) return undefined;

  return resolvePath(cwd, matchedFiles[0]);
}

export async function findFiles(
  cwd: string,
  fileRules: FileRule
): Promise<URL> {
  const filePath = await finder[findMode](cwd, fileRules);
  if (!filePath) throw new Error('No files found by finder');

  return pathToFileURL(filePath);
}
