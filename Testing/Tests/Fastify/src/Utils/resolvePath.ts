// Testing/Tests/Fastify/src/Utils/resolvePath.ts
import { resolve } from 'path';
import { fileURLToPath } from 'url';

/**
 * Resolve the full path of a path
 * @param path Source file path
 * @param parentUrl Parent URL
 */
export function resolvePath(path: string, parentUrl: string): string {
  return resolve(fileURLToPath(parentUrl), `../${path}`);
}
