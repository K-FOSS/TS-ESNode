// DotImport/src/randomLoader.ts
export async function loadRandom(): Promise<boolean> {
  console.log('Importing Hello/helloWorld.ts');

  await import('./Hello/helloWorld');

  console.log('Imported Hello/helloWorld.ts');

  return true;
}
