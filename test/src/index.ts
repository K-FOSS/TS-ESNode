// test/index.ts
import { checkIsHelloWorld } from './Lab';

async function startHelloWorld(): Promise<void> {
  console.log('Starting HelloWorld');

  console.log(`I'm TypeScript`);

  const localString = 'helloWorld';
  const isHelloWorld = await checkIsHelloWorld(localString);

  console.log(`${localString} is helloWorld: `, isHelloWorld);
}

startHelloWorld();
