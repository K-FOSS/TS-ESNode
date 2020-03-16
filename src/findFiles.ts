// src/findFiles.ts
import { promises as fs } from 'fs';
import { resolve as resolvePath } from 'path';
import { pathToFileURL, URL } from 'url';

/**
 * Extensions for JavaScript files.
 */
const JS_EXTS = ['.js', '.jsx', ''];

/**
 * Rules for finding files
 */
interface FileRule {
  /**
   * File name we are looking for
   */
  fileName: string;

  /**
   * Possible extensions we are allowed to return
   */
  extensions: string[];
}

/**
 * Cache for directory files so we aren't readdiring on every import of the same directory
 */
const directoryCache = new Map<string, string[]>();

/**
 *
 * @param cwd Path to directory
 * @param fileRules
 */
export async function findFiles(
  path: string,
  { extensions, fileName }: FileRule,
): Promise<URL> {
  // Get directory files from cache if possible.
  let directoryFiles = directoryCache.get(path);

  if (!directoryFiles) {
    // Read directory files if no cached data already exists
    directoryFiles = await fs.readdir(path);
    if (!directoryFiles) throw new Error(`No files found at directory ${path}`);

    // Cache the found files
    directoryCache.set(path, directoryFiles);
  }

  // TODO: Better file finder algorithm
  // Filter the diretory files to only thoose with passed extenison and `.js` or `.jsx`
  const matchedFiles = directoryFiles.filter((directoryFileName) =>
    [...extensions, ...JS_EXTS].includes(directoryFileName.split(fileName)[1]),
  );

  // If the are less or more then one search result then throw error
  if (matchedFiles.length !== 1)
    throw new Error(`Invalid file. ${fileName} not found at path: ${path}`);

  return pathToFileURL(resolvePath(path, matchedFiles[0]));
}
