// test/index.ts
import { checkIsHelloWorld } from './Lab';

console.log(`I'm TypeScript`);

const localString = 'helloWorld';
const isHelloWorld = await checkIsHelloWorld(localString);

console.log(`${localString} is helloWorld: `, isHelloWorld);
