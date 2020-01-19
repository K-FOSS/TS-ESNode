// test/index.ts
import { checkIsHelloWorld } from './Lab';

async function startHelloWorld(): Promise<void> {
  console.log('Starting HelloWorld');

  console.log(`I'm TypeScript`);

  const localString = 'helloWorld';
  const isHelloWorld = await checkIsHelloWorld(localString);

  console.log(`${localString} is helloWorld: `, isHelloWorld);

  const { startLab2 } = await import('./Lab2');

  const lab2Result = await startLab2(true);

  console.log(`Result of Lab #2: `, lab2Result);

  console.log('Importing helloWorld.tsx');
}

startHelloWorld();
