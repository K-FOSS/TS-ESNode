// test/index.ts
import { Query } from 'type-graphql';
import { checkIsHelloWorld } from './Lab';

console.log(Query);

console.log(`I'm TypeScript`);

const localString = 'helloWorld';
const isHelloWorld = await checkIsHelloWorld(localString);

console.log(`${localString} is helloWorld: `, isHelloWorld);
