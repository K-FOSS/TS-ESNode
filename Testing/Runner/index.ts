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
    console.log(`::group::Test ${testFolder.testName}`);

    await run('npm ci', {
      cwd: testFolder.testFolderPath,
    });

    console.log(`Packages installed`);

    try {
      await run('npx ts-estest ./src', {
        cwd: testFolder.testFolderPath,
      });
    } catch (err) {
      console.error(
        `::warning file=${testFolder.testFolderPath}/package.json,line=0,col=0::${err.message}`,
      );

      errs.push(err);
    }

    console.log(`::endgroup::`);
  }

  if (errs.length > 0) {
    throw errs;
  }
}

runTests();
