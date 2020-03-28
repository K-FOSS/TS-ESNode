// Template/src/index.ts
import { sayHello } from './Modules/Random';

async function startApp(): Promise<void> {
  console.log('Starting App');

  const message = sayHello();

  console.log(`startApp > message: ${message}`);
}
/**
 * Insert example/test here
 */
console.log('Hello World');

startApp();
