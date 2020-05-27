// Template/src/index.ts
import { strictEqual } from 'assert';
import { renderModule } from './Render';
import { resolve } from 'path';

async function startApp(): Promise<void> {
  console.log('Starting App');

  const { App } = await import('./App');
  const appHTML1 = await renderModule(App);

  strictEqual(appHTML1, '<div>HelloAppWorld</div>');

  process.env.TS_CONFIG_PATH = resolve(
    'Testing/Tests/TSConfigExtends/tsconfig.random.json',
  );
  console.log(process.env.TS_CONFIG_PATH);

  const { Main } = await import('./Main');
  const mainHTML1 = await renderModule(Main);

  strictEqual(mainHTML1, '<div><h1>Title!</h1></div>');
}
/**
 * Insert example/test here
 */
console.log('Hello World');

startApp();
