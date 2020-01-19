// src/findRealFilePath.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';

interface FileMatch {
  fileName: string;
  extensions: string[];
}

export async function findRealFilePath(
  cwd: string,
  { fileName, extensions }: FileMatch
): Promise<string | undefined> {
  let filePath: string | undefined = undefined;
  for (const extension of extensions) {
    try {
      filePath = await fs.realpath(resolvePath(cwd, `${fileName}${extension}`));
      break;
    } catch {
      continue;
    }
  }

  return filePath;
}
