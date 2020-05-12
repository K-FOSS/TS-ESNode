// Template/src/index.ts

export async function startApp(): Promise<void> {
  console.log('Starting DotImport test');

  console.log('Loading randomLoader');

  const { loadRandom } = await import('./randomLoader');

  console.log('Running loadRandom()');

  const result = await loadRandom();

  console.log('loadRandom() result: ', result);

  console.debug('Done');
}

startApp();

export {};
