// Testing/Tests/JSPaths/src/Module/Random/index.ts
import { sayRandom } from 'random';

export async function randomModule(): Promise<string> {
  return sayRandom();
}
