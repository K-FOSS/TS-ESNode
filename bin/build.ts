// bin/build.ts
import { promises as fs } from 'fs';
import { buildPath } from './Utils/buildPath';

async function build(): Promise<void> {
  console.log('Starting build of TS-ESNode');

  console.info(`Removing 'out/dist' directory`);
  try {
    await fs.rm('out/dist', { recursive: true });
  } catch {}

  console.info('Building TS-ESNode');

  await Promise.all([buildPath('./')]);

  console.debug('Finished Building');
}

build();
