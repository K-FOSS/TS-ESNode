// Testing/Runner/index.ts
import { run } from './Utils/run';
import { promises as fs } from 'fs';
import { findTestFolders } from './Utils/findTests';

async function runTests(): Promise<void> {
  const testFolders = await findTestFolders();

  try {
    await fs.symlink(process.cwd(), 'node_modules/@k-foss/ts-esnode', 'dir');
  } catch {}

  const errs: Error[] = [];

  for (const testFolder of testFolders) {
    console.log(`Starting Test Folder: ${testFolder.testName}`);

    await run('npm ci', {
      cwd: testFolder.testFolderPath,
    });

    console.log(`Packages installed`);

    try {
      await run('npx ts-estest ./src', {
        cwd: testFolder.testFolderPath,
      });
    } catch (err) {
      errs.push(err);
    }
  }

  if (errs.length > 0) {
    throw errs;
  }
}

runTests();
