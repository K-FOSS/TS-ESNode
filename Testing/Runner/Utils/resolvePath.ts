// src/Utils/resolvePath.ts
import { resolve } from 'path';
import { fileURLToPath } from 'url';

export function resolvePath(path: string, parentUrl: string): string {
  return resolve(fileURLToPath(parentUrl), `../${path}`);
}
