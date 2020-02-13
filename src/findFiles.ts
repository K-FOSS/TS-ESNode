// src/findFiles.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { pathToFileURL, URL } from 'url';

const JS_EXTS = ['.js', '.jsx'];

interface FileRule {
  fileName: string;
  extensions: string[];
}

async function findFileReadDir(
  cwd: string,
  { fileName, extensions }: FileRule,
): Promise<string | undefined> {
  // Get all files in a directory
  const directoryFiles = await fs.readdir(cwd);

  // Filter the diretory files to only thoose with passed extenison and `.js` or `.jsx`
  const matchedFiles = directoryFiles.filter((directoryFileName) =>
    [...extensions, ...JS_EXTS].includes(directoryFileName.split(fileName)[1]),
  );
  if (matchedFiles.length > 1 || matchedFiles.length < 1) return undefined;

  return resolvePath(cwd, matchedFiles[0]);
}

export async function findFiles(
  cwd: string,
  fileRules: FileRule,
): Promise<URL> {
  const filePath = await findFileReadDir(cwd, fileRules);
  if (!filePath) throw new Error('No files found by finder');

  return pathToFileURL(filePath);
}
